import  React , {useState , useEffect} from 'react';
import { View , StyleSheet , Dimensions } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text , Avatar, Card, IconButton} from 'react-native-paper';
import colors from '../assets/Colors';
import sizes from '../assets/Sizes';
const { width, height } = Dimensions.get('window');

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
const MyComponent = () => {
    // const [loaded] = useFonts({
    //     Montserrat: require('../assets/fonts/Montserrat.ttf'),
    //   });
    
    const [visible, setVisible] = React.useState(false);
  
    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);
      const [destinationData, setDestinationData] = useState(null);
    
      useEffect(() => {
        // Fetch data for the specific destination using Axios
        axios
          .get(`https://ziyarh.com/api/destination/1`)
          .then((response) => {
            const data = response.data.data;
            setDestinationData(data);
            console.log('fetching data:', destinationData);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    
      if (!destinationData) {
        return null;
      }
    
  const Header = () => (
    <View>
      <Text category='h6'>
        Maldives
      </Text>
      <Text category='s1'>
        By Wikipedia
      </Text>
    </View>
  );
  return (
    <PaperProvider>
      <View>
        <Button onPress={showDialog} style={styles.bookNowBtn}> <Text  style={{color: COLORS.white, fontSize: 16, fontWeight: 'bold'}}>Book Now</Text></Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{position:'absolute' , top:-450 , right:-20 , width:300}}>
            <Dialog.Title>Tours</Dialog.Title>
            <Dialog.Content>
            {/* {destinationData.three_tours.map((tour, index) => (
          <React.Fragment key={tour.id}>
            <Card
              title={tour.title}
              description={`Starts ${tour.start} Ends ${tour.end}\nDuration: ${tour.duration} Hours`}
              image={{ uri: tour.image }} // Use tour.image instead of destinationData.thumbnail
              location={tour.location}
              onPress={() => {
                navigation.navigate('TourDetails', { id: tour.id });
              }}
            />
            {index < destinationData.three_tours.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))} */}
                {/* <Header/> */}
              <Text variant="bodyMedium">This is simple dialog</Text>
              <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="white-balance-sunny" />}
  />
             <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="weather-night" />}
    
  />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default MyComponent;
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f8f8f8',
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: colors.grey,
      marginVertical: 10,
    },
    imageContainer: {
      width: '100%',
      height: 250,
      borderRadius: 30,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
    },
    textHeader: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      fontSize: sizes.headerTourSize,
    },
    contentContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    wrapperRating: {
      flexDirection: 'column',
    },
    textRating: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      fontSize: sizes.descriptionSize,
    },
    wrapperStars: {
      flexDirection: 'row',
    },
    priceContainer: {},
    textPrice: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      fontSize: sizes.descriptionSize,
    },
    price: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      color: colors.secondary,
    },
    descriptionContainer: {
      marginBottom: 24,
    },
    textDescription: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      fontSize: sizes.descriptionSize,
      marginBottom: 8,
    },
    paragraph: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      fontSize: sizes.paragraphSizeMedium,
      color: colors.secondary,
      height: 100,
    },
    card: {
      marginVertical: 10,
      backgroundColor: "#fff",
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: width / 1.1,
      marginHorizontal: 20,
      borderRadius: 20,
      height: height / 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1.5,
    },
  
    cardTitle: {
      fontWeight: "bold",
      fontSize: 16,
      marginLeft: 10,
    },
  
    cardLocation: {
      fontSize: 11.5,
      color: "#777",
      marginLeft: 10,
    },
  
    cardDescription: {
      fontSize: 12,
      marginVertical: 8,
      marginLeft: 10,
    },
  
    cardImage: {
      flex: 0.3,
    },
  
    seeDetailsButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginTop: 8,
    },
    seeDetailsButtonText: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
      fontSize: 14,
      color: '#ffffff',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: 250,
      borderRadius: 30,
      overflow: 'hidden',
    },
    contentContainer: {
      marginVertical: 16,
      marginHorizontal: 16,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    starContainer: {
      flexDirection: 'row',
      marginLeft: 8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    descriptionContainer: {
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    toursContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
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
  });