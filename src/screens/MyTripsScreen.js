import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRange";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const MAX_PRICE = 500;

const COLORS = [
  {
    color: "#D93F3E",
    label: "Red",
    itemCount: 4,
  },
  {
    color: "#FFFFFF",
    label: "White",
    itemCount: 2,
  },
  // ... other color 
];

const SLEEVES = [
  {
    id: "sortsleeve",
    label: "Sort Sleeve",
    itemCount: 20,
  },
  {
    id: "longsleeve",
    label: "Long Sleeve",
    itemCount: 100,
  },
  // ... other sleeve objects
];

const FilterView = () => {
  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{ flex: 1 }}>
      <BottomSheetScrollView style={{ flex: 1 }}>
        <View style={{ paddingVertical: 24, gap: 24 }}>
          {/* ... other UI components */}
        </View>
      </BottomSheetScrollView>
      {/* Button */}
      <View
        style={{
          padding: 24,
          paddingBottom: 24 + insets.bottom,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            height: 64,
            borderRadius: 64,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.background,
            }}
          >
            Apply filters
          </Text>
          <View
            style={{
              backgroundColor: theme.colors.card,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 12,
              right: 12,
              bottom: 12,
            }}
          >
            <Icons name="arrow-forward" size={24} color={theme.colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterView;

const Chip = ({ isSelected, label, itemCount, left }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: isSelected
          ? theme.colors.text
          : theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {!!left && <View style={{ marginRight: 8 }}>{left}</View>}
      <Text
        style={{
          fontSize: 14,
          color: isSelected ? theme.colors.background : theme.colors.text,
        }}
      >
        {label} [{itemCount}]
      </Text>
    </View>
  );
};
