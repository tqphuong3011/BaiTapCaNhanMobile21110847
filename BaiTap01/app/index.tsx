import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';
import { router  } from 'expo-router';

export default function Introduction() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.navigate('/home');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/phuong.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>TRẦN QUỐC PHƯƠNG</Text>
      <Text style={styles.info}>MSSV: 21110847</Text>
      <Text style={styles.info}>Ngành: Công nghệ thông tin</Text>
      <Text style={styles.redirect}>Chuyển trang sau 10 giây...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1D8C3',
    padding: 20,
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 75,
    marginBottom: 20,
    resizeMode:'cover',
  },
  name: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  info: {
    fontSize: 20,
    marginBottom: 5,
    color: '#333',
  },
  redirect: {
    marginTop: 100,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});