import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

const ConsultScreen = () => {
    const [inputs, setInputs] = useState([{ id: Math.random().toString(), value: '' }]);

    const addInputHandler = () => {
        setInputs([...inputs, { id: Math.random().toString(), value: '' }]);
    };

    const handleInputChange = (text: string, id: string) => {
        const newInputs = inputs.map(input => {
            if (input.id === id) {
                return { ...input, value: text };
            }
            return input;
        });
        setInputs(newInputs);
    };

    const deleteInputHandler = (id: string) => {
        setInputs(inputs.filter(input => input.id !== id));
    };

    return (
        <View style={styles.container}>
            <View>
                
                <ScrollView>
                {inputs.map((input, index) => (
                    <View key={input.id} style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => handleInputChange(text, input.id)}
                            value={input.value}
                            placeholder={`Input ${index + 1}`}
                        />
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteInputHandler(input.id)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            </View>
            
            <Button title="Add Input" onPress={addInputHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    deleteButton: {
        marginLeft: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ConsultScreen;
