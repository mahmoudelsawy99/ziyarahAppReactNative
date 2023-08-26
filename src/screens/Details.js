import React, { useEffect, useState } from 'react';

import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image 
  
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTML from 'react-native-render-html';
import { ScrollView } from 'react-native';
import { Button , Card , Text} from '@ui-kitten/components';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialoag from '../components/Dialoag'
// import COLORS from '../../consts/colors';
import { Dialog, Portal, PaperProvider , Avatar, IconButton} from 'react-native-paper';
import FloatingButton from '../components/ModalTour';
import axios from 'axios';

const COLORS = {
  white: '#FFF',
  dark: '#000',
  primary: '#007A00',
  secondary: '#e1e8e9',
  light: '#f9f9f9',
  grey: '#dddedd',
  red: 'red',
  orange: '#f5a623',
};
  
const DetailsScreen = ({navigation, route}) => {
  const place = route.params;
  const [destinationData, setDestinationData] = useState(null);

  useEffect(() => {
    // Fetch data for the specific destination using Axios
    axios
      .get(`https://ziyarh.com/api/destination/${place.id}`)
      .then((response) => {
        const data = response.data.data;
        setDestinationData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [place.id]);

  if (!destinationData) {
    return null;
  }
console.log("dist***" , destinationData.three_tours)
  console.log("place**** " + place.three_tours);
  const image = {uri:place.thumbnail};
  return (
      
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
     
     <StatusBar hidden={true} />
      <ScrollView contentContainerStyle={style.scrollViewContent}>
      <Image source={image} style={style.backgroundImage} />
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
            style={{  position:'absolute' , top:20 , left:23 , backgroundColor: 'rgba(255,255,255,0.5)' , borderRadius:50 , justifyContent:'center' , alignItems:'center' , paddingLeft:10  , paddingHorizontal:2 , paddingVertical:5 }}
          />
        <View style={style.header}>
          {/* <Icon name="more-vert" size={28} color={COLORS.white} /> */}
        </View>
      <View style={style.detailsContainer}>
        <View style={style.iconContainer}>
          <Icon name="favorite" color={COLORS.red} size={30} />
        </View>
        <View style={style.imageDetails}>
        </View>
          <Text
            style={{
              width: '100%',
              fontSize: 30,
              fontWeight: 'bold',
              // color: COLORS.white,
              marginBottom: 10,
            }}>
            {place.name}
          </Text>
        <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
        Description
        </Text>
        <View style={style.descriptionContainer}>
        <HTML source={{ html: place.description }} />
      </View>
     
        
      </View>
      <View style={style.footer}>
       <FloatingButton tour={destinationData} />
      </View>
    </ScrollView>
    </SafeAreaView>
 
  );
};
const style = StyleSheet.create({
  bookNowBtn: {
    height: 50,
    width: 300,
    backgroundColor: COLORS.primary,
    color:COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.primary
  },

  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    top: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
    // elevation:4
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // position:'absolute'
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  footer: {
    flexDirection: 'row',
    // backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    marginTop:-110
  },
  descriptionContainer: {
    marginBottom: 3,
  },
  textDescription: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    // fontSize: sizes.descriptionSize,
    marginBottom: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    // position: 'relative',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // resizeMode: 'cover',
    width:400,
    height:310
  },
});

export default DetailsScreen;
