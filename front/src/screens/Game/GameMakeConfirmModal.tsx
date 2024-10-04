import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import {useNavigation} from '@react-navigation/native';

interface GameMakeConfirmModalProps {
  isVisible: boolean;
  close: () => void;
}

function GameMakeConfirmModal({isVisible, close}: GameMakeConfirmModalProps) {
  const navigation = useNavigation();
  const moveGameMakeScreen = () => {
    // TODO: GameMakeScreen 네비게이션 타입 지정 필요
    navigation.navigate('GameMakeScreen');
    close();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={close}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.title}>게임을 생성하시겠습니까?</Text>
              <View style={styles.buttonContainer}>
                <CustomButton
                  label={'닫기'}
                  variant={'outlined'}
                  style={[styles.button, styles.findButton]}
                  textStyle={{color: 'gray'}} // 텍스트 스타일 커스터마이징
                  onPress={close}
                />
                <CustomButton
                  label={'생성'}
                  variant={'outlined'}
                  style={[styles.button, styles.createButton]}
                  textStyle={{color: 'white'}}
                  onPress={moveGameMakeScreen}
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
    paddingTop: 10,
    marginBottom: 25,
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

export default GameMakeConfirmModal;
