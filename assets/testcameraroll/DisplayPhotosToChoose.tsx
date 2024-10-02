import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, ListRenderItem, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { TextInput } from 'react-native-gesture-handler';
import { formularButtonSubmit, inputsBackground, inputsEdges } from '../color';
import DefaultDisplay from './PhotosDisplays/DefaultDisplay';
import FormSelectedDisplay from './PhotosDisplays/FormSelectedDisplay';
import RetetaSelectedDisplay from './PhotosDisplays/RetetaSelectedDisplay';
import SubmitPhotos from './SubmitPhotos';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

interface Photo {
  id: string;
  uri: string;
}

const DisplayPhotosToChoose = ({ route }: { route: any }) => {

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const email = route.params.email

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const [titlu, changeTitlu] = useState<string>('')
  const [AddFormOrReteta, changeState] = useState<any>(0)
  const [focusedTitlu, changeFocus] = useState<boolean>(false)

  const [URIs, changeURIs] = useState<any>({ 0: [], 1: [] })
  /// 0:URIsForFormular
  /// 1:URIsRetete

  const retryRequest = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      loadPhotos();
    }
  }

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
    return <View>
      <Text>Requesting permissions...</Text>
    </View>;
  }
  if (hasPermission === false) {
    return <View style={{ flex:1,alignSelf: 'center', justifyContent: 'center' }}>
      <Text style={{
    fontSize: 20,
    fontWeight: 'bold',
  }}>Fara access la libraria de poze, oferiti permisiunile din setarile telefonului</Text>
    </View>;
  }

  const FindIndex = (id: string) => {

    let indexForm = -1, indexRetete = -1

    URIs[0].map((photo: Photo, index: number) => {
      if (photo.id === id)
        indexForm = index
    })
    URIs[1].map((photo: Photo, index: number) => {
      if (photo.id === id)
        indexRetete = index
    })

    return { indexForm, indexRetete }

  }
  console.log(URIs)

  const renderItem: ListRenderItem<Photo> = ({ item }) => {
    const { uri, id } = item

    const { indexForm, indexRetete } = FindIndex(id)

    if (indexForm === -1 && indexRetete === -1)
      return <DefaultDisplay prop={{ uri: uri, URIs: URIs, changeURIs: changeURIs, AddFormOrReteta: AddFormOrReteta, id: id }} />
    else if (indexForm !== -1)
      return <FormSelectedDisplay prop={{ uri: uri, index: indexForm, URIs: URIs, changeURIs: changeURIs, id: id }} />
    else if (indexRetete !== -1)
      return <RetetaSelectedDisplay prop={{ uri: uri, index: indexRetete, URIs: URIs, changeURIs: changeURIs, id: id }} />

    return null
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ height: '30%', marginTop: 30 }}>
        <TextInput placeholder="Titlu document" value={titlu} onChangeText={(text: string) => { changeTitlu(text) }} style={styles.titlu} onFocus={() => { changeFocus(true) }} onBlur={() => { changeFocus(false) }} />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
          <TouchableOpacity style={styles.btnStyle} onPress={() => { changeState(0) }}>
            <Text style={styles.textstyle}>Adauga Poze pentru formular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={() => { changeState(1) }}>
            <Text style={styles.textstyle}>Adauga Poze pentru Retete</Text>
          </TouchableOpacity>
        </View>
        {focusedTitlu === false ? <Text style={[styles.textstyle, { paddingBottom: '10%' }]}>{AddFormOrReteta === 0 ? "acum se adauga imagini Formularului" : "acum se adauga Reteta sub forma de poze"}</Text> : <></>}
      </View>

      <View style={{ height: '58%', alignItems: 'center' }}>
        <FlatList
          data={photos}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={loadPhotos}
          onEndReachedThreshold={0.5}
        />
      </View>
      <View style={{ height: '8%', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.submit} onPress={() => {
          SubmitPhotos({ titlu, URIs, email })
          nav.pop()
        }}>
          <Text style={styles.textstyle}>Creeaza Formular</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titlu: {
    marginTop: 15,
    textAlign: "center",
    marginRight: "10%",
    marginLeft: "10%",
    borderColor: inputsEdges,
    backgroundColor: inputsBackground,
    borderWidth: 2,
    borderRadius: 20,
    paddingStart: 10,
    paddingTop: 3,
    paddingEnd: 10,
  },
  btnStyle: {
    justifyContent: 'center',
    backgroundColor: formularButtonSubmit,
    width: 100,
    height: 50,
    borderRadius: 10,
    marginStart: 10,
  },
  textstyle: {
    textAlign: 'center',
  },
  submit: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: formularButtonSubmit,
    width: 100,
    height: 40,
    borderRadius: 10,
  },
})

export default DisplayPhotosToChoose