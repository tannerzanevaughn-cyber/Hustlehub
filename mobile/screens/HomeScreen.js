import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function HomeScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/jobs`);
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJobPress = (jobId) => {
    navigation.navigate("JobDetail", { jobId });
  };

  const renderJobCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.postedBy}>Posted by: {item.posted_by}</Text>
      <Text style={styles.budget}>${item.budget}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Button title="View Details" onPress={() => handleJobPress(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HustleHub</Text>
        <Button title="Post A Job" onPress={() => navigation.navigate("CreateJob")} />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchJobs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  postedBy: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5
  },
  budget: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 5
  },
  location: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: 10
  }
});
