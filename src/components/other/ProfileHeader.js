import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextIconButton from '../../components/button/TextIconButton';
import Avatar from '../../components/other/Avatar';
import { getAuth } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFollowing } from '../../hooks/useFollowing';
import { useFollowingMutation } from '../../hooks/useFollowingMutation';

const ProfileHeader = ({ user }) => {
  const navigation = useNavigation();
  const userIsFollowing = useFollowing(getAuth().currentUser?.uid, user?.uid).data;
  const userIsFollowingMutation = useFollowingMutation();
  const isCurrentUser = getAuth().currentUser?.uid === user?.uid;

  return (
    <View style={styles.profileHeaderContainer}>
      <Avatar size={80} uri={user?.photoURL} />
      <Text style={styles.profileEmail}>{user?.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItem}>
          <Text style={styles.counterNumber}>4</Text>
          <Text style={styles.counterText}>Follower</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counterNumber}>4</Text>
          <Text style={styles.counterText}>Follower</Text>
        </View>
        <View style={styles.counterItem}>
          <Text style={styles.counterNumber}>4</Text>
          <Text style={styles.counterText}>Follower</Text>
        </View>
      </View>
      <View style={styles.editButtonContainer}>
        {isCurrentUser ? (
          <TextIconButton
            title='Sửa hồ sơ'
            onPress={() => navigation.navigate('EditProfileScreen')}
          />
        ) : (
          <Follow
            user={user}
            navigation={navigation}
            isFollowed={userIsFollowing}
            onChange={() =>
              userIsFollowingMutation.mutate({
                otherUserId: user.uid,
                isFollowing: userIsFollowing,
              })
            }
          />
        )}
      </View>
    </View>
  );
};

const Follow = ({ isFollowed, onChange, user, navigation }) => {
  return (
    <View style={styles.followContainer}>
      {isFollowed ? (
        <View style={styles.followedButtonContainer}>
          <TextIconButton
            title='Nhắn tin'
            onPress={() =>
              navigation.navigate('ChatSingleScreen', {
                contactId: user.uid,
                contactName: user.displayName,
              })
            }
          />
          <Pressable
            onPress={onChange}
            style={({ pressed }) => [styles.followedButton, pressed && { opacity: 0.5 }]}>
            <Feather name='user-check' size={24} color='black' />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={onChange}
          style={({ pressed }) => [styles.followButton, pressed && { opacity: 0.5 }]}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Follow</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profileHeaderContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 50,
  },
  profileEmail: {
    fontSize: 16,
    marginTop: 10,
  },
  counterContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterItem: {
    flex: 1,
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 16,
    color: 'gray',
  },
  editButtonContainer: {
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  followedButtonContainer: {
    flexDirection: 'row',
  },
  followedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#DCD7C9',
    borderRadius: 5,
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#DCD7C9',
    borderRadius: 5,
  },
});
