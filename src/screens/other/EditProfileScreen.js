import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { updateAvatar } from '../../redux/slice/authSlice';
import { Octicons } from '@expo/vector-icons';
import Avatar from '../../components/other/Avatar';

const EditProfileScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handlerUpdateAvatar = async () => {
    const options = {
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
    };
    const response = await ImagePicker.launchImageLibraryAsync(options);
    if (!response.cancelled) {
      dispatch(updateAvatar(response.uri));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Pressable style={styles.avatar} onPress={handlerUpdateAvatar}>
          <Avatar size={100} uri={currentUser.photoURL} />
          <View style={styles.avatarOverlay}>
            <Ionicons name='camera-outline' size={24} color='white' />
          </View>
        </Pressable>
        <Text style={styles.label}>Thay đổi ảnh</Text>
      </View>
      <View style={styles.informationContainer}>
        <InformationItem
          name='Tên'
          value={currentUser.displayName}
          onPress={() =>
            navigation.navigate('EditFieldScreen', {
              title: 'Tên',
              field: 'displayName',
              value: currentUser.displayName,
              maxLength: 30,
            })
          }
        />
        <InformationItem
          name='Số Điện thoại'
          value={currentUser.phoneNumber}
          onPress={() =>
            navigation.navigate('EditFieldScreen', {
              title: 'Số Điện thoại',
              field: 'phoneNumber',
              value: currentUser.phoneNumber,
              maxLength: 10,
            })
          }
        />
      </View>
    </View>
  );
};

const InformationItem = ({ name, value, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.informationItem, pressed && { opacity: 0.5 }]}
      onPress={onPress}>
      <Text style={styles.fieldName}>{name}</Text>
      <View style={styles.fieldValueContainer}>
        <Text style={styles.fieldValue}>{value}</Text>
        <Octicons name='chevron-right' size={24} color='black' />
      </View>
    </Pressable>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
  },
  informationContainer: {
    marginTop: 50,
  },
  informationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginVertical: 5,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 16,
    marginRight: 10,
  },
});
