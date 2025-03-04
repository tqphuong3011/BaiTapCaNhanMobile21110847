/* eslint-disable react-native/no-inline-styles */

import {Image, Switch} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Lock, Sms} from 'iconsax-react-native';
import {Validate} from '../../utils/validate';
import {SocialLogin} from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    try {
      // Hardcoded token for testing
      const token = 'auth-token-123';
      await AsyncStorage.setItem('accessToken', token);
      console.log('Login with: ', {email, password, isRemember, token});

      // Clear form
      setEmail('');
      setPassword('');
      setIsRemember(true);

      // Navigate to Main
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>

      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
          <Switch
            trackColor={{true: appColors.primary}}
            thumbColor={appColors.white}
            value={isRemember}
            onChange={() => setIsRemember(!isRemember)}
          />
          <SpaceComponent width={4} />
          <TextComponent text="Remember me" />
        </RowComponent>
        <ButtonComponent
          text="Forgot Password?"
          onPress={() => navigation.navigate('ForgotPassword')}
          type="text"
        />
      </SectionComponent>

      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          text="SIGN IN"
          type="primary"
          onPress={handleLogin}
        />
      </SectionComponent>

      <SocialLogin />

      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account? " />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
