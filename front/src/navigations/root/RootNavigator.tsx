import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import MainHomeNavigator from '../home/MainHomeNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import MainTabNavigation from '@/navigations/MainTabNavigation';

function RootNavigator() {
  // const {isLogin, isLoginLoading} = useAuth();
  //
  // useEffect(() => {
  //   if (!isLoginLoading) {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 500);
  //   }
  // }, [isLoginLoading]);

  const isLogin = true; // 임시 로그인 처리

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainTabNavigation /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
