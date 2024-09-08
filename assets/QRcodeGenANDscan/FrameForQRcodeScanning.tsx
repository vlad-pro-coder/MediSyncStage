import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import React, { Button, StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, get, set } from "firebase/database";
import TemporaryDataDisplayWithLabels from './PrintIstoricTemporary/TemporaryDataDisplayWithLabels';

const strParser = (scannedSTR: string) => {

  const space = scannedSTR.indexOf(" ")
  const email = scannedSTR.substr(0, space)
  const userID = scannedSTR.substr(space + 1, scannedSTR.length - space - 1)

  return { email: email, userID: userID }

}

const FrameForQRcodeScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, changeScanned] = useState<boolean>(false)
  const [dataScanned, changeDataScanned] = useState<string>('')

  if (!permission) {
    return <View><Text>Permisiunea a fost refuzata</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text >Accepta permisiunile pentru a scana codul QR</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const getQRStatus = async (userID: any) => {
    const dbRef = getDatabase();
    let value: boolean = true

    await get(ref(dbRef, `users/${userID}/IsQRactive`)).then((snap) => {
      value = snap.val()
    })

    return value
  }

  const setQRStatus = async (userID: any) => {
    const dbRef = getDatabase();
    await set(ref(dbRef, `users/${userID}/IsQRactive`), false)
      .then(() => { console.log("everything good") })
      .catch((err) => { console.error(err) })
  }

  const getQRdata = async ({ type, data }: any) => {
    const { email, userID } = strParser(data)
    console.log(email,userID)
    const statusQR = await getQRStatus(userID)

    if (statusQR) {
      changeDataScanned(email)
      changeScanned(true)
      await setQRStatus(userID)
    }
    else
      changeDataScanned("0")
  }


  return <View style={styles.cameraStyle}>
    {scanned === false ? <CameraView
      facing='back'
      style={styles.cameraStyle}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={getQRdata}
    >
      {dataScanned === "0" ? <Text style={styles.expiredPopUp}>QR expirat sau scanat deja</Text> : <></>}
    </CameraView> : <TemporaryDataDisplayWithLabels prop={{email:dataScanned}}/>
    }
  </View>

}

const styles = StyleSheet.create({
  cameraStyle: {
    width: '100%',
    height: '100%',
  },
  expiredPopUp: {
    width: '70%',
    alignSelf: 'center',
    marginTop: '15%',
    textAlign: 'center',
    backgroundColor: 'red',
    fontSize: 20,
    borderRadius: 20,
  }
})

export default FrameForQRcodeScanner;
