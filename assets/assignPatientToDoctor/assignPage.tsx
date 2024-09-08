import React, { useId, useState } from 'react';
import firestore, { firebase } from '@react-native-firebase/database';
import { View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import database from '@react-native-firebase/database';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// const [CNP, setCNP] = useState("6150716016696");
//   const [nrTelefon, setNrTelefon] = useState("+40754213564")
//   const [name, setName] = useState("Marius");
//   const [surName, setSurName] = useState("Popescu");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isDoctor, setIsDoctor] = useState(false);

// const uid = async (response: FirebaseAuthTypes.UserCredential) => {
//   // to do later, will add stuff to firestore realtime database
//   // now i just made a user autentithication system
//   // to see how to do this visit https://www.youtube.com/watch?v=mZlKwRV4MC8
//   database().ref(`/users/${response.user.uid}`).get({ CNP, nrTelefon, name, surName, email, isDoctor });
// }
const assignPatientToDoctor = async (phoneNumber: any, doctorId: string) => {
  try {
    // Look for the patient having phoneNumber

    // const querySnapshot = await database()
    //   .ref("users/HaPZofJsV1e2hy2T7zvShm5Abfb2")
    //   .once('value')
    //   .then(snapshot => {
    //     console.log('User data: ', snapshot.val());
    //   });
    const querySnapshot = {
      email: 'pacient@gmail.com',
      isDoctor: false,
      nrTelefon: phoneNumber,
      name: 'Marius',
      surname: 'Popescu',
      uid: 'HaPZofJsV1e2hy2T7zvShm5Abfb2'
    }

    if (typeof querySnapshot === 'undefined') {
      throw new Error('No patient found with this phone number');
    }
    
    // Assign patient to doctorId
    
    // const querySnapshot2 = await database()
    //   .ref("users/qdaavws3czRcXobFySVwv7rGQLe2")
    //   .once('value')
    //   .then(snapshot => {
    //     console.log('User data: ', snapshot.val());
    //   });

    // if (typeof querySnapshot2 === 'undefined') {
    //   throw new Error('No doctor found with this doctorId');
    // }

    // const doctorId = querySnapshot2;

    // const doctorRef = doctorId;
    // await doctorRef.update({
    //       patients : firebase.FieldValue.arrayUnion(querySnapshot),
    // });

    console.log('Patient assigned to doctor successfully');
  } catch (error) {
    console.error('Error assigning patient to doctor:', error);
    throw error;
  }
};

export default assignPatientToDoctor;