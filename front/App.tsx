import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import RootNavigator from './src/navigations/root/RootNavigator';
import {colors} from '@/constants';
import queryClient from './src/api/queryClient';
import {removeEncryptStorage} from '@/utils/encryptStorage';
import {storageKeys} from '@/constants';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import BottomTabNavigation from './src/navigations/BottomTabNavigation';

removeEncryptStorage(storageKeys.REFRESH_TOKEN);

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.BLUE_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors.RED_500}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <RootNavigator /> */}
        <Toast config={toastConfig} />
        <BottomTabNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
