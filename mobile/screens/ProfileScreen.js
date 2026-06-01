import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert, FlatList, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("userToken");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Fetch user's jobs
        // Assuming we have a route to get user's jobs
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("user");
      Alert.alert("Success", "Logged out successfully");
    } catch (err) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {user && (
        <>
          <View style={styles.profileCard}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.rating}>Rating: {user.rating} ⭐</Text>
          </View>

          <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10
  },
  rating: {
    fontSize: 16,
    color: "#f39c12",
    fontWeight: "bold"
  }
});
