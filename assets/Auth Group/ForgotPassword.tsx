import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebase } from '@react-native-firebase/auth';

const ForgotPasswordScreen = () => {
    const nav = useNavigation<NativeStackNavigationProp<any>>();

    // some useState variables for the input fields
    const [email, setEmail] = useState("");

    async function SendPasswordRecoveryEmail() {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent!
                Alert.alert("Password reset email sent", "Check your inbox");
                nav.pop();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.button} onPress={SendPasswordRecoveryEmail}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {
                nav.pop();
            }}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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

export default ForgotPasswordScreen;
