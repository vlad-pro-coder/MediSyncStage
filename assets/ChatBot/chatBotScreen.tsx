// App.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View, ActivityIndicator } from 'react-native';
import { sendChatGPTRequest } from './chatGPTservice';

const chatBotScreen = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendChatGPTRequest(prompt);
      setResponse(result);
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistent medical</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt..."
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Send" onPress={handleSend} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.response}>{response}</Text>
        </View>
      )}
      {error && <Text style={styles.error}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  responseContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  response: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default chatBotScreen;
