import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { ScrollView, Switch } from 'react-native-gesture-handler';
// Register screen component, just the input fields and 3 buttons (as of the ui)
// Rendered conditionally in AuthPage

const LoginScreen = () => {
  const [CNP, setCNP] = useState("6150716016696");
  const [nrTelefon, setNrTelefon] = useState("+40754213564")
  const [name, setName] = useState("Marius");
  const [surName, setSurName] = useState("Popescu");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
    // to do later, will add stuff to firestore realtime database
    // now i just made a user autentithication system
    // to see how to do this visit https://www.youtube.com/watch?v=mZlKwRV4MC8
    db().ref(`/users/${response.user.uid}`).set({ CNP, nrTelefon, name, surName, email, isDoctor });
  }

  const registerAndGoToMainFlow = async (response: any) => {
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        )

        if (response.user) {
          console.log(response.user.uid)
          await createProfile(response);
          nav.replace("Home")
        }

      } catch (e: any) {
        // just log the error now, if there is one but were gonna have to make a better error logger in the future
        Alert.alert("Oops! An error occured", e.toString())
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../Obiecte.png')}
      />
      <Text style={styles.subtitle}> {"    < "}Inapoi la pagina principala</Text>
      <Text style={styles.title}>Bine ati revenit!</Text>
      <View style={{ flex: 2, justifyContent: "center" }}>
      <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="CNP"
          autoCapitalize="none"
          autoCorrect={false}
          value={CNP}
          onChangeText={setCNP}
        />

        <TextInput
          style={styles.input}
          placeholder="Numar Telefon"
          autoCapitalize="none"
          autoCorrect={false}
          value={nrTelefon}
          onChangeText={setNrTelefon}
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          value={surName}
          onChangeText={setSurName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Pacient</Text>
          <Switch
            value={isDoctor}
            onValueChange={setIsDoctor}
          />
          <Text style={styles.switchLabel}>Doctor</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={registerAndGoToMainFlow}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={[styles.subtitle, { textAlign: 'center' }]}>sau</Text>

          <TouchableOpacity style={styles.googlebutton} onPress={() => { Alert.alert("Opa", "Nam facuto inca") }}>
            <View style={styles.content}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
                style={styles.icon}
              />
              <Text style={styles.googletext}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    color: "gray"
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
    margin: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 30,
    width: "40%",
    alignSelf: "center"
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
  imageStyle: {
    maxWidth: "100%",
    flex: 1,
  },

  googlebutton: {
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    width: "60%",
    alignSelf: "center"
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googletext: {
    color: 'gray',
    fontWeight: 'bold',
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
