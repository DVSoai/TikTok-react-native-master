import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import AuthForm from '../../components/auth/AuthForm';

const AuthEmailScreen = ({ route, navigation }) => {
  const isSignIn = route.params.isSignIn;

  useEffect(() => {
    navigation.setOptions({
      title: isSignIn ? 'Đăng nhập bằng email' : 'Đăng ký bằng email',
    });
  }, []);

  return (
    <View style={styles.container}>
      <AuthForm isSignIn={isSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthEmailScreen;
