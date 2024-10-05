import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {colors} from '@/constants';
import {FlatList} from 'react-native';
import {StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import useModal from '@/hooks/useModal';
import GameMakeConfirmModal from '@/screens/Game/GameMakeConfirmModal';

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

function GameScreen() {
  const gameMakeConfirmModal = useModal();
  const navigation = useNavigation();
  const handleTeamPress = (game: Game) => {
    navigation.navigate('GameDetailScreen', {game});
  };

  return (
    <View>
      <FlatList
        data={mockData}
        renderItem={data => (
          <TouchableOpacity
            key={data.index}
            style={styles.boardList}
            onPress={() => handleTeamPress(data.item)}>
            <Image source={logo} />
            <Text>팀명: {data.item.team_name}</Text>
            <Text>MMR: {data.item.MMR}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonList}>
        <Pressable
          style={styles.floattingButton}
          onPress={gameMakeConfirmModal.show}>
          <Feather name="plus" color={colors.WHITE} size={25} />
        </Pressable>
        <GameMakeConfirmModal
          isVisible={gameMakeConfirmModal.isVisible}
          close={gameMakeConfirmModal.hide}
        />
      </View>
    </View>
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
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  floattingButton: {
    backgroundColor: colors.PURPLE_700,
    marginVertical: 5,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    shadowColor: colors.UNCHANGE_BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
    flexDirection: 'row', // 아이콘과 텍스트를 한 줄로 배치
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10, // 아이콘과 텍스트 사이의 간격
    fontSize: 16,
  },
});

export default GameScreen;
