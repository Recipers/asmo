import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import GameScreen from '../screens/GameScreen';
import TestScreen from '@/screens/TestScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import HeaderLeft from '@/components/common/HeaderLeft';

function UserScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>내 정보 스크린!</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>캘린더 스크린!</Text>
    </View>
  );
}

function TeamScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>팀 정보 스크린!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const bottomTabNavigations = {
  MAIN_HOME: 'Home',
  MAIN_CALENDAR: 'Calendar',
  MAIN_TEAM: 'Team',
  MAIN_USER: 'User',
} as const;

export type BottomTabParamList = {
  [bottomTabNavigations.MAIN_HOME]: undefined;
  [bottomTabNavigations.MAIN_CALENDAR]: undefined;
  [bottomTabNavigations.MAIN_TEAM]: undefined;
  [bottomTabNavigations.MAIN_USER]: undefined;
};

function TabBarIcons(route: RouteProp<ParamListBase>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case bottomTabNavigations.MAIN_HOME: {
      iconName = focused ? 'home' : 'home-outline';
      break;
    }
    case bottomTabNavigations.MAIN_CALENDAR: {
      iconName = focused ? 'calendar' : 'calendar-outline';
      break;
    }
    case bottomTabNavigations.MAIN_TEAM: {
      iconName = focused ? 'flag' : 'flag-outline';
      break;
    }
    case bottomTabNavigations.MAIN_USER: {
      iconName = focused ? 'person' : 'person-outline';
      break;
    }
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? '#5200ec' : '#000000'}
      size={25}
    />
  );
}

function MainTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: '#ffffff',
          shadowColor: '#e0e0e0',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: '#000000',
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5200ec',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e0e0e0',
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={bottomTabNavigations.MAIN_HOME}
        component={GameScreen}
        options={({navigation}) => ({
          headerTitle: '홈',
          // headerLeft: () => HeaderLeft(navigation),
        })}
      />
      <Tab.Screen
        name={bottomTabNavigations.MAIN_CALENDAR}
        component={CalendarScreen}
        options={({navigation}) => ({
          headerTitle: '일정',
          // headerLeft: () => HeaderLeft(navigation),
        })}
      />
      <Tab.Screen
        name={bottomTabNavigations.MAIN_TEAM}
        component={TestScreen}
        options={({navigation}) => ({
          headerTitle: '팀 정보',
          // headerLeft: () => HeaderLeft(navigation),
        })}
      />
      <Tab.Screen
        name={bottomTabNavigations.MAIN_USER}
        component={UserScreen}
        options={({navigation}) => ({
          headerTitle: '내 정보',
          // headerLeft: () => HeaderLeft(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainTabNavigation;
