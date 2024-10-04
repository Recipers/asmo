import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import CustomButton from '@/components/common/CustomButton';

function TeamDetailScreen(props) {
  const route = useRoute();

  // Mock 데이터
  const mockData = {
    team_name: '위 플레이',
    team_id: 2,
    MMR: 2000,
    image_url: 'https://reactjs.org/logo-og.png',
    wins: 10,
    draws: 5,
    losses: 3,
    leader_name: '사람이름 1',
    members: [
      {name: '사람이름 2', position: '미드필더', games_played: 15},
      {name: '사람이름 3', position: '포워드', games_played: 20},
    ],
    next_match: {date: '2024-10-05', opponent: '상대팀A'},
    location: '서울 축구장',
    recent_matches: [
      {date: '2024-09-28', opponent: '상대팀B', score: '3-1'},
      {date: '2024-09-21', opponent: '상대팀C', score: '2-2'},
    ],
  };

  // route.params가 존재하지 않을 경우 mockData 사용
  const {
    team_name,
    team_id,
    MMR,
    image_url,
    wins,
    draws,
    losses,
    leader_name,
    members = mockData.members,
    next_match = mockData.next_match,
    location = mockData.location,
    recent_matches = mockData.recent_matches,
  } = props.route.params || mockData;

  const logo = {
    uri: image_url,
    width: 64,
    height: 64,
  };

  return (
    <View style={styles.container}>
      {/* 본문 스크롤 영역 */}
      <ScrollView style={styles.content}>
        <View style={styles.teamInfo}>
          <Image source={logo} style={styles.teamLogo} />
          <View style={styles.textContainer}>
            <Text style={styles.label}>
              팀 이름: <Text style={styles.info}>{team_name}</Text>
            </Text>
            <Text style={styles.label}>
              팀 ID: <Text style={styles.info}>{team_id}</Text>
            </Text>
            <Text style={styles.label}>
              MMR: <Text style={styles.info}>{MMR}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.recordContainer}>
          <Text style={styles.subHeader}>팀 전적</Text>
          <Text style={styles.info}>
            승리: {wins}, 무승부: {draws}, 패배: {losses}
          </Text>
        </View>

        <View style={styles.membersContainer}>
          <Text style={styles.subHeader}>팀 구성원</Text>
          {members.map((member, index) => (
            <Text key={index} style={styles.info}>
              - {member.name} (포지션: {member.position}, 경기 수:{' '}
              {member.games_played})
            </Text>
          ))}
        </View>

        <View style={styles.nextMatchContainer}>
          <Text style={styles.subHeader}>다음 경기</Text>
          <Text style={styles.info}>날짜: {next_match.date}</Text>
          <Text style={styles.info}>상대팀: {next_match.opponent}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.subHeader}>팀 위치</Text>
          <Text style={styles.info}>장소: {location}</Text>
        </View>

        <View style={styles.leaderContainer}>
          <Text style={styles.subHeader}>팀 리더</Text>
          <Text style={styles.info}>리더: {leader_name}</Text>
        </View>

        <View style={styles.recentMatchesContainer}>
          <Text style={styles.subHeader}>최근 경기 결과</Text>
          {recent_matches.map((match, index) => (
            <Text key={index} style={styles.info}>
              - {match.date}: {match.opponent} (스코어: {match.score})
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View style={styles.buttonContainer}>
        <CustomButton
          label="가입하기"
          onPress={() => console.log('가입하기 버튼 클릭')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  teamLogo: {
    width: 64,
    height: 64,
    marginRight: 15,
    borderRadius: 32,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recordContainer: {
    marginBottom: 20,
  },
  membersContainer: {
    marginBottom: 20,
  },
  nextMatchContainer: {
    marginBottom: 20,
  },
  locationContainer: {
    marginBottom: 20,
  },
  leaderContainer: {
    marginBottom: 20,
  },
  recentMatchesContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    bottom: 15,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default TeamDetailScreen;
