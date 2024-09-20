import React from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';
import {useNavigation} from '@react-navigation/native';
import createTeamScreen from '@/screens/team/CreateTeamScreen';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';

interface CreateOrJoinTeamModalProps {
  visible: boolean;
  onClose: () => void;
}

// TODO: color 부분 상수 폴더로 리팩터링 필요
function CreateOrJoinTeamModal({visible, onClose}: CreateOrJoinTeamModalProps) {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.title}>소속된 팀이 없어요</Text>
              <Text style={styles.subtitle}>
                팀명을 검색 후 가입하거나 {'\n'} 팀을 새로 만들어 보세요
              </Text>

              <View style={styles.buttonContainer}>
                <CustomButton
                  label={'팀 찾기'}
                  variant={'outlined'}
                  style={[styles.button, styles.findButton]}
                  textStyle={{color: 'gray'}} // 텍스트 스타일 커스터마이징
                  onPress={() => {
                    navigation.navigate('SearchTeamScreen');
                    onClose();
                  }}
                />
                <CustomButton
                  label={'팀 생성하기'}
                  variant={'outlined'}
                  style={[styles.button, styles.createButton]}
                  textStyle={{color: 'white'}}
                  onPress={() => {
                    // TODO: CreateTeamScreen 네비게이션 타입 지정 필요
                    navigation.navigate('CreateTeamScreen');
                    onClose();
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경 반투명 처리
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white', // 흰 배경
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // 좌우 배치
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5, // 좌우 간격
  },
  findButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'purple',
  },
  createButton: {
    backgroundColor: 'purple',
  },
});

export default CreateOrJoinTeamModal;
