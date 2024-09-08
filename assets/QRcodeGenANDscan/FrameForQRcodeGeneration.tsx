import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

declare global {
    var interval: NodeJS.Timeout;
    var dbListener: () => void;
}

const FrameForQRcodeGeneration = ({ route }: { route: any }) => {

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const email = route.params.email
  const userID = route.params.userID

  const [secondsPast, changeSeconds] = useState(30)

  const changeQRstate = async (value: boolean) => {
    try {
      const dbRef = getDatabase();
      await set(ref(dbRef, `users/${userID}/IsQRactive`), value)
        .then(() => { console.log("everything good") })
        .catch((err) => { console.error(err) })
    }
    catch (err) {
      console.error(err)
    }
  }

  

  useEffect(() => {
    const wait30sec = async () => {
      await changeQRstate(true)

      const dbRef = getDatabase();
      globalThis.dbListener = onValue(ref(dbRef, `users/${userID}/IsQRactive`), (snapshot) => {
        const data: boolean = snapshot.val();
        if (data === false) {
          nav.pop();
        }
      });

      globalThis.interval = setInterval(() => {
        changeSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            nav.pop();
          }
          return prevSeconds - 1
        }
        )
      }, 1000)
    }
    wait30sec()

    return ()=>{
      const cleanup = async() =>{
        await changeQRstate(false)
        clearInterval(globalThis.interval)
        globalThis.dbListener()
      }
      cleanup()
    }

  }, [])

  return (
    <View>
      <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
      <QRCode
        value={email + " " + userID}
        size={300}
        backgroundColor="white"
        color="black"
      />
      <Text>{secondsPast}</Text>
      </View>
    </View>
  );
};

export default FrameForQRcodeGeneration;
function dbListener() {
  throw new Error('Function not implemented.');
}

