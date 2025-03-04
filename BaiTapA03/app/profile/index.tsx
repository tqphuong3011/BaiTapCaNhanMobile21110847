import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  // State for handling the profile information
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('password123');

  // Form submission handler
  const onSave = () => {
    // Basic validation
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    // Simulate saving the profile
    console.log("Profile updated with", { name, email, password });
    Alert.alert("Success", "Your profile has been updated.");
  };

  // Simple email validation
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Your Profile</Text>
          <Text style={styles.subHeader}>Edit your profile information below.</Text>

          <View style={styles.formContainer}>
            {/* Name Input */}
            <TextInput
              style={styles.inputField}
              placeholder="Full Name"
              autoCapitalize="words"
              autoCorrect={false}
              value={name}
              onChangeText={setName}
            />

            {/* Email Input */}
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={onSave}>
              <Text style={styles.buttonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  inputField: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'TenorSans-Regular',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ProfileScreen;
