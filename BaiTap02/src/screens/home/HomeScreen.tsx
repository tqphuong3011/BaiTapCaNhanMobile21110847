/* eslint-disable react-native/no-inline-styles */
import {View, Text, Button} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>HomeScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.clear();
          console.log('Clear access token');
        }}
      />
    </View>
  );
};
export default HomeScreen;
