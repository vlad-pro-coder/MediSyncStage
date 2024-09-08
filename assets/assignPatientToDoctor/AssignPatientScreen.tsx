import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import assignPatientToDoctor from './assignPage';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

const App = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [nrTelefon, setNrTelefon] = useState<string>('');
  const [CNP, setCNP] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [surName, setSurName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const addPacient = async () => {
    try {
      const snapshot = await db()
        .ref('users')
        .orderByChild('nrTelefon')
        .equalTo(nrTelefon)
        .limitToFirst(1)
        .once('value');

      const data = snapshot.val();
      if (data) {
        const userId = Object.keys(data)[0];
        const pacient = data[userId];
        Alert.alert(pacient.email);
        const doctorIds = pacient.doctorIds || [];
        const currentID = auth().currentUser?.uid;
        if (currentID) {
          const arrfin1 = [...doctorIds, currentID];
          await db().ref(`/users/${userId}`).update({ doctorIds: arrfin1 });
          Alert.alert('Date pacient actualizate cu succes!');
          await db().ref(`/users/${currentID}/pacientIds`).push(userId);
        }
      } else {
        Alert.alert("Oops! No user found with this phone number!");
      }
    } catch (error: any) {
      Alert.alert("Failed to update data", error.message);
    }
  };

  const removePacient = async () => {
    try {
      const snapshot = await db()
        .ref('users')
        .orderByChild('nrTelefon')
        .equalTo(nrTelefon)
        .limitToFirst(1)
        .once('value');

      const data = snapshot.val();
      if (data) {
        const userId = Object.keys(data)[0];
        const pacient = data[userId];
        const doctorIds = pacient.doctorIds || [];
        const currentID = auth().currentUser?.uid;
        if (currentID) {
          const index = doctorIds.indexOf(currentID);
          if (index > -1) {
            doctorIds.splice(index, 1);
            await db().ref(`/users/${userId}`).update({ doctorIds });
            Alert.alert('Pacient eliminat din lista.');

            const doctorSnapshot = await db().ref(`users/${currentID}`).once('value');
            const doctor = doctorSnapshot.val();
            const pacientIds = doctor?.pacientIds || [];
            const pacientIndex = pacientIds.indexOf(userId);
            if (pacientIndex > -1) {
              pacientIds.splice(pacientIndex, 1);
              await db().ref(`/users/${currentID}`).update({ pacientIds });
            }
          }
        }
      } else {
        Alert.alert("Oops! No user found with this phone number!");
      }
    } catch (error: any) {
      Alert.alert("Failed to update data", error.message);
    }
  };

  const showPacientList = async () => {
    try {
      const currentID = auth().currentUser?.uid;
      if (!currentID) return;

      const snapshot = await db().ref('users').once('value');
      const users = snapshot.val();

      if (users) {
        const matchingPatients = Object.entries(users).filter(
          ([userId, userData]: any) =>
            userData.doctorIds &&
            Array.isArray(userData.doctorIds) &&
            userData.doctorIds.includes(currentID)
        );

        if (matchingPatients.length > 0) {
          matchingPatients.forEach(([userId, userData]: any) => {
            Alert.alert('Doctor ID:', currentID);
            Alert.alert(
              'Patient Information',
              `Name: ${userData.name}\nSurname: ${userData.surName}\nCNP: ${userData.CNP}\nNr. Telefon: ${userData.nrTelefon}\nEmail: ${userData.email}`
            );
          });
        } else {
          Alert.alert('No patients found', 'Please check your account or try again later.');
          console.log('No patients found for doctor ID:', currentID);
        }
      } else {
        Alert.alert('No patients found', 'Please check your account or try again later.');
      }
    } catch (error: any) {
      Alert.alert('Error fetching data', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add patient</Text>
      <TextInput
        style={styles.input}
        placeholder="Patient Phone Number"
        onChangeText={setNrTelefon}
        value={nrTelefon}
        keyboardType="phone-pad"
      />

      {nrTelefon ? (
        <TouchableOpacity onPress={removePacient} style={styles.button}>
          <Text style={styles.buttonText}>Șterge pacient din listă</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity onPress={addPacient} style={[styles.button, styles.googleButton]}>
        <Text style={styles.buttonText}>Assign Patient...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showPacientList} style={[styles.button, styles.googleButton]}>
        <Text style={styles.buttonText}>Show Your Patient List</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.push("Home")} style={[styles.button, styles.googleButton]}>
        <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.push("Auth")} style={[styles.button, styles.googleButton]}>
        <Text style={styles.buttonText}>Return To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
    padding: 10,
  },
  message: {
    marginTop: 30,
    fontSize: 16,
    color: 'red',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default App;
