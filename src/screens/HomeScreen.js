import React, { useEffect ,useState} from 'react';
import { View, Text, TextInput, StyleSheet,StatusBar, ScrollView, TouchableOpacity,SafeAreaView,
  Image,FlatList,ImageBackground,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get("screen");


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
  
 
 
const HomeScreen = ({navigation}) => {

  const handleMakkahPress = () => {
    axios
    .get("https://ziyarh.com/api/destinations/search?cities[]=1")
    .then(response => {
      const data = response.data.data.map(item => ({
        ...item,
        location: 'Makkah' // Add the city number to each item
      }));
      console.log(data);
      navigation.navigate("SearchResults", { data });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      // Handle error (show a message, retry, etc.)
    });
  };

  const handleMadinahPress = () => {
    axios
      .get("https://ziyarh.com/api/destinations/search?cities[]=2")
      .then(response => {
        const data = response.data.data.map(item => ({
          ...item,
          location: 'Madinah' // Add the city number to each item
        }));
        console.log(data);
        navigation.navigate("SearchResults", { data });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // Handle error (show a message, retry, etc.)
      });
  };
  
  

    const categoryIcons = [
        <TouchableOpacity onPress={() => navigation.navigate('filter')}>

            <Icon name="edit-location" size={40} color={COLORS.primary} />
            <Text style={[styles.textDest , {left:4}]}>Filter</Text>
        </TouchableOpacity>,

        <TouchableOpacity onPress={handleMadinahPress}>
            <Image
                  source={require("../assets/imgs/mosque.png")}
                  style={styles.headerImage}
                />
                <Text style={[styles.textDest , {left:-9}]}>Madinah</Text>
        </TouchableOpacity>,
           <TouchableOpacity onPress={handleMakkahPress}>
            <Image
            source={require("../assets/imgs/kaaba.png")}
            style={styles.headerImage}
          />
          <Text style={[styles.textDest , {left:-7}]}>Makkah</Text>
        </TouchableOpacity>,
      ];
      const ListCategories = () => {
        return (
          <View style={styles.categoryContainer}>
            {categoryIcons.map((icon, index) => (
              <View key={index} style={styles.iconContainer}>
                {icon}
              </View>
            ))}
          </View>
        );
      };
      const PlacesCard = ({place}) => {
          const image = {uri:place.thumbnail};
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Details', place)}>
            <ImageBackground style={styles.cardImage} source={image}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {place.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                {/* <View style={{flexDirection: 'row'}}>
                  <Icon name="place" size={20} color={COLORS.white} />
                  <Text style={{marginLeft: 5, color: COLORS.white}}>
                    {place.location}
                  </Text>
                </View> */}
                {/* <View style={{flexDirection: 'row'}}>
                  <Icon name="star" size={20} color={COLORS.white} />
                  <Text style={{marginLeft: 5, color: COLORS.white}}>5.0</Text>
                </View> */}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      };
  const [destinations, setDestinations] = useState([]);


  useEffect(() => {
    // Define a function to fetch data using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ziyarh.com/api/destinations');
        setDestinations(response.data.data); // Update state with fetched data
        console.log('====================================');
        console.log('destination:', destinations);
        console.log('====================================');
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
const destination = destinations.slice(0 , 11);

  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });


  if (!loaded) {
    return null;
  }
  const nameDatabase = {
    name: "Osama",
}

  return (
    <ScrollView style={styles.container}>

   <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <Icon name="" size={28} color={COLORS.white} />
        {/* <Text style={styles.textTravel}>Let’s Travel Now</Text> */}
        <Icon name="" size={20} color={COLORS.white}/>
      </View>
              <WelcomeText name={`${nameDatabase.name}`} onPress={() => props.navigation.navigate('MenuScreen')} />
 
      <InputBox  navigation={navigation} style={{marginBottom:-50}} />
      <Offer onPress={() => props.navigation.navigate('TreasureScreen')} />
<View>
<Text style={styles.headerTitle}>Choose Your Destination </Text>
        <ListCategories />
</View>

      <SafeAreaView style={styles.container}>
        <View style={{display:'flex', width:'100%', flexDirection:'row-reverse',justifyContent:'space-between', padding:20}}>
      <Text style={styles.sectionTitle}>Places</Text>
      <Text style={{
    textDecorationLine:'underline',  
    fontWeight: 'bold',
    // fontSize: 20,
    color:colors.green}} onPress={() => navigation.navigate('Dist')}>See More</Text>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={destination}
            renderItem={({ item }) => <PlacesCard place={item} />}
          />
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
        </View>
      </ScrollView>
    </SafeAreaView>


      <View style={styles.wrapper}>
        <Text style={styles.textCategory}></Text>
        <TouchableOpacity>
          <Text style={styles.textView}></Text>
        </TouchableOpacity>
      </View>
   <View style={styles.wrapper}>
        <Text style={styles.textCategory}></Text>
        <TouchableOpacity>
          <Text style={styles.textView}></Text>
        </TouchableOpacity>
      </View>
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
//   header: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  headerImage: {
    width: 40,
    height: 40,
    // borderRadius: 50,
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
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    // fontSize: sizes.buttonTextSize,
    color:colors.green,
    marginBottom:-60,
    padding:20
    
  },
  textTravel: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: sizes.buttonTextSize,
    color:COLORS.white
  },
  textDest:{
    position:'absolute',
    top:60,
    fontWeight:'700'
  },
  sectionTitle: {
    // marginHorizontal: 20,
    // marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color:colors.green
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
});


  export default HomeScreen;
