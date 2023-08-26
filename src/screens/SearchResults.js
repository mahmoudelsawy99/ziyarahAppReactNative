import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types"; // Import PropTypes for prop type checking
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const SearchResults = ({ route }) => {
  const { data } = route.params;

  // Check if data is an array before mapping over it
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            {hasData ? (
              data.map((item, index) => (
                <View key={index} style={styles.item}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.itemImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>
                      {item.name.length > 13
                        ? item.name.substring(0, 8) + "..."
                        : item.name}
                    </Text>
                    {item.location && (  
                      <View style={styles.locationContainer}>
                        <FontAwesome name="map-marker" size={16} color="#007A00" />
                        <Text style={styles.itemLocation}>{item.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Oops...No Data Found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

SearchResults.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.array.isRequired, // Specify that data is expected to be an array
    }).isRequired,
  }).isRequired,
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: windowWidth * 0.05,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  item: {
    width: windowWidth * 0.44,
    height: 220, // Increase the card height
    marginBottom: 16,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  itemImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  textContainer: {
    marginTop: 4,
  },
  itemTitle: {
    color: "#333",
    fontSize: windowWidth * 0.045,
    fontWeight: "bold",
    opacity: 0.85,  
  },
  locationContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",  
    opacity: 0.6,  
  },
  itemLocation: {
    color: "#007A00",
    fontSize: windowWidth * 0.035,
    marginRight: 4,
 
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  noDataContainer: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: windowWidth * 0.055,
    color: "#428288",
    fontWeight: "bold",
  },
};

export default SearchResults;
