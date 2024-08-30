import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Toast from 'react-native-toast-message';

import InputField from '@/components/common/InputField';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import {validateSignup} from '@/utils';
import {errorMessages} from '@/constants';

function SignupScreen() {
  const {signupMutation, loginMutation} = useAuth();
  const nicknameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordForCheckRef = useRef<TextInput | null>(null);
  const signup = useForm({
    initialValue: {email: '', password: '', nickname: '', passwordForCheck: ''},
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const {email, nickname, password, passwordForCheck} = signup.values;
    signupMutation.mutate(
      {email, nickname, password, passwordForCheck},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
        onError: error =>
          Toast.show({
            type: 'error',
            text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
            position: 'bottom',
            visibilityTime: 2000,
          }),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => nicknameRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={nicknameRef}
          placeholder="닉네임"
          error={signup.errors.nickname}
          touched={signup.touched.nickname}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('nickname')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordForCheckRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordForCheckRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordForCheck}
          touched={signup.touched.passwordForCheck}
          secureTextEntry
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordForCheck')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
