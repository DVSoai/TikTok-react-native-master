import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchUserItem from '../../components/search/SearchUserItem';
import { queryUsersByName } from '../../services/search';
import { useDispatch } from 'react-redux';
import { setProfileUserIdDisplay } from '../../redux/slice/profileSlice';

const SearchScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const users = await queryUsersByName(searchValue);
      setSearchUsers(users);
    })();
  }, [searchValue]);

  const handlerChoseUser = (userId) => {
    dispatch(setProfileUserIdDisplay(userId));
    navigation.navigate('OtherProfile');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Tìm bạn bè'
        style={styles.inputSearch}
        selectionColor='red'
        value={searchValue}
        onChangeText={(value) => setSearchValue(value)}
      />
      <FlatList
        style={styles.searchUserList}
        data={searchUsers}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <SearchUserItem user={item} onPress={() => handlerChoseUser(item.id)} />
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  inputSearch: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'black',
    fontSize: 18,
  },
});
