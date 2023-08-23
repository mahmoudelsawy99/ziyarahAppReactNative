import React, { useEffect ,useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,SafeAreaView,
  Image,
  Dimensions, } from 'react-native';
import WelcomeText from '../components/WelcomeText';
import InputBox from '../components/InputBox';
import Offer from '../components/Offer';
import Card from '../components/Card';
import cardInfoDatabase from '../components/cardInfoDatabase';
 import { useFonts } from 'expo-font';
import sizes from '../assets/Sizes';
import colors from '../assets/Colors';
import ImageButton from "../components/ImageButton";
import { connect } from 'react-redux';
import axios from 'axios';

const { width, height } = Dimensions.get("screen");


const HomeScreen = (props) => {


  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    // Define a function to fetch data using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ziyarh.com/api/destinations');
        setDestinations(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount
  useEffect(() => {
    // console.log('Destinations:', destinations);
  }, [destinations]);


  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });



  if (!loaded) {
    return null;
  }
  const nameDatabase = {
    name: "Tomáš",
}

  return (
    <ScrollView style={styles.container}>

      <WelcomeText name={`${nameDatabase.name}`} onPress={() => props.navigation.navigate('MenuScreen')} />
      <InputBox />
      <Offer onPress={() => props.navigation.navigate('TreasureScreen')} />



      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* <View style={styles.header}>
          <View style={{ flex: 0.6, paddingTop: 20 }}>
            <Text style={styles.headerText}>Find Your Next trip!</Text>
          </View>
          <View style={{ flex: 0.35, paddingTop: 20, alignItems: "flex-end" }}>
            <Image
              source={require("../assets/imgs/img.jpg")}
              style={styles.headerImage}
            />
          </View>
        </View> */}
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <View style={styles.imageView}>
              <Image
                source={require("../assets/imgs/makka1.jpg")}
                style={styles.image}
              />
              <ImageButton
                onPress={() =>
                  toCategory(
                    require("../assets/imgs/makka1.jpg"),
                    "Makkah",
                    "Stunning Places"
                  )
                }
                title="Makkah"
                description="Stunning Places"
              />
            </View>
            <View style={styles.imageView}>
              <Image
                source={require("../assets/imgs/madenha.jpeg")}
                style={styles.image}
              />
              <ImageButton
                onPress={() =>
                  toCategory(
                    require("../assets/imgs/madenha.jpeg"),
                    "Family",
                    "Love Everywhere"
                  )
                }
                title="Madinah"
                description="Love Everywhere"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

      <View style={styles.wrapper}>
        <Text style={styles.textCategory}>Popular Tours</Text>
        <TouchableOpacity>
          <Text style={styles.textView}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Card header={`${cardInfoDatabase.header[0]}`} result={`${cardInfoDatabase.result[0]}`} reviews={`${cardInfoDatabase.reviews[0]}`} image={require('../assets/imgs/tent.jpg')} onPress={() => props.navigation.navigate('TourScreenOne')} />
        <Card header={`${cardInfoDatabase.header[1]}`} result={`${cardInfoDatabase.result[1]}`} reviews={`${cardInfoDatabase.reviews[1]}`} image={require('../assets/imgs/caravan.jpg')} onPress={() => props.navigation.navigate('TourScreenTwo')} />
        <Card header={`${cardInfoDatabase.header[2]}`} result={`${cardInfoDatabase.result[2]}`} reviews={`${cardInfoDatabase.reviews[2]}`} image={require('../assets/imgs/cannoing.jpg')} onPress={() => props.navigation.navigate('TourScreenThree')} />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textView: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.menuText,
    color: colors.secondary,
    marginRight: 25,
  },
  textCategory: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: sizes.buttonTextSize,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 35,
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  contentContainer: {
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  imageView: {
    width: width / 2.4,
    height: height / 3.5,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});


  export default HomeScreen;
