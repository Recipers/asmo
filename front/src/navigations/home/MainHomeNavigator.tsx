import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '@/constants';
import HomeScreen from '@/screens/HomeScreen';

export type MainHomeStackParamList = {
  ['home']: undefined;
};

const Stack = createStackNavigator<MainHomeStackParamList>();

function MainHomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.GRAY_100,
        },
        headerStyle: {
          shadowColor: colors.GRAY_200,
          backgroundColor: colors.WHITE,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
      }}>
      <Stack.Screen name={'home'} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default MainHomeNavigator;
