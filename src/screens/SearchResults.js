import { View, Text } from 'react-native'
import React, { useEffect ,useState} from 'react';
import axios from 'axios';


const SearchResults = ({route}) => {
    const { id } = route.params;
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    const [filterDestinations, setfilterDestinations] = useState([]);


    useEffect(() => {
      // Define a function to fetch data using Axios
      const fetchData = async () => {
        try {
            const response = await axios.get('https://ziyarh.com/api/destinations/search', {
      params: {
        cities: [id]
      }
    });
          setfilterDestinations(response.data.data); // Update state with fetched data
          console.log('====================================');
        //   console.log('response' , response);
          console.log('destination:', filterDestinations);
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
    }, [filterDestinations]);
  return (
    <View>
      <Text>SearchResults</Text>
    </View>
  )
}

export default SearchResults