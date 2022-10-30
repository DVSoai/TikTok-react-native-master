import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';

const TopTab = createMaterialTopTabNavigator();

const HomeScreens = () => {
  return (
    <TopTab.Navigator tabBar={() => null}>
      <TopTab.Screen name='FeedScreen' component={FeedScreen} />
      <TopTab.Screen
        name='UserProfile'
        component={ProfileScreen}
        initialParams={{ isCurrentUser: false }}
      />
    </TopTab.Navigator>
  );
};

export default HomeScreens;
