import React, { useState } from 'react';
import { StyleSheet, View, Text,TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/Colors';
import axios from 'axios';

const SearchInput = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.get(`https://ziyarh.com/api/destinations/search?query=${searchQuery}`);
      setSearchResults(response.data);
      setLoading(false);
  
      const data = response.data;
      navigation.navigate("SearchResults", { data: data.data }); // Access the array using data.data
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };
  
  
  

  return (
    <View style={styles.textBox}>
      <MaterialCommunityIcons
        name="magnify"
        size={40}
        style={styles.icon}
        color={colors.magnifyColor}
      />
      <TextInput
        style={styles.inputText}
        autoCapitalize="none"
        autoCorrect={true}
        placeholder="Search Destination"
        maxLength={15}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
        value={searchQuery}
      />
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
  },
  icon: {
    marginLeft: 15,
    marginRight: 5,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 35,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 45,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
});

export default SearchInput;
