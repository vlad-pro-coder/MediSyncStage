import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, TextInput, Alert, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const FormScreen = () => {
    const nav = useNavigation<NativeStackNavigationProp<any>>();
    const [patients, setPatients]: any = useState([]);
    const [selectedPatient, setSelectedPatient]: any = useState(null);

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
                                const formattedPatients = matchingPatients.map(([userId, userData]: any) => ({
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

    const Form = ({ route }: any) => {
        
        const fetchFormJSON = async () => {
            try {
                const jsonRef = storage().ref('storage/debug.json');
                const url = await jsonRef.getDownloadURL();
    
                const response = await fetch(url);
                const jsonData = await response.json();
                const { formData } = route.jsonData;
    
                //   nav.push('FormScreen', { formData: jsonData });
    
            } catch (error) {
                console.error('Error fetching JSON from Firebase Storage:', error);
                Alert.alert('Error', 'Unable to fetch the form. Please try again later.');
            }
        };
        fetchFormJSON();
        // Alert.alert(jsonData);
        return (
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Form Data:</Text>
                <Text>{JSON.stringify(FormData, null, 2)}</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Form />
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
        bottom: 20,
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
    formContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 10,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default FormScreen;
