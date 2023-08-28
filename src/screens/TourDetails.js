import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import  Icons  from '@expo/vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import HTML from 'react-native-render-html';
import colors from '../assets/Colors';
// import Column from '../components/column';
import Svg, { Line, Circle } from 'react-native-svg';
import { BackgroundImage } from 'react-native-elements/dist/config';
import Icon from 'react-native-vector-icons/MaterialIcons';


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
const TourDetails = ({ route, navigation }) => {
  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    fetchTourData(route.params.id);
  }, [route.params.id]);

  const fetchTourData = (id) => {
    // Fetch tour details using API
    fetch(`https://ziyarh.com/api/tour/${id}`)
      .then((response) => response.json())
      .then((data) => setTourData(data.data))
      .catch((error) => {
        console.error('Error fetching tour details:', error);
      });
  };

  if (!tourData) {
    return <Text>Loading...</Text>;
  }
  console.log("icooooon " , tourData.facilities[0].name);
  const renderIcon = (facilityName) => {
    if (facilityName === 'Guide') {
      return <Icons name="account-question-outline" size={30} color={colors.shadow} style={styles.facilityIcon} />;
    } else if (facilityName === 'Translation') {
      return <Icons name="translate" size={30} color={colors.shadow} style={styles.facilityIcon}/>;
    } else if (facilityName === 'Refreshments') {
      return <Icons name="food-fork-drink" size={30} color={colors.shadow} style={styles.facilityIcon} />;
    } else if (facilityName === 'Lunch') {
    return <Icons name="food" size={30} color={colors.shadow} style={styles.facilityIcon} />;
  }
  else if (facilityName === 'Gift(tShirt)') {
    return <Icons name="gift-open-outline" size={30} color={colors.shadow} style={styles.facilityIcon} />;
  }  else {
      // Default case when facilityName doesn't match any specific icon
      return <Icons name="help-circle" size={30} color={colors.shadow} style={styles.facilityIcon}/>;
    }
  }


  return (
    <ScrollView style={styles.container}>
      <BackgroundImage source={{ uri: tourData.destination.thumbnail }} style={{padding:5}} >
      <Icon
    name="arrow-back-ios"
    size={28}
    color={COLORS.white}
    onPress={() => navigation.goBack()}
    style={{
      position: 'absolute',
      top: 20,
      left: 20, // Adjust this value as needed
      zIndex: 2, // Set zIndex to ensure it's displayed above other elements
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingHorizontal: 2,
      paddingVertical: 5,
    }}
  />
      {/* Tour Title */}
      <Text style={styles.title}>{tourData.title}</Text>

      {/* Tour Image */}
      <TouchableOpacity onPress={() => alert('Enlarge image here')}>
        <Image style={styles.image} />
      </TouchableOpacity>
      </BackgroundImage>

      {/* Tour Description */}
      <View style={styles.descriptionContainer}>
        <HTML source={{ html: tourData.destination.description }} />
      </View>

      {/* Tour Facilities */}
      <View style={styles.facilitiesContainer}>
        <Text style={styles.facilitiesTitle}>Facilities Available</Text>
        <View style={{flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
        {tourData.facilities.map((facility) => (
          <View key={facility.id} style={styles.facilityItem}>
            {renderIcon(facility.name)}
            <Text style={styles.facilityName}>{facility.name}</Text>
          </View>
        ))}
        </View>
      </View>

      {/* Tour Plans */}
      <View style={styles.tourPlansContainer}>
        <Text style={styles.tourPlansTitle}>Tour Plans</Text>
        <View style={{marginLeft:-100 , marginBottom:-100}}>

        {tourData.tourPlans.map((plan) => (
          <TouchableOpacity key={plan.id} style={styles.tourPlan} onPress={() => alert(plan.description)}>
            <Text style={styles.tourPlanTitle}>{plan.title}</Text>
            <Text style={styles.tourPlanTime}>{plan.time}</Text>
            <Text style={styles.tourPlanDescription}>{plan.description}</Text>
          </TouchableOpacity>
        ))}
        </View>
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , position:'absolute' , left:320 , top:85 }}>
  <Svg height="300" width="50">
    <Line
      x1="25"
      y1="0"
      x2="25"
      y2="300"
      stroke="grey"
      strokeWidth="1"
    />
    <Circle cx="25" cy="50" r="10" fill="green" stroke="white" strokeWidth="3" />
    <Circle cx="25" cy="170" r="10" fill="green" stroke="white" strokeWidth="3" />
    <Circle cx="25" cy="270" r="10" fill="green" stroke="white" strokeWidth="3"/>
  </Svg>
</View>
        <View style={{position:"absolute" }}>
       
        </View>
      <TouchableOpacity
        style={styles.seeSchedulesButton}
        onPress={() => navigation.navigate('TourSchedules', { data: tourData })}
      >
        <Text style={styles.buttonText}>See Schedules</Text>
      </TouchableOpacity>
      </View>

      {/* See Schedules Button */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor:'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color:colors.shadow
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  description:{
    width:100 , 
    height:100
  },
  descriptionContainer: {
    fontSize: 16,
    marginBottom: 16,
    margin: 16,
    color: 'gray',
    padding:20,
    backgroundColor:colors.third,
    elevation:3,
    borderRadius:50
  },
  facilitiesContainer: {
    marginBottom: 16,
    padding:10
  },
  facilitiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color:colors.shadow
  },
  facilityItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  facilityName: {
    fontSize: 16,
    color:colors.shadow,
    // fontWeight:'500'
    // marginLeft: 7,
  },
  facilityIcon:{
    // height: 60,
    // width: 60,
    backgroundColor: COLORS.secondary,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:13,
    borderRadius: 50,
    marginBottom:5,
    elevation:2
  },
  tourPlansContainer: {
    elevation:4,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width:"100%",
    backgroundColor:'white',
  },
  tourPlansTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -18,
    marginBottom: 18,
    color:colors.shadow
  },
  tourPlan: {
    marginBottom: 20,
    marginLeft: 100,
    padding: 8,
    // backgroundColor: '#ceefb7',
    borderRadius: 20,
    width:300,
    // elevation:4
  },
  tourPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.green
  },
  tourPlanTime: {
    fontSize: 16,
    color: 'gray',
  },
  tourPlanDescription: {
    fontSize: 16,
  },
  seeSchedulesButton: {
    backgroundColor: colors.shadow,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 130,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TourDetails;
