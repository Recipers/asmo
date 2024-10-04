import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {colors} from '@/constants';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

function GameMakeScreen({navigation}) {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startDateText, setStartDateText] = useState('시작 시각 선택');
  const [endDate, setEndDate] = useState(new Date());
  const [endDateText, setEndDateText] = useState('종료 시각 선택');
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [isDateValid, hasDateValid] = useState(false);
  const [description, setDescription] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateGame = () => {
    // TODO: 팀 생성 API 호출
    // navigation.goBack(); // TODO: 생성된 팀 화면으로 이동
  };

  const handlePanGesture = ({nativeEvent}) => {
    if (nativeEvent.translationX > 50) {
      if (step > 1) {
        // 두 번째 스텝 이상일 때는 이전 스텝으로 이동
        handlePrevStep();
      } else {
        // 첫 번째 스텝에서 왼쪽으로 스와이프 했을 때 모달로 이동
        navigation.goBack(); // 모달을 닫는 기능을 사용합니다.
      }
    }
  };

  const validDates = (startDateParam: Date, endDateParam: Date) => {
    const now = new Date();
    const dateValid =
      startDateParam > now &&
      endDateParam > now &&
      startDateParam < endDateParam;
    hasDateValid(dateValid);
  };

  return (
    <PanGestureHandler onHandlerStateChange={handlePanGesture}>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={[styles.container, {flex: 1}]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* 게임 장소 입력 단계 */}
            {step === 1 && (
              <>
                <Text style={styles.title}>경기장 위치를 입력해 주세요.</Text>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  spellCheck={false}
                  style={styles.input}
                  placeholder="예: 서울시 강남구"
                  value={location}
                  onChangeText={setLocation}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableOpacity
                  style={[
                    styles.button,
                    !location.trim() && styles.buttonDisabled,
                  ]}
                  onPress={handleNextStep}
                  disabled={!location.trim()}>
                  <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>
              </>
            )}

            {/* 게임 일정 선택 단계 */}
            {step === 2 && (
              <>
                <Text style={styles.title}>경기 일정을 설정해주세요.</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setStartDateOpen(true)}>
                  <Text style={styles.datePickerButtonText}>
                    {startDateText}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={startDateOpen}
                  date={startDate}
                  minuteInterval={30}
                  onConfirm={date => {
                    setStartDateOpen(false);
                    setStartDate(date);
                    setStartDateText(
                      '시작 시각 : ' +
                        dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
                    );
                    validDates(date, endDate);
                  }}
                  onCancel={() => {
                    setStartDateOpen(false);
                  }}
                />
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setEndDateOpen(true)}>
                  <Text style={styles.datePickerButtonText}>{endDateText}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={endDateOpen}
                  date={endDate}
                  minuteInterval={30}
                  onConfirm={date => {
                    setEndDateOpen(false);
                    setEndDate(date);
                    setEndDateText(
                      '종료 시각 : ' +
                        dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
                    );
                    validDates(startDate, date);
                  }}
                  onCancel={() => {
                    setEndDateOpen(false);
                  }}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrevStep}>
                    <Text style={styles.buttonText}>이전</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      !isDateValid && styles.buttonDisabled,
                    ]}
                    onPress={handleNextStep}
                    disabled={!isDateValid}>
                    <Text style={styles.buttonText}>다음</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* 게임 설명 입력 단계 */}
            {step === 3 && (
              <>
                <Text style={styles.title}>추가 상세 내용을 입력해주세요.</Text>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  spellCheck={false}
                  blurOnSubmit={false}
                  style={styles.textArea}
                  placeholder="예: 즐겁게 경기하실 팀을 구합니다."
                  value={description}
                  numberOfLines={4}
                  onChangeText={setDescription}
                  multiline={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrevStep}>
                    <Text style={styles.buttonText}>이전</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      !description.trim() && styles.buttonDisabled,
                    ]}
                    onPress={handleNextStep}
                    disabled={!description.trim()}>
                    <Text style={styles.buttonText}>다음</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* 입력 내용 확인 및 팀 생성 단계 */}
            {step === 4 && (
              <>
                <Text style={styles.title}>입력 내용을 확인해 주세요.</Text>
                <Text style={styles.summaryText}>장소: {location}</Text>
                <Text style={styles.summaryText}>
                  시작 시각:{startDateText}
                </Text>
                <Text style={styles.summaryText}>종료 시각: {endDateText}</Text>
                <Text style={styles.summaryText}>추가 내용: </Text>
                <Text style={styles.summaryText}>{description}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrevStep}>
                    <Text style={styles.buttonText}>이전</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateGame}>
                    <Text style={styles.buttonText}>게임 생성하기</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.BLACK,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    marginBottom: 16,
    minHeight: 200,
  },
  button: {
    backgroundColor: colors.PURPLE_200,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.GRAY_300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  colorBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColorBox: {
    borderWidth: 2,
    borderColor: colors.PURPLE_200,
  },
  selectionNumber: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionNumberText: {
    color: colors.PURPLE_200,
    fontSize: 12,
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 18,
    color: colors.BLACK,
    marginBottom: 12,
  },
  datePickerButton: {
    margin: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_500,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  datePickerButtonText: {
    color: colors.BLACK,
    fontSize: 18,
  },
});

export default GameMakeScreen;
