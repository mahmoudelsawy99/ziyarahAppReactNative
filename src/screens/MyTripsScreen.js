import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const Discover = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);

  const staticData = {
    item1: {
      imageSrc:
        "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
      title: "Example Title 1",
      location: "Example Location 1",
    },
    item2: {
      imageSrc:
        "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
      title: "Example Title 2",
      location: "Example Location 2",
    },
    // Add more items as needed
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulating data fetching
    setTimeout(() => {
      setMainData(Object.values(staticData));
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0B646B" />
              </View>
            ) : mainData.length > 0 ? (
              mainData.map((data, i) => (
                <View key={i} style={styles.item}>
                  <Image
                    source={{ uri: data.imageSrc }}
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemTitle}>{data.title}</Text>
                  <Text style={styles.itemLocation}>{data.location}</Text>
                </View>
              ))
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Opps...No Data Found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    marginBottom: 16,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  itemImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  itemTitle: {
    color: "#333",
    fontSize: windowWidth * 0.045,
    fontWeight: "bold",
    marginTop: 4,
  },
  itemLocation: {
    color: "#999",
    fontSize: windowWidth * 0.035,
    marginTop: 2,
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

export default Discover;
