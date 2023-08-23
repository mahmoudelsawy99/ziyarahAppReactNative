import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../assets/Colors';
import sizes from '../assets/Sizes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Card = (props) => {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth - 20; // Subtracting the horizontal padding

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <Image source={props.image} style={styles.image} />
        <View style={styles.textAlign}>
          <Text style={styles.textHeader}>{props.header}</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="heart-outline" color={colors.greenLight} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoAlign}>
          <MaterialCommunityIcons name="star" color={colors.starColor} size={24} />
          <Text style={styles.result}>{props.result}</Text>
          <Text style={styles.reviews}>({props.reviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reviews: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.buttonTextSmall,
    color: colors.secondary,
    marginHorizontal: 4,
  },
  result: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.paragraphSizeSmaller,
    marginHorizontal: 4,
  },
  infoAlign: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 12,
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.menuText,
  },
  textAlign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
    marginBottom: 7,
    marginHorizontal: 12,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  cardContainer: {
    height: 230,
    borderRadius: 20,
    backgroundColor: colors.white,
    elevation: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    overflow: 'hidden',
    // alignItems: 'center',
  },
});

export default Card;
