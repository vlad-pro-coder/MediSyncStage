import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
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
  const [permission, requestPermission] = useState<boolean | null>();
  const [scanned, changeScanned] = useState<boolean>(false)
  const [dataScanned, changeDataScanned] = useState<string>('')

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      requestPermission(status === 'granted');
    })();
  }, [])

  if (!permission) {
    return <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
      }}>Fara access la camera foto, oferiti permisiunile din setarile telefonului</Text>
    </View>;
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
    console.log(email, userID)
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
      {dataScanned === "0" ? <Text style={styles.expiredPopUp}>QR expirat sau deja scanat</Text> : <></>}
    </CameraView> : <TemporaryDataDisplayWithLabels prop={{ email: dataScanned }} />
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
