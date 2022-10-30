import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BasicButton from '../button/BasicButton';
import { login, register } from '../../redux/slice/authSlice';

const AuthForm = ({ isSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else setIsButtonDisabled(true);
  }, [email, password]);

  const handlerLogin = () => {
    dispatch(login({ email, password }));
  };

  const handlerRegister = () => {
    dispatch(register({ email, password }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Email'
        style={styles.input}
        selectionColor='red'
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder='Password'
        style={styles.input}
        selectionColor='red'
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      {isSignIn && (
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.text}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      )}
      <BasicButton
        title={isSignIn ? 'Đăng nhập' : 'Đăng ký'}
        style={styles.button}
        onPress={isSignIn ? handlerLogin : handlerRegister}
        disabled={isButtonDisabled}
      />
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  input: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 10,
  },
  forgotPassword: {
    marginTop: 15,
  },
  text: {
    fontWeight: 'bold',
  },
});
