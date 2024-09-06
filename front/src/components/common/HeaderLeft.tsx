import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderButton from '@/components/common/HeaderButton';
import Icon from 'react-native-vector-icons/Feather';

function HeaderLeft({navigation}) {
  return (
    <HeaderButton
      icon={<Icon name={'chevron-left'} size={25} color={'#000'} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

const styles = StyleSheet.create({});

export default HeaderLeft;
