import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SettingsItem from './SettingsItem';

const SettingsScreen = () => {
  const settingsData = [
    { id: '1', title: 'Account Settings' },
    { id: '2', title: 'Privacy Preferences' },
    { id: '3', title: 'Notification Settings' },
    // Add more settings options
  ];

  const handleSettingsOption = (optionId) => {
    // Implement navigation or actions based on the selected settings option
    console.log('Selected Settings Option:', optionId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SettingsItem title={item.title} onPress={() => handleSettingsOption(item.id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SettingsScreen;
