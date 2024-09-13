import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

function GameDetailScreen() {
  const route = useRoute();
  // TODO: 게임 상세 API 연동
  const {game} = route.params as any;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{game.team_name} 상세 정보</Text>
      <Text style={styles.info}>팀 ID: {game.team_id}</Text>
      <Text style={styles.info}>MMR: {game.MMR}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default GameDetailScreen;
