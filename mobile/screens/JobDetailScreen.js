import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function JobDetailScreen({ route }) {
  const { jobId } = route.params;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/jobs/${jobId}`);
      setJob(response.data);
    } catch (err) {
      setError("Failed to fetch job details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    Alert.alert("Apply", "Apply feature coming soon!");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.category}>{job.category}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget</Text>
        <Text style={styles.budget}>${job.budget}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.text}>{job.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>{job.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posted By</Text>
        <Text style={styles.text}>{job.posted_by}</Text>
        <Text style={styles.rating}>Rating: {job.rating} ⭐</Text>
      </View>

      <View style={styles.actionContainer}>
        <Button title="Apply" onPress={handleApply} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15
  },
  header: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
  },
  category: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#e8f4f8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start"
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22
  },
  budget: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27ae60"
  },
  rating: {
    fontSize: 12,
    color: "#666",
    marginTop: 5
  },
  actionContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center"
  }
});
