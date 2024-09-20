import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputField from '@/components/common/InputField';

type Team = {
  team_id: number;
  team_name: string;
  MMR: number;
  image_url: string;
};

const mockData: Team[] = [
  {
    team_id: 1,
    team_name: '워프',
    MMR: 1000,
    image_url: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    team_id: 2,
    team_name: '위 플레이',
    MMR: 2000,
    image_url: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    team_id: 3,
    team_name: '꾸르꾸르',
    MMR: 1500,
    image_url: 'https://reactnative.dev/img/tiny_logo.png',
  },
  // ... 나머지 데이터도 동일하게 추가
];

const FindTeamScreen = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchText, setSearchText] = useState('');
  const [appliedTeams, setAppliedTeams] = useState<number[]>([]); // 신청한 팀 목록

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    // TODO: Team 목록 불러오는 API (팀 생성일 기준 내림차순)
    const sortedData = mockData.sort((a, b) => b.team_id - a.team_id);
    setTeams(sortedData);
  };

  const handleApply = (team: Team) => {
    if (!appliedTeams.includes(team.team_id)) {
      // 신청한 팀 목록에 추가
      setAppliedTeams([...appliedTeams, team.team_id]);
      Alert.alert(
        '가입 신청',
        `${team.team_name} 팀에 가입 신청을 하였습니다.`,
      );
      // TODO: 팀 가입 신청 API 호출
    } else {
      Alert.alert(
        '이미 신청하셨습니다',
        `${team.team_name} 팀에 이미 가입 신청을 하였습니다.`,
      );
    }
  };

  // 검색어에 따라 팀 필터링
  const filteredTeams = teams.filter(team =>
    team.team_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={{flex: 1, padding: 16}}>
      {/* TODO: 팀 검색 API 호출*/}
      {/* 검색 필드 */}
      <InputField
        placeholder="팀 이름을 검색하세요"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 8,
          marginBottom: 16,
        }}
      />

      {/* 팀 목록 */}
      <FlatList
        data={filteredTeams}
        keyExtractor={item => item.team_id.toString()}
        renderItem={({item}) => {
          const isApplied = appliedTeams.includes(item.team_id);
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.image_url}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 16,
                  }}
                />
                <View>
                  <Text style={{fontSize: 16}}>{item.team_name}</Text>
                  <Text style={{color: 'gray'}}>MMR: {item.MMR}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleApply(item)}
                disabled={isApplied}
                style={{
                  backgroundColor: isApplied ? 'gray' : '#882791',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                }}>
                <Text style={{color: '#fff'}}>
                  {isApplied ? '신청 완료' : '가입 신청'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FindTeamScreen;
