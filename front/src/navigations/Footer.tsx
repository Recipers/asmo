import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="home" size={24} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="calendar" size={24} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="flag" size={24} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="user" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;
