import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5000/api";

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const endpoint = isLogin ? "login" : "register";
      const data = isLogin ? { email, password } : { name, email, password };
      const response = await axios.post(`${API_URL}/auth/${endpoint}`, data);

      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      Alert.alert("Success", isLogin ? "Logged in successfully" : "Registered successfully");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HustleHub</Text>

      {!isLogin && (
        <>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </>
      )}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title={isLogin ? "Login" : "Register"} onPress={handleAuth} />
      )}

      <Button
        title={isLogin ? "Need an account? Register" : "Already have an account? Login"}
        onPress={() => setIsLogin(!isLogin)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14
  }
});
