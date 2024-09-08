import React,{ useState, useEffect } from 'react';
import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
import {usePermissions, getAlbumsAsync, getAssetsAsync} from 'expo-media-library';

const DisplayCameraRoll = () => {
  const [albums, setAlbums] = useState<any>('');
  const [permissionResponse, requestPermission] = usePermissions();

  useEffect(()=>{
    async ()=>{
    if (permissionResponse.status !== 'granted') {
      await requestPermission();
    }
  }
  },[])

  async function getAlbums() {
    
    const fetchedAlbums = await getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={getAlbums} title="Get albums" />
      <ScrollView>
        {albums && albums.map((album:any) => <AlbumEntry album={album} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

function AlbumEntry({ album }:any) {
  const [assets, setAssets] = useState<any>([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets && assets.map((asset:any) => (
          <Image source={{ uri: asset.uri }} width={50} height={50} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  albumContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 4,
  },
  albumAssetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default DisplayCameraRoll