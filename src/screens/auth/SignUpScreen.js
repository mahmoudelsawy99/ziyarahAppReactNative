import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const darkGreen = '#006A42';
const white = '#FFFFFF';
const gray = '#808080';

const Background = ({ children }) => {
  return (
    <ImageBackground source={require("../../assets/imgs/madenha.jpeg")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const CustomButton = ({ bgColor = darkGreen, textColor = white, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: bgColor }]}>
    <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

const Field = ({ placeholder, keyboardType = 'default', secureTextEntry = false, ...props }) => (
  <TextInput
    {...props}
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={darkGreen}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
  />
);

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName || !userEmail || !userPhone || !userPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (userPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    var dataToSend = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword,
      password_confirmation: confirmPassword,
    };

    fetch('https://ziyarh.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);

        if (responseJson.status === 'success') {
          setIsRegistrationSuccess(true);
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setErrortext('An error occurred. Please try again later.');
      });
  };

  if (isRegistrationSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successText}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.successText}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Create an Account</Text>
          <Field
            placeholder="Name"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <Field
            placeholder="Email"
            keyboardType="email-address"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
          <Field
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={userPhone}
            onChangeText={(text) => setUserPhone(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
          />
          <Field
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <CustomButton
            bgColor={darkGreen}
            label="Sign Up"
            onPress={handleSubmitButton}
          />
          {loading ? (
            <ActivityIndicator color={darkGreen} size="large" />
          ) : null}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  subtitle: {
    fontSize: 20,
    color: darkGreen,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    color: darkGreen,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 20,
  },
});

export default SignUp;
