import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5000/api";

export default function CreateJobScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateJob = async () => {
    if (!title || !description || !budget || !location || !category) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        `${API_URL}/jobs`,
        {
          title,
          description,
          budget: parseFloat(budget),
          location,
          category
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      Alert.alert("Success", "Job posted successfully!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.response?.data?.error || "Failed to create job");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Describe the job"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Budget ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter budget"
        value={budget}
        onChangeText={setBudget}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Web Development, Design, etc."
        value={category}
        onChangeText={setCategory}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Post Job" onPress={handleCreateJob} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
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
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 14
  }
});
