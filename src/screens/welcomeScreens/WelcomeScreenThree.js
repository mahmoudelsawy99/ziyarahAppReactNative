import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import colors from '../../assets/Colors';
import sizes from '../../assets/Sizes';
import { useFonts } from 'expo-font';
import Button from '../../components/Button';
import Lines from '../../components/Lines';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreenThree = () => {
  const [loaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        <Image style={styles.picture} source={require('../../assets/imgs/logo-empty.png')} resizeMode="contain" />
      </View>

      <Text style={styles.textMain}>Ziyah</Text>
      <Text style={styles.textSecondary}>
        طريقك لزيارة المواقع الإسلامية {'\n'}
        اسلامی مقامات پر جانے کا آپ کا طریقہ {'\n'}
        Your Way to Visit Islamic Destinations {'\n'}
        Cara Anda Mengunjungi Destinasi Islami. {'\n'}
      </Text>

      <Lines colorOne={colors.green} colorTwo={colors.green} numLines={3} />

      <Button name="Get Started" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textMain: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.headerSize,
    color: colors.main,
    alignSelf: 'center',
    marginBottom: 10,
  },
  textSecondary: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.paragraphSize,
    color: colors.secondary,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  pictureContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 400, // Adjust the size as needed
    height: 250, // Adjust the size as needed
  },
});

export default WelcomeScreenThree;
