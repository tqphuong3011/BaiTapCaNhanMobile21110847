import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useLoginAsyncMutation } from "@/src/infrastructure/redux/apis/auth.api";

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginAsync, { isLoading: isLoggingIn }] = useLoginAsyncMutation();

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    try {
      const payload = {
        email: email.trim(),
        password: password
      };
      console.log('payload', payload);
      
      const response = await loginAsync(payload).unwrap();
      console.log('Login successful:', response);

      Alert.alert("Success", "Login successful!");
      router.replace('/profile'); 
      
    } catch (error: any) {
      console.error('Login error details:', error);
    }

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
          <Text style={styles.header}>Welcome to our app</Text>
          <Text style={styles.subHeader}>Log in to your account using email or social networks</Text>

          <View style={styles.formContainer}>
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

            {/* Sign In Button */}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
               <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>

          {/* Additional options (Optional) */}
          <View style={styles.signupContainer}>
            <Text style={styles.createAccountText}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>{isLoggingIn ? 'Logging in...' : 'Login'}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  signupLink: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#007BFF',
  },
});

export default SignInScreen;
