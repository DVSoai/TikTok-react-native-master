import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { updateField } from '../../redux/slice/authSlice';

const EditFieldScreen = ({ navigation, route }) => {
  const { title, field, value, maxLength } = route.params;
  const [inputValue, setInputValue] = useState(value || '');
  const dispatch = useDispatch();

  const handlerSave = () => {
    dispatch(updateField({ field: field, value: inputValue }));
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleAlign: 'center',
      headerRight: () => (
        <Pressable
          style={({ pressed }) => [styles.headerButton, pressed && { opacity: 0.5 }]}
          onPress={handlerSave}>
          <Ionicons name='save' size={24} color='black' />
        </Pressable>
      ),
    });
  }, [inputValue, title]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <TextInput
        style={styles.input}
        maxLength={maxLength}
        placeholder={`Nhập ${title}`}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        selectionColor='red'
        keyboardType={field === 'phoneNumber' ? 'phone-pad' : 'default'}
      />
      <Text style={styles.inputLength}>{`${inputValue.length}/${maxLength}`}</Text>
    </View>
  );
};

export default EditFieldScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  inputLength: {
    color: 'gray',
    marginTop: 5,
  },
  headerButton: {
    marginHorizontal: 20,
  },
});
