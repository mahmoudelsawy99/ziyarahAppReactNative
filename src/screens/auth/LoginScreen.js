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

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleLogin = () => {
    // Perform your login logic here
    alert("Logged In");
  };


  const handleSignupNavigation = () => {
    console.log("first")
    navigation.navigate("RegisterScreen");
  };

  const handleSubmitPress = () => {
    setLoading(true);
    setErrortext('');

    if (!userEmail) {
      setLoading(false);
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      setLoading(false);
      alert('Please fill Password');
      return;
    }

    let dataToSend = {
      email: userEmail,
      password: userPassword,
      client_id: 2,
      client_secret: 'K6Vrs6deHbwsN1Bvo2MDU00aLWIP2E4Il8Y0fCIc',
      grant_type: 'password',
      scope: '*',
    };

    fetch('https://ziyarh.com/api/login', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        setLoading(false);
        console.log(responseJson); // Log the response to the console

        if (responseJson.status === true) {
          try {
            await AsyncStorage.setItem('accessToken', responseJson.access_token);
            navigation.navigate('TabNavigator'); // Navigate to the Home screen after successful login
          } catch (error) {
            console.error('Error saving token:', error);
            setErrortext('An error occurred. Please try again later.');
          }
        } else {
          setErrortext('Please check your email id or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setErrortext('An error occurred. Please try again later.');
      });
  };  

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Welcome Back</Text>
          <Text style={styles.description}>Login to your account</Text>
          <Field
            placeholder="Email"
            keyboardType="email-address"
            value={userEmail}
            onChangeText={(text) => setUserEmail(text)}
          />
          <Field
            placeholder="Password"
            secureTextEntry
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <CustomButton
            bgColor={darkGreen}
            label="Login"
            onPress={handleSubmitPress}
          />
          {loading ? (
            <ActivityIndicator color={darkGreen} size="large" />
          ) : null}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen"); }}>
  <Text style={styles.signupLink}>Signup</Text>
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
  description: {
    color: gray,
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    color: darkGreen,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 10,
    paddingVertical: 12,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
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
  },
});

export default Login;
