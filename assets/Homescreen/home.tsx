import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { getDatabase, ref, child, get } from "firebase/database";
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { firebase } from '@react-native-firebase/database';
import { Feather } from '@expo/vector-icons';

type RootStackParamList = {
  StartPage: undefined;
  PacientRegister: undefined;
  DoctorRegister: undefined;
  OrganisationRegister: undefined;
  Home: { userID: any };
  Consult: { user: any };
  ForgotPassword: undefined;
  SelectDoctor: undefined;
  ScheduleAppointment: { doctorID: any };
  CalendarScreen: { userID: any };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ route, navigation }: Props) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const [userID, setUserID] = useState(route.params.userID);
  const [accountType, setAccountType] = useState<string | null>(null);
  console.log("-> " + userID)
  const [userState, setUserState] = useState("Loading...")

  const [UserEmail, setUserEmail] = useState('')

  useState(() => {

    getUserState();
  })

  async function getUserState() {
    // returns wether the user is doctor or patient

    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/${userID}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserEmail(snapshot.val().email)
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setAccountType(userData.accountType);
          console.log(userData.accountType)
        } else {
          console.log("No data available");
        }
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
      <View style={styles.topDecorationBox}>
        <Image style={styles.imageStyle2} source={require('../obiecte2.png')} />
      </View>
      <View style={styles.bottomBox}>
      {accountType === "pacient"?
        <View style={styles.reteteButtonContainer}>
          <TouchableOpacity onPress={() => nav.push("DisplayPhotosToChoose", { email: UserEmail })}>
            <Image style={styles.imageStyle} source={require('../ReteteButton.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nav.push("SelectDoctor", {userID: userID})}>
            <Image style={styles.imageStyle} source={require('../ProgramariButton.png')} />
          </TouchableOpacity>
        </View>:<View></View>
        }

        <View style={styles.banner}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Diagnostic doar în 2 {"\n"}minute?</Text>
            <Text style={styles.subtitle}>
              Găsește posibilele cazuri ale {"\n"}simptomelor tale în doar câteva {"\n"}minute
            </Text>
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.buttonText2}>Completează {"\n"}chestionarul</Text>
            </TouchableOpacity>
          </View>
          <Image source={require("../stethoscope.png")} style={styles.icon} />
        </View>
        
        {accountType === "doctor"?<TouchableOpacity style={styles.banner} onPress={()=>{nav.push("IstoricMedicalQRscanner")}}>
          <View style={styles.iconContainer}>
            <Image source={require("../qrcode.png")} style={styles.qrIcon} />
          </View>
          <Text style={styles.scanText}>Scanează cod QR pentru afisarea istoricului medical</Text>
        </TouchableOpacity>:<></>}
      </View>

    </View>


  );
};



const styles = StyleSheet.create({
  imageStyle: {
    marginTop: 30,
    height: 100, // or another fixed value
    width: 100,  // or another fixed value
    resizeMode: 'contain' // Adjust based on the aspect ratio
  },
  imageStyle2: {
    maxWidth: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#1C2128"
  },
  topDecorationBox: {
    flex: 1.5,
    backgroundColor: "#1C2128"
  },
  bottomBox: {
    flex: 4,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  diagnosticButton: {
    marginHorizontal: 10,
    backgroundColor: "#ddd8eb",
    borderRadius: 25,
    flex: 1
  },
  cardDeSanatateButton: {
    margin: 10,
    backgroundColor: "#ddd8eb",
    borderRadius: 25,
    flex: 0.3
  },
  reteteButtonContainer: {
    margin: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
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
  banner: {
    backgroundColor: '#f0f0ff',
    borderRadius: 25,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 16,
  },
  button2: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText2: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    width: 75,
    height: 75,
    marginLeft: 16,
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  qrIcon: {
    width: 24,
    height: 24,
  },
  scanText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
