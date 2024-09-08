import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, ListRenderItem } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

interface Photo {
  id: string;
  uri: string;
}

const DisplayPhotosToChoose = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        loadPhotos();
      }
    })();
  }, []);

  const loadPhotos = useCallback(async () => {
    if (!hasNextPage) return;
    const { assets, endCursor, hasNextPage: nextPage } = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      first: 20, // Number of photos to load per batch
      after,
      sortBy: [MediaLibrary.SortBy.creationTime],
    });
    setPhotos((prevPhotos) => [...prevPhotos, ...assets.map(asset => ({ id: asset.id, uri: asset.uri }))]);
    setAfter(endCursor);
    setHasNextPage(nextPage);
  }, [after, hasNextPage]);

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to media library</Text></View>;
  }

  const renderItem: ListRenderItem<Photo> = ({ item }) => (
    <Image
      source={{ uri: item.uri }}
      style={{ width: 100, height: 100, margin: 5 }}
    />
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadPhotos}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default DisplayPhotosToChoose