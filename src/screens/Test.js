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
              source={require("../assets/imgs/1.jpg")}
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
                onPress={() => {}
                  // toCategory(
                  //   require("../assets/imgs/madenha.jpeg"),
                  //   "Family",
                  //   "Love Everywhere"
                  // )
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
        <Card header={`${cardInfoDatabase.header[0]}`} result={`${cardInfoDatabase.result[0]}`} 
        reviews={`${cardInfoDatabase.reviews[0]}`}
         image={require('../assets/imgs/tent.jpg')} onPress={() => props.navigation.navigate('TourScreenOne')} />
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




// import React , {useState} from 'react';
// import { View, StyleSheet , SafeAreaView , TouchableOpacity , Text , FlatList } from 'react-native';



// const ListWithCards = () => {
//   const listTab = [
//     {
//       status: 'Home'    
//     },
//     {
//       status: 'About'    
//     },
//     {
//       status: 'Contact'    
//     },
//   ]
  
//   // Linking content
//   const data = [
//     {
//       name: "Home content",
//       text: "This is my homepage. Here I welcome you to my website and try me best to make a good impression. I tell you about the services I provide and encourage you to venture into my site.",
//       status: "Home"
//     },
//     {
//        name: "About content",
//       text: "Here I go into details about myself and my business, including the services we provide, how we started and our overall ethos.",
//       status: "About"
//     },
//     {
//        name: "Contact content",
//       text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
//       status: "Contact"
//     }
//   ]
 
//   const [status, setStatus] = useState('Home')
//     const [dataList, setDataList] = useState([...data.filter(e => e.status === 'Home')])
//     const setStatusFilter = status => {
//       if(status !== 'Home') {
//         setDataList([...data.filter(e => e.status === status)])
//       }else {
//         setDataList([...data.filter(e => e.status === 'Home')])
//       }

//       setStatus(status)
//     }
//     const renderItem = ({item, index}) => {
//       return (
//         <View key={index} style={styles.itemContainer}>                    
//           <Text style = {styles.itemName}>{item.name}</Text>                     
//           <Text>{item.text}</Text>
//         </View>       
//       )
//  }
//  return (
//    <SafeAreaView style={styles.container}>
//      <FlatList
//        data={dataList}
//        keyExtractor={(e,i) => i.toString()}
//        renderItem={renderItem}
//      />    
//         <View style={styles.listTab}>
//           {
//             listTab.map((e) => {
//               return (
//                 <TouchableOpacity 
//                   style={[styles.btnTab, status === e.status && styles.btnTabActive]}
//                   onPress={() => setStatusFilter(e.status)}
//                 >
//                   <Text style={[styles.textTab , status === e.status && styles.textTabActive]}>{e.status}</Text>
//                 </TouchableOpacity>
//               )
//             })
//           }          
//         </View>    

//       </SafeAreaView>
//     );

// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,        
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     justifyContent: 'center'  
//   },
//   listTab: {
//     backgroundColor: '#fff',    
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     marginTop: 20,    
//     marginLeft: 5,    
//     height: 100
//   },
//   btnTab: {
//     width: 50,
//     flexDirection: 'row',
//     marginBottom: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     justifyContent: 'center'
//   },
//    textTab: {
//     fontSize: 16    
//   },
//   btnTabActive: {
//     backgroundColor: 'purple',
//     borderRadius: 5
//   },
//   textTabActive: {
//     color: '#fff'
//   },
//   itemContainer: {    
//     justifyContent: 'flex-end',
//     paddingVertical: 15,
//     marginLeft: 30,
//     marginTop: 10
//   },
//   itemName: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     marginBottom: 5
//   },
// });
// export default ListWithCards;
{/* <StatusBar style={'light'} /> */}

// import React from 'react';
// import { StyleSheet, View, ViewProps } from 'react-native';
// import { Button, Card, Layout, Text } from '@ui-kitten/components';


// export default function Test() {
    
// const Header = () => (
//     <View >
//       <Text category='h6'>
//         Maldives
//       </Text>
//       <Text category='s1'>
//         By Wikipedia
//       </Text>
//     </View>
//   );
  
//   const Footer = () => (
//     <View
      
//       // eslint-disable-next-line react/prop-types
//       style={[ styles.footerContainer]}
//     >
//       <Button
//         style={styles.footerControl}
//         size='small'
//         status='basic'
//       >
//         CANCEL
//       </Button>
//       <Button
//         style={styles.footerControl}
//         size='small'
//       >
//         ACCEPT
//       </Button>
//     </View>
//   );
//   return (
//     <>
//     <Layout
//       style={styles.topContainer}
//       level='1'
//     >

//       <Card
//         style={styles.card}
//         header={Header}
//       >
//         <Text>
// With Header
//         </Text>
//       </Card>

//       {/* <Card
//         style={styles.card}
//         footer={Footer}
//       >
//         <Text>
// With Footer
//         </Text>
//       </Card> */}

//     </Layout>

//     {/* <Card
//       style={styles.card}
//       header={Header}
//       footer={Footer}
//     >
//       <Text>
//         The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the Arabian Sea
//         of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian
//         continent
//       </Text>
//     </Card> */}
//     </>
//   )
// }
// const Header = () => (
//   <View {...props}>
//     <Text category='h6'>
//       Maldives
//     </Text>
//     <Text category='s1'>
//       By Wikipedia
//     </Text>
//   </View>
// );

// // const Footer = () => (
// //   <View
// //     {...props}
// //     // eslint-disable-next-line react/prop-types
// //     style={[props.style, styles.footerContainer]}
// //   >
// //     <Button
// //       style={styles.footerControl}
// //       size='small'
// //       status='basic'
// //     >
// //       CANCEL
// //     </Button>
// //     <Button
// //       style={styles.footerControl}
// //       size='small'
// //     >
// //       ACCEPT
// //     </Button>
// //   </View>
// // );

// // export const CardAccessoriesShowcase = () => (
// //   <>
// //     <Layout
// //       style={styles.topContainer}
// //       level='1'
// //     >

// //       <Card
// //         style={styles.card}
// //         header={Header}
// //       >
// //         <Text>
// // With Header
// //         </Text>
// //       </Card>

// //       <Card
// //         style={styles.card}
// //         footer={Footer}
// //       >
// //         <Text>
// // With Footer
// //         </Text>
// //       </Card>

// //     </Layout>

// //     <Card
// //       style={styles.card}
// //       header={Header}
// //       footer={Footer}
// //     >
// //       <Text>
// //         The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the Arabian Sea
// //         of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian
// //         continent
// //       </Text>
// //     </Card>

// //   </>
// // );

// const styles = StyleSheet.create({
//   topContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   card: {
//     flex: 1,
//     margin: 2,
//   },
//   footerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   footerControl: {
//     marginHorizontal: 2,
//   },
// });
// import  React , {useState , useEffect} from 'react';
// import { View , StyleSheet , Dimensions , TouchableOpacity , Image} from 'react-native';
// // import { Button, Dialog, Portal, PaperProvider, Text , Avatar, Card, IconButton} from 'react-native-paper';
// import colors from '../assets/Colors';
// import sizes from '../assets/Sizes';
// const { width, height } = Dimensions.get('window');
// import Svg, { Line, Circle } from 'react-native-svg';
// import { Card, Layout, Text } from '@ui-kitten/components';
// import axios from 'axios';
// import Carousel from 'react-native-snap-carousel';

// const MyComponent = () => {
//     // const [loaded] = useFonts({
//     //     Montserrat: require('../assets/fonts/Montserrat.ttf'),
//     //   });
//     const [visible, setVisible] = React.useState(false);
//     const [activeSlide, setActiveSlide] = useState(0);
//     const showDialog = () => setVisible(true);
  
//     const hideDialog = () => setVisible(false);
//       const [destinationData, setDestinationData] = useState(null);
    
//       useEffect(() => {
//         // Fetch data for the specific destination using Axios
//         axios
//           .get(`https://ziyarh.com/api/destination/1`)
//           .then((response) => {
//             const data = response.data.data;
//             setDestinationData(data);
//             console.log('fetching data:', destinationData);
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);
    
//       if (!destinationData) {
//         return null;
//       }
    
//   const Header = () => (
//     <View>
//       <Text category='h6'>
//         Maldives
//       </Text>
//       <Text category='s1'>
//         By Wikipedia
//       </Text>
//     </View>
//   );
//   const data = ['1' , '2' , '3', '4']
//   _renderItem = ({item, index}) => {
//     return (
//         <View style={{}}>
//             <Text style={{}}>eeeeee</Text>
//         </View>
//     );
    
// }
// const renderItem = ({ item, index }) => {
//   return (
//     <TouchableOpacity
//       key={index}
//       style={{ height: 255 }}
//       onPress={() => navigation.navigate('NurseProfile')}
//     >
//       <View
//         style={{
//           backgroundColor: '#FEFEFE',
//           height: 200,
//           width: 190,
//           borderRadius: 15,
//           marginLeft: 20,
//           padding: 5,
//           paddingTop: -40,
//           shadowColor: '#041858',
//           elevation: 6,
//         }}
//       >
//         <View style={{ width: '100%' }}>
//           <Image
//             source={{ uri: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wwtv?ver=1428'}}
//             style={{
//               width: '100%',
//               borderRadius: 10,
//               height: 150,
//               resizeMode: 'contain',
//             }}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginTop: 10,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '100%',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               marginTop: -10,
//             }}
//           >
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               {/* <Icon name="star" color="#f5ca3c" size={20} /> */}
//               <Text style={{ marginLeft: 0 }}>4.0</Text>
//             </View>
//             <Text
//               style={{
//                 width: '100%',
//                 fontSize: 15,
//                 color: '#522289',
//                 textAlign: 'center',
//               }}
//             >
//               ahmed
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
//   return (
//   //   <PaperProvider>
//   //     <View>
//   //       <Button onPress={showDialog}  style={styles.bookNowBtn} >Show Dialog</Button >
//   //       <Portal>
//   //         <Dialog visible={visible} onDismiss={hideDialog}>
//   //           <Dialog.Title>Tours</Dialog.Title>
//   //           <Dialog.Content>
//   //           {destinationData.three_tours.map((tour, index) => (
//   //         <React.Fragment key={tour.id}>
//   //           <Card
//   //             title={tour.title}
//   //             description={`Starts ${tour.start} Ends ${tour.end}\nDuration: ${tour.duration} Hours`}
//   //             image={{ uri: tour.image }} // Use tour.image instead of destinationData.thumbnail
//   //             location={tour.location}
//   //             onPress={() => {
//   //               navigation.navigate('TourDetails', { id: tour.id });
//   //             }}
//   //           />
//   //           {index < destinationData.three_tours.length - 1 && <View style={styles.separator} />}
//   //         </React.Fragment>
//   //       ))}
//   //               {/* <Header/> */}
//   //             <Text variant="bodyMedium">This is simple dialog</Text>
//   //             <Card.Title
//   //   title="Card Title"
//   //   subtitle="Card Subtitle"
//   //   left={(props) => <Avatar.Icon {...props} icon="white-balance-sunny" />}
//   // />
//   //            <Card.Title
//   //   title="Card Title"
//   //   subtitle="Card Subtitle"
//   //   left={(props) => <Avatar.Icon {...props} icon="weather-night" />}
    
//   // />
//   //           </Dialog.Content>
//   //           <Dialog.Actions>
//   //             <Button onPress={hideDialog}>Done</Button>
//   //           </Dialog.Actions>
//   //         </Dialog>
//   //       </Portal>
//   //     </View>
//   //   </PaperProvider>
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//   {/* <Svg height="300" width="50">
//     <Line
//       x1="25"
//       y1="0"
//       x2="25"
//       y2="300"
//       stroke="grey"
//       strokeWidth="1"
//     />
//     <Circle cx="25" cy="50" r="10" fill="green" stroke="white" strokeWidth="3" />
//     <Circle cx="25" cy="150" r="10" fill="green" stroke="white" strokeWidth="3" />
//     <Circle cx="25" cy="250" r="10" fill="green" stroke="white" strokeWidth="3"/>
//   </Svg> */}
//   {/* <Layout
//     style={styles.container}
//     level='1'
//   >

//     <Card
//       style={styles.card}
//       status='primary'
//     >
//       <Text>
// Primary
//       </Text>
//     </Card>

//     <Card
//       style={styles.card}
//       status='success'
//     >
//       <Text>
// Success
//       </Text>
//     </Card>

//     <Card
//       style={styles.card}
//       status='info'
//     >
//       <Text>
// Info
//       </Text>
//     </Card>

//     <Card
//       style={styles.card}
//       status='warning'
//     >
//       <Text>
// Warning
//       </Text>
//     </Card>

//     <Card
//       style={styles.card}
//       status='danger'
//     >
//       <Text>
// Danger
//       </Text>
//     </Card>

//     <Card
//       style={styles.card}
//       status='basic'
//     >
//       <Text>
// Basic
//       </Text>
//     </Card>

//   </Layout> */}
//   {/* <Carousel
//               ref={(c) => { this._carousel = c; }}
//               data={data}
//               renderItem={_renderItem}
//               sliderWidth={400}
//               itemWidth={150}
//             /> */}
             

//  {/* start topRatedSection */}
//  <View
//             style={{
//               marginTop: 20,
//               justifyContent: 'center',
//               alignItems: 'center',
//               display: 'flex',
//               marginBottom: 30,
//             }}
//           >

//             <Carousel
//               data={data}
//               renderItem={renderItem}
//               sliderWidth={300}
//               itemWidth={200}
//               onSnapToItem={(index) => setActiveSlide(index)}
//               // layout='tinder'
//             // style={{elevation:3}} 
//             />

//             {/* <Pagination
//               dotsLength={topRated.length}
//               activeDotIndex={activeSlide}
//               containerStyle={{ marginTop: -45 }}
//               dotStyle={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 5,
//                 marginHorizontal: 3,
//                 backgroundColor: '#041585',
//               }}
//               inactiveDotOpacity={0.4}
//               inactiveDotScale={0.6}
//             /> */}
//           </View>
//           {/* end topRatedSection */}
// </View>
//   );
// };

// export default MyComponent;
