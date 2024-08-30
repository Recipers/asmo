import React from 'react';
import {SafeAreaView, StyleSheet, View, Image, Dimensions} from 'react-native';
import Footer from '@/navigations/Footer';

function TempHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('@/assets/asmo.png')}
        />
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 30,
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default TempHomeScreen;
