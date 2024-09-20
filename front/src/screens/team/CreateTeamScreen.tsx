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
  Alert,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

function CreateTeamScreen({navigation}) {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [region, setRegion] = useState('');
  const [colorsSelected, setColorsSelected] = useState([]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateTeam = () => {
    console.log('팀 이름', teamName);
    console.log('활동 지역', region);
    console.log('유니폼 색상', colorsSelected.map(c => c).join(', '));

    // TODO: 팀 생성 API 호출
    Alert.alert('팀이 생성되었습니다!');
    // navigation.goBack(); // TODO: 생성된 팀 화면으로 이동
  };

  const handleColorSelect = color => {
    if (colorsSelected.includes(color)) {
      setColorsSelected(colorsSelected.filter(c => c !== color));
    } else if (colorsSelected.length < 3) {
      setColorsSelected([...colorsSelected, color]);
    }
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

  return (
    <PanGestureHandler onHandlerStateChange={handlePanGesture}>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={[styles.container, {flex: 1}]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {step === 1 && (
              <>
                <Text style={styles.title}>팀 이름을 입력해 주세요.</Text>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  spellCheck={false}
                  style={styles.input}
                  placeholder="예: 아스모 FC"
                  value={teamName}
                  onChangeText={setTeamName}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableOpacity
                  style={[
                    styles.button,
                    !teamName.trim() && styles.buttonDisabled,
                  ]}
                  onPress={handleNextStep}
                  disabled={!teamName.trim()}>
                  <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.title}>활동 지역을 입력해 주세요.</Text>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  spellCheck={false}
                  style={styles.input}
                  placeholder="예: 서울시 강남구"
                  value={region}
                  onChangeText={setRegion}
                  returnKeyType="done"
                  blurOnSubmit={true}
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
                      !region.trim() && styles.buttonDisabled,
                    ]}
                    onPress={handleNextStep}
                    disabled={!region.trim()}>
                    <Text style={styles.buttonText}>다음</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* 유니폼 색상 선택 단계 */}
            {step === 3 && (
              <>
                <Text style={styles.title}>
                  유니폼 색상을 최대 3개 선택해 주세요.
                </Text>
                <View style={styles.colorContainer}>
                  {[
                    '#FF0000',
                    '#0000FF',
                    '#00FF00',
                    '#FFFF00',
                    '#FF00FF',
                    '#00FFFF',
                    '#800000',
                    '#808000',
                    '#800080',
                    '#008080',
                    '#000080',
                    '#808080',
                    '#C0C0C0',
                    '#FFA500',
                    '#A52A2A',
                    '#7FFF00',
                  ].map(color => {
                    const selectedIndex = colorsSelected.indexOf(color);
                    return (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorBox,
                          {backgroundColor: color},
                          selectedIndex !== -1 && styles.selectedColorBox,
                        ]}
                        onPress={() => handleColorSelect(color)}
                        disabled={
                          colorsSelected.length >= 3 && selectedIndex === -1
                        }>
                        {selectedIndex !== -1 && (
                          <View style={styles.selectionNumber}>
                            <Text style={styles.selectionNumberText}>
                              {selectedIndex + 1}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrevStep}>
                    <Text style={styles.buttonText}>이전</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      colorsSelected.length === 0 && styles.buttonDisabled,
                    ]}
                    onPress={handleNextStep}
                    disabled={colorsSelected.length === 0}>
                    <Text style={styles.buttonText}>다음</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* 입력 내용 확인 및 팀 생성 단계 */}
            {step === 4 && (
              <>
                <Text style={styles.title}>입력 내용을 확인해 주세요.</Text>
                <Text style={styles.summaryText}>팀 이름: {teamName}</Text>
                <Text style={styles.summaryText}>활동 지역: {region}</Text>
                <Text style={styles.summaryText}>유니폼 색상:</Text>
                <View style={styles.colorContainer}>
                  {colorsSelected.map((color, index) => (
                    <View
                      key={color}
                      style={[styles.colorBox, {backgroundColor: color}]}>
                      <View style={styles.selectionNumber}>
                        <Text style={styles.selectionNumberText}>
                          {index + 1}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handlePrevStep}>
                    <Text style={styles.buttonText}>이전</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateTeam}>
                    <Text style={styles.buttonText}>팀 생성하기</Text>
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

const colors = {
  primary: '#882791',
  disabled: '#C0C0C0',
  background: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#7E7E7E',
  border: '#E0E0E0',
  selected: '#D0E8FF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
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
    borderColor: colors.primary,
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
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 12,
  },
});

export default CreateTeamScreen;
