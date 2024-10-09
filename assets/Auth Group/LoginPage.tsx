import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";

// Login screen component, just the input fields and 3 buttons (as sof the ui)
// Rendered conditionally in AuthPage
const LoginScreen = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  // some useState variables for the input fields
  const [email, setEmail] = useState("p1@gmail.com");
  const [password, setPassword] = useState("123456");

  const goToMainFlow = async () => {
    if (email && password) {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password
        );
        if (response.user) {
          // At this point the user is logged in
          console.log("--->" + response.user.uid)
          nav.replace("Index", {userID: response.user.uid,email:email} )
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
        <View>
          <TouchableOpacity style={styles.button} onPress={goToMainFlow}>
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
});

export default LoginScreen;
