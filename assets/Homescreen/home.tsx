import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { getDatabase, ref, child, get } from "firebase/database";

type RootStackParamList = {
  StartPage: undefined;
  PacientRegister: undefined;
  DoctorRegister: undefined;
  OrganisationRegister: undefined;
  Home: { userID: any };
  ForgotPassword: undefined;
  SelectDoctor: undefined;
  ScheduleAppointment: { doctorID: any };
  CalendarScreen: { userID: any };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;



function HomeScreen({ route, navigation }: Props) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const [userID, setUserID] = useState(route.params.userID);

  const [UserEmail,setUserEmail] = useState('')

  const [userState, setUserState] = useState("Loading...")

  useState(() => {
    getUserState();
  })

  async function getUserState() {
    // returns wether the user is doctor or patient

    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/${userID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserEmail(snapshot.val().email)
        if (snapshot.val().isDoctor) {
          setUserState("Doctor");
        }
        else setUserState("Pacient");
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  interface Doctor {
    uid: string;
    name: string;
  }

  function ExtractDoctorsAndPushToSelectDoctorFlow() {
    navigation.push("SelectDoctor");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      
      {
        userState == "Pacient" && <TouchableOpacity onPress={ExtractDoctorsAndPushToSelectDoctorFlow} style={[styles.button, styles.googleButton]}>
          <Text style={styles.buttonText}>Make an appointment</Text>
        </TouchableOpacity>
      }

      {//pentru debugging, schimba inapoi la pacient(jgl diff)
        userState == "Pacient" && <TouchableOpacity onPress={() => nav.push("IstoricMedical", { email: UserEmail,userID:userID })} style={[styles.button, styles.googleButton]}>
          <Text style={styles.buttonText}>Istoric Medical</Text>
        </TouchableOpacity>
      }

      {
        userState == "Doctor" && <TouchableOpacity onPress={() => nav.push("FormularOrReteta")} style={[styles.button, styles.googleButton]}>
          <Text style={styles.buttonText}>Exemplu formular</Text>
        </TouchableOpacity>
      }

      {
        userState == "Doctor" && <TouchableOpacity onPress={() => nav.push("IstoricMedicalQRscanner")} style={[styles.button, styles.googleButton]}>
          <Text style={styles.buttonText}>Scaneaza Cod QR pentru Istoric</Text>
        </TouchableOpacity>
      }

      {
        userState == "Doctor" && <TouchableOpacity onPress={() => nav.push("CalendarScreen", { userID: userID })} style={[styles.button, styles.googleButton]}>
          <Text style={styles.buttonText}>Calendar Programari</Text>
        </TouchableOpacity>
      }

      {
        userState == "Doctor" && <TouchableOpacity onPress={() => nav.push("AssignPatientScreen")} style={[styles.button, styles.googleButton]}>
          <Text style={styles.buttonText}>Adauga Pacient</Text>
        </TouchableOpacity>
      }

      <Text>
        {userState}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default HomeScreen;
