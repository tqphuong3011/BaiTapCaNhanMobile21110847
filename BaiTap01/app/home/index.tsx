import { View, Text, StyleSheet  } from "react-native";

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Homepage</Text>
      <Text style={styles.subtitle}>Bài tập 01 - React Native</Text>
    </View>
  );
}
   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
}); 