import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import {
  ActivityIndicator,
  Animated,
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollView = Animated.ScrollView;
import * as url from 'node:url';
import {StyleSheet} from 'react-native';
// import MatchScreen from '@/screens/auth/MatchScreen';

type Game = {
  team_id: number;
  team_name: string;
  MMR: number;
};

const mockData: Game[] = [
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
  },
];

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

function HomeScreen() {
  const navigation = useNavigation();

  const handleTeamPress = (game: Game) => {
    navigation.navigate('GameDetailScreen', {game});
  };

  return (
    <ScrollView>
      {mockData.map((item: Game, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.boardList}
          onPress={() => handleTeamPress(item)}>
          <Image source={logo} />
          <Text>팀명: {item.team_name}</Text>
          <Text>MMR: {item.MMR}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 100,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardList: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
