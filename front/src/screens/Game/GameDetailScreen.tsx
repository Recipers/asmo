// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {useRoute} from '@react-navigation/native';
// import CustomButton from '../../components/common/CustomButton';

// function GameDetailScreen() {
//   const route = useRoute();
//   // TODO: 게임 상세 API 연동
//   const {game} = route.params as any;

//   const handleSubmit = () => {
//     console.log('버튼이 눌렸습니다!');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>노트북 MacBook Pro 2023</Text>

//       <View style={styles.card}>
//         <View style={styles.cardContent}>
//           <Text style={styles.cardItem}>
//             <Text style={styles.label}>등록 시간: </Text>
//             10분 전
//           </Text>
//           <Text style={styles.cardItem}>
//             <Text style={styles.label}>게임 시작일: </Text>
//             2024년 10월 22일 오후 2시
//           </Text>
//           <Text style={styles.cardItem}>
//             <Text style={styles.label}>위치: </Text>
//             서울특별시 영등포구 대림동 780
//           </Text>
//           <Text style={styles.cardItem}>
//             <Text style={styles.label}>가격: </Text>
//             3만원
//           </Text>
//           <Text style={styles.cardItem}>
//             <Text style={styles.label}>팀 명: </Text>
//             WAF
//           </Text>
//           <Text style={styles.cardItem}>
//             <Text style={styles.label}>팀 MMR: </Text>
//             2400
//           </Text>
//         </View>
//       </View>

//       <Text style={styles.description}>
//         안녕하세요!{'\n'}
//         MacBook Pro 2023 모델입니다{'\n'}
//         M2 칩, 16GB RAM, 512GB SSD{'\n'}
//         거의 새 제품입니다. 문의주세요!
//       </Text>

//       <CustomButton
//         label="신청하기"
//         variant="filled"
//         size="large"
//         onPress={handleSubmit}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//     marginBottom: 16,
//   },
//   cardContent: {
//     padding: 16,
//   },
//   cardItem: {
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   label: {
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
// });

// export default GameDetailScreen;

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
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default GameDetailScreen;
