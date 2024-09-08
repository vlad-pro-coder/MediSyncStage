import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";

// Login screen component, just the input fields and 3 buttons (as sof the ui)
// Rendered conditionally in AuthPage
const StartPage = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../Obiecte.png')}
      />
      <Text style={styles.title}>Bine ati revenit!</Text>
      <View style={{ flex: 2, justifyContent: "center" }}>
        
        <View>
          <TouchableOpacity style={styles.button} onPress={() => {nav.push("PacientRegister")}}>
            <Text style={styles.buttonText}>Sunt Pacient</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {nav.push("DoctorRegister")}}>
            <Text style={styles.buttonText}>Sunt Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {nav.push("OrganisationRegister")}}>
            <Text style={styles.buttonText}>Sunt Organizatie</Text>
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
    backgroundColor: '#f3e3ff'
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

export default StartPage;
