import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import {  getDatabase, ref, onValue } from 'firebase/database';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// TODO: Replace the following with your app's Firebase project configuration

declare global {
    var unsub: () => void;
  }

type RootStackParamList = {
    StartPage: undefined;
    PacientRegister: undefined;
    DoctorRegister: undefined;
    OrganisationRegister: undefined;
    Home: { userID: any };
    Consult: { user: any };
    ForgotPassword: undefined;
    SelectDoctor: {userID: string};
    ScheduleAppointment: { doctorID: any, userID: any };
  };

interface Doctor {
    uid: string;
    name: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'SelectDoctor'>;

function SelectDoctorScreen({ route, navigation }: Props) {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const userID = route.params.userID


    useEffect(() => {
        const fetchdata = async () =>{
            const dbRef = getDatabase();
        const path = ref(dbRef,`/users/${userID}/doctorIds`)

        globalThis.unsub = onValue(path, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        })
    }
    fetchdata();

        return ()=>{
            globalThis.unsub()
        }
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView>
                {doctors.map((doctor) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10}}>
                        <Text key={doctor.uid} style={styles.doctorText}>
                            {doctor.name}
                        </Text>
                        <Button title='Fa o programare' onPress={() => {
                            navigation.push("ScheduleAppointment", {doctorID: doctor.uid, userID: userID})
                        }}>

                        </Button>
                    </View>

                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    doctorText: {
        fontSize: 18,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SelectDoctorScreen;
function auth() {
    throw new Error('Function not implemented.');
}

