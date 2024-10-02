import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Pressable, Image, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import '@react-native-firebase/database';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const PatientListScreen = () => {
    const [patients, setPatients]: any = useState([]);
    const [patientRefresh, setPatientRefresh] = useState(false);
    const [selectedPatient, setSelectedPatient]: any = useState(null);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const imageDataDefault = 'data:image/png;base64,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';

    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const currentID = auth().currentUser?.uid;
          db().ref('users')
            .once('value')
            .then(snapshot => {
              if (snapshot.exists()) {
                const users = snapshot.val();
                const matchingPatients = Object.entries(users).filter(
                  ([userId, userData]: any) =>
                    userData.doctorIds &&
                    Array.isArray(userData.doctorIds) &&
                    userData.doctorIds.includes(currentID)
                );

                if (matchingPatients.length > 0) {
                  const formattedPatients: any = matchingPatients.map(([userId, userData]: any) => ({
                    id: userId,
                    ...userData,
                  }));
                  setPatients(formattedPatients);
                } else {
                  Alert.alert('No patients found', 'Please check your account or try again later.');
                }
              } else {
                Alert.alert('No patients found', 'Please check your account or try again later.');
              }
            })
            .catch(error => {
              Alert.alert('Error fetching data', error.message);
              console.error('Database query error:', error);
            });
        } catch (error) {
          Alert.alert('Oops! No user found with this phone number!');
        }
      };

      fetchPatients();
    }, []);

    const handlePatientPress = (patient: any) => {
      setSelectedPatient(patient); // Set the selected patient
    };

    const selectAndSaveImage = async (user: any) => {
      const response: any = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        quality: 1,
        base64: true,
      });
      //Alert.alert("Am trecut pe aici");
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        user.profilePicture = 'data:image/png;base64,' + response.assets[0].base64;
        setPatientRefresh(!patientRefresh);

        //scale to a small image

        //Update image on user
        db().ref(`users/${user.id}`).update({ profilePicture: user.profilePicture })
          .then(() => {
            //Alert.alert('Image saved successfully as Base64 string');
            console.log('Image saved successfully as Base64 string');
          })
          .catch(error => {
            console.error('Error saving image to Firebase:', error);
          });
      }
    };


    const renderItem = ({ item }: any) => {
      try {
        db().ref(`users/${item.id}/profilePicture`).once('value', snapshot => {
          if (snapshot.val()) {
            item.imageData = snapshot.val();
          } else {
            item.imageData = imageDataDefault;
          }
        });
      } catch (error) {
        console.error('Error fetching image from Firebase: ', error);
      }

      return (
        <Pressable
          onPress={() => handlePatientPress(item)}
          onLongPress={() => selectAndSaveImage(item)}
          style={[
            styles.patientBox,
            selectedPatient?.id === item.id && styles.selectedBox,
          ]}
        >
          <Image
            style={styles.avatar}
            source={{ uri: item.profilePicture }}
          />

          <Text style={styles.nameText}>{item.name} {item.surName}</Text>
          <Text style={styles.detailsText}>{item.nrTelefon}</Text>
          <Text style={styles.detailsText}>{item.email}</Text>
          <Button title="Profil" onPress={() => nav.push("Profile") }  />
        </Pressable>
      );
    };

    const handleSearch = (text: any) => {
      setSearchQuery(text);
      if (text === '') {
        setFilteredPatients(patients);
      } else {
        const filtered = patients.filter((patient: any) =>
          patient.email.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPatients(filtered);
      }
    };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Caută după Email"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredPatients}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer1}
        />
        <FlatList
          data={patients}
          extraData={patientRefresh}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer2}
        />
        <Pressable style={styles.formButton} onPress={() => nav.push("")}>
          <Text style={styles.formButtonText}>Accesează Formular</Text>
        </Pressable>
      </View>

    );
  };

  const styles = StyleSheet.create({
    profil: {
      flexDirection: 'row',
    },
    infoContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    listContainer1: {
      paddingBottom: 20, // To prevent overlap with bottom button
    },
    listContainer2: {
      paddingBottom: 60, // To prevent overlap with bottom button
    },
    patientBox: {
      //flexDirection: 'column',
      //alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      elevation: 3, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    selectedBox: {
      borderColor: '#007AFF',
      borderWidth: 2,
    },
    nameText: {
      flexDirection: 'column',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    detailsText: {
      flexDirection: 'column',
      fontSize: 14,
      color: '#666',
    },
    formButton: {
      position: 'absolute',
      bottom: 70,
      left: 20,
      right: 20,
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    formButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
      flexDirection: "row-reverse",
    },
    searchBar: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 16,
      backgroundColor: '#fff',
    },
  });

  return (
    <View style={styles.container}>
      <PatientListScreen />
    </View>
  );
};
export default App;

