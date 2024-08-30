/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';

function UsersScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Users!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    // <View style={styles.footer}>
    //   <TouchableOpacity style={styles.iconContainer}>
    //     <Icon name="home" size={24} color="#000000" />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.iconContainer}>
    //     <Icon name="calendar" size={24} color="#000000" />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.iconContainer}>
    //     <Icon name="flag" size={24} color="#000000" />
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.iconContainer}>
    //     <Icon name="user" size={24} color="#000000" />
    //   </TouchableOpacity>
    // </View>

    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarLabel: 'Users',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabNavigation;
