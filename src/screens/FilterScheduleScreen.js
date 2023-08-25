import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Slider } from 'react-native';
import { CheckBox, Autocomplete } from 'react-native-elements'; // You'll need to import the corresponding components or use alternative libraries
// import TourCard from '../components/TourCard';
// import NoData from '../components/NoData';

const FilterSchedule = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [tourTimes, setTourTimes] = useState([]);
  const [tours, setTours] = useState([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [fields, setFields] = useState({
    cities: [],
    destination: null,
    tourTime: null,
    vehicles: [],
    price: [5, 50],
  });

  useEffect(() => {
    getCities();
    getTourTimes();
    getVehicles();
  }, []);

  const getCities = () => {
    // Implement the logic to fetch cities data
    setCitiesLoading(true);
    // Update 'cities' and 'citiesLoading' state based on the fetched data
  };

  const getTourTimes = () => {
    // Implement the logic to fetch tour times data
    // Update 'tourTimes' state based on the fetched data
  };

  const getVehicles = () => {
    // Implement the logic to fetch vehicles data
    // Update 'vehicles' state based on the fetched data
  };

  const getDestinations = () => {
    // Implement the logic to fetch destinations based on selected cities
    // Update 'destinations' state based on the fetched data
  };

  const getTours = () => {
    // Implement the logic to fetch tours based on the selected filters
    setLoadingTours(true);
    // Update 'tours' and 'loadingTours' state based on the fetched data
  };

  const loadDestination = () => {
    const data = {
      cities: fields.cities,
    };
    getDestinations(data);
  };

  const filter = () => {
    getTours();
    setShowFilter(false);
  };

  const reset = () => {
    setFields({
      cities: [],
      destination: null,
      tourTime: null,
      vehicles: [],
      price: [5, 50],
    });
  };

  return (
    <View>
      {showFilter ? (
        <View>
          <View>
            <Text>Filter</Text>
            <TouchableOpacity onPress={reset}>
              <Text>Clear</Text>
            </TouchableOpacity>
          </View>
          <Text>City</Text>
          <ScrollView>
            {cities.map((city) => (
              <CheckBox
                key={city.id}
                title={city.name}
                checked={fields.cities.includes(city.id)}
                onPress={loadDestination}
              />
            ))}
          </ScrollView>
          <Text>Tour Time</Text>
          <ScrollView>
            {tourTimes.map((tourTime) => (
              <TouchableOpacity key={tourTime.id}>
                {/* Implement the UI for tourTime */}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text>Destination</Text>
          <Autocomplete
            label="Destination"
            data={destinations}
            value={fields.destination}
            onChangeText={(text) => setFields({ ...fields, destination: text })}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text>Transportation</Text>
          <ScrollView>
            {vehicles.map((vehicle) => (
              <CheckBox
                key={vehicle.id}
                title={vehicle.name}
                checked={fields.vehicles.includes(vehicle.id)}
                onPress={loadDestination}
              />
            ))}
          </ScrollView>
          <Text>Price</Text>
          <Text>From: {fields.price[0]} S.R</Text>
          <Text>To: {fields.price[1]} S.R</Text>
          <Slider
            minimumValue={0}
            maximumValue={200}
            step={5}
            value={fields.price}
            onValueChange={(value) => setFields({ ...fields, price: value })}
          />
          <TouchableOpacity onPress={filter}>
            <Text>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setShowFilter(true)}>
            <Text>Filter</Text>
          </TouchableOpacity>
          {tours.length > 0 ? (
            <ScrollView>
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </ScrollView>
          ) : (
            <NoData message="No Tours" />
          )}
        </View>
      )}
    </View>
  );
};

export default FilterSchedule;
