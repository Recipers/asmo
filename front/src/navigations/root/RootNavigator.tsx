import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import MainHomeNavigator from '../home/MainHomeNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

function RootNavigator() {
  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainHomeNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
