import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import AuthMenu from '../../components/auth/AuthMenu';
import AuthHeader from '../../components/auth/AuthHeader';
import { useIsFocused } from '@react-navigation/native';

const AuthScreen = ({ navigation }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        title: isSignIn ? 'Đăng nhập' : 'Đăng ký',
      });
    }
  }, [isSignIn, isFocused]);

  const title = isSignIn ? 'Đăng nhập vào TikTok' : 'Đăng ký TikTok';
  const subtitle = isSignIn
    ? 'Quản lý tài khoản, kiểm tra thông báo, bình luận trên các video, v.v.'
    : 'Tạo hồ sơ, theo dõi các tài khoản khác, quay video của chính bạn, v.v.';
  return (
    <View style={styles.container}>
      <AuthHeader title={title} subtitle={subtitle} />
      <AuthMenu isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
      <Pressable
        onPress={() => setIsSignIn(!isSignIn)}
        style={({ pressed }) => [styles.buttonContainer, pressed && { opacity: 0.5 }]}>
        <Text style={styles.text}>
          {isSignIn ? 'Bạn không có tài khoản?' : 'Bạn đã có tài khoản?'}{' '}
          <Text style={styles.textRed}>{isSignIn ? 'Đăng ký' : 'Đăng nhập'}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 20,
  },
  text: {
    textAlign: 'center',
  },
  textRed: {
    color: 'red',
    fontWeight: '500',
  },
});

export default AuthScreen;
