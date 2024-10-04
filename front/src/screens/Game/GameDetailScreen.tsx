import React from 'react';
import {View, ScrollView, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomButton from '../../components/common/CustomButton';

const GameDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>WAF랑 경기 하실분!</Text>
        <View style={styles.infoCard}>
          <InfoItem label="등록 시간" value="10분 전" />
          <InfoItem label="게임 시작일" value="2024년 10월 22일 오후 2시" />
          <InfoItem label="위치" value="서울특별시 영등포구 대림동 780" />
          <InfoItem label="가격" value="3만원" />
          <InfoItem label="팀 명" value="WAF" />
          <InfoItem label="팀 MMR" value="2400" />
        </View>
        <Text style={styles.description}>
          안녕하세요! {'\n'}
          초보팀입니다. {'\n'}
          많이 많이 문의주세요!
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="신청하기"
          onPress={() => console.log('신청하기 버튼 클릭')}
        />
      </View>
    </SafeAreaView>
  );
};

const InfoItem = ({label, value}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // 버튼 높이만큼 여백 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    minWidth: 80, // 라벨의 최소 너비를 설정하여 정렬
  },
  infoValue: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default GameDetailScreen;
