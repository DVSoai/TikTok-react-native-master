import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import AuthItem from './AuthItem';

const AuthMenu = ({ isSignIn }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AuthItem
        title='Sử dụng email'
        icon={<Feather name='user' size={24} color='black' />}
        onPress={() => {
          navigation.navigate('AuthEmailScreen', { isSignIn });
        }}
      />
      <AuthItem
        title='Tiếp tục với Facebook'
        icon={<MaterialIcons name='facebook' size={24} color='blue' />}
      />
      <AuthItem
        title='Tiếp tục với Google'
        icon={<AntDesign name='google' size={24} color='red' />}
      />
    </View>
  );
};

export default AuthMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
