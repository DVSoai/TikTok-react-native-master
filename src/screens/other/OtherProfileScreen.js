import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '../../components/other/Divider';

import { useUser } from '../../hooks/useUser';
import { postsListenerByUserId } from '../../services/posts';
import ProfilePostItem from './ProfilePostItem';
import ProfileHeader from '../../components/other/ProfileHeader';
import IconButton from '../../components/button/IconButton';
import { getAuth } from 'firebase/auth';
import { logout } from '../../redux/slice/authSlice';

const ProfileScreen = ({ navigation }) => {
  const profileUserIdDisplay = useSelector((state) => state.profile.profileUserIdDisplay);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const userDisplay = useUser(profileUserIdDisplay).data;
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    let unsub = null;
    if (userDisplay) {
      setUser(userDisplay);
      const fetchPosts = async () => {
        const unsub = await postsListenerByUserId(profileUserIdDisplay, (posts) => {
          if (isMounted) {
            setPosts(posts);
          }
        });
        return unsub;
      };
      unsub = fetchPosts();
    }

    return () => {
      isMounted = false;
      if (unsub) {
        unsub.then((unsubscribe) => unsubscribe());
      }
    };
  }, [userDisplay]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
      headerTitleAlign: 'center',
      headerRight: () => {
        if (getAuth().currentUser?.uid === user?.uid) {
          return (
            <View style={{ marginRight: 10 }}>
              <IconButton
                icon='log-out'
                size={24}
                color='black'
                onPress={() => dispatch(logout())}
              />
            </View>
          );
        } else return null;
      },
    });
  }, [user]);

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <Divider color='gray' size={1} />
      <View style={styles.postsContainer}>
        <FlatList
          numColumns={3}
          removeClippedSubviews
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <ProfilePostItem item={item} />}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  navBarContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postsContainer: {
    flex: 1,
  },
});
