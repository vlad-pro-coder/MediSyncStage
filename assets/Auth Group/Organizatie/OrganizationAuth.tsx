import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LoginScreen from '../LoginPage';
import RegisterScreen from '../RegisterPage';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';



const OrganisationRegister = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authPersistence, setAuthPersistence] = useState(false);


  const nav = useNavigation<NativeStackNavigationProp<any>>();

  return (
    (isLoggedIn) ?
      <View style={{ flex: 1, backgroundColor: "#f3e3ff" }}>
        <ScrollView>
          <View>
            <LoginScreen/>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {
                setIsLoggedIn(false)
              }}>
                <Text style={styles.linkText}>Don't have an account?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                nav.push("ForgotPassword")
              }}>
                <Text style={styles.linkText}>Forgot password?</Text>
              </TouchableOpacity>

            </View>
            <View style={{ height: 10 }} />
          </View>
        </ScrollView>
      </View>

      :
      <View style={{ flex: 1, backgroundColor: "#f3e3ff" }}>
        <ScrollView>
        <RegisterScreen />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            setIsLoggedIn(true)
          }}>
            <Text style={styles.linkText}>Already have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            nav.push("ForgotPassword")
          }}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 10 }} />
        </ScrollView>

      </View>
  )
}


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

export default OrganisationRegister;
