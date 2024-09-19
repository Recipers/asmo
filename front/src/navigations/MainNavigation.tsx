import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import TestScreen from '@/screens/TestScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import HeaderLeft from '@/components/common/HeaderLeft';
import TempHomeScreen from '@/screens/TempHomeScreen';
import Toast from 'react-native-toast-message';
import CreateOrJoinTeamModal from '@/screens/Team/CreateOrJoinTeamModal';
import {createStackNavigator} from '@react-navigation/stack';
import GameDetailScreen from '../screens/Game/GameDetailScreen';
import CreateTeamScreen from '@/screens/Team/CreateTeamScreen';

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
  Home: undefined;
  Calendar: undefined;
  Team: undefined;
  User: undefined;
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
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
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
          component={HomeScreen}
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
          listeners={({navigation}) => ({
            tabPress: async e => {
              e.preventDefault(); // 바텀 탭 이벤트 비활성화

              // TODO: 팀 가입 여부 API 호출
              const isUserJoinedTeam: boolean = await false; // 실제 API 호출 필요

              if (!isUserJoinedTeam) {
                setModalVisible(true);
                return;
              }
              navigation.navigate(bottomTabNavigations.MAIN_TEAM);
            },
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
      <CreateOrJoinTeamModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({});

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameDetailScreen"
        component={GameDetailScreen}
        options={{title: '게임 상세 정보'}}
      />
      <Stack.Screen
        name="CreateTeamScreen"
        component={CreateTeamScreen}
        options={{title: '팀 만들기', headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
