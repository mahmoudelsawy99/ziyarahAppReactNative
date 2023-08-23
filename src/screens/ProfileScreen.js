import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(false);
  const [location, setLocation] = useState(false);
  const [editedField, setEditedField] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const openEditModal = (field, value) => {
    setEditedField(field);
    setEditedValue(value);
    setEditModalVisible(true);
  };

  const saveEditedField = () => {
    // Perform save operation for the edited field
    setEditModalVisible(false);
  };

  const renderEditableField = (iconName, label, value) => (
    <View style={styles.infoRow}>
      <View style={styles.infoRowLeft}>
        <FeatherIcon name={iconName} size={20} color="#007bff" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <TouchableOpacity onPress={() => openEditModal(label, value)}>
        <FeatherIcon name="edit-3" size={20} color="#0c0c0c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            <Image
              source={require('../assets/imgs/profile_picture.jpg')}
              style={styles.profilePicture}
            />
            <AntDesignIcon
              name="camerao"
              size={20}
              color="#fff"
              style={styles.cameraIcon}
            />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileLocation}>New York, USA</Text>
        </View>
        <View style={styles.infoContainer}>
          {renderEditableField('mail', 'Email', 'john.doe@example.com')}
          {renderEditableField('phone', 'Phone', '+123 456 789')}
          {renderEditableField('user', 'Name', 'John Doe')}
          {renderEditableField('globe', 'Country', 'United States')}
          {renderEditableField('map-pin', 'City', 'New York')}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Notifications</Text>
          <View style={styles.switchContainer}>
            <FeatherIcon name="bell" size={20} color="#0c0c0c" />
            <Text style={styles.switchLabel}>Enable Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Location</Text>
          <View style={styles.switchContainer}>
            <FeatherIcon name="map-pin" size={20} color="#0c0c0c" />
            <Text style={styles.switchLabel}>Enable Location</Text>
            <Switch value={location} onValueChange={setLocation} />
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Edit {editedField}</Text>
            <TextInput
              style={styles.modalInput}
              value={editedValue}
              onChangeText={(text) => setEditedValue(text)}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={saveEditedField}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007bff',
    borderRadius: 9999,
    padding: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#414d63',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    color: '#989898',
  },
  infoContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0c0c0c',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0c0c0c',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0c0c0c',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
