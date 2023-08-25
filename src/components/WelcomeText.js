import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity , Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sizes from '../assets/Sizes';
import colors from '../assets/Colors';
import { useFonts } from 'expo-font';

const WelcomeText = (props) => {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.textWrapper}>
      <View>
        <Text style={styles.textWelcome}>Hi, {props.name}👋</Text>
        <Text style={styles.textTravel}>Let’s Travel Now</Text>
      </View>

      <TouchableOpacity onPress={props.onPress}>
        {/* <MaterialCommunityIcons
          name="bell-badge-outline"
          size={sizes.bellSize}
        /> */}
           <Image
                source={require("../assets/imgs/makka1.jpg")}
                style={styles.image}
              />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textWelcome: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.welcomeText,
    color: colors.secondary,
  },
  textTravel: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.buttonTextSize,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 45,
    marginVertical: -45,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 42,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

export default WelcomeText;
