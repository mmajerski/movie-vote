import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { gql, useMutation } from "@apollo/client";

import RoundedButton from "../components/RoundedButton";

const { width } = Dimensions.get("window");

const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation SignIn($username: String, $email: String, $password: String!) {
    signIn(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const TabTwoScreen = (props: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test12345");
  const [login, setLogin] = useState(true);

  const [signIn] = useMutation(SIGN_IN_MUTATION, {
    async onCompleted({ signIn }) {
      const { token } = signIn;
      try {
        await AsyncStorage.setItem("token", token);
        props.navigation.replace("Profile");
      } catch (error) {
        console.log(error.message);
      }
    }
  });

  const [signUp] = useMutation(SIGN_UP_MUTATION, {
    async onCompleted({ signUp }) {
      const { token } = signUp;
      try {
        await AsyncStorage.setItem("token", token);
        props.navigation.replace("Profile");
      } catch (error) {
        console.log(error.message);
      }
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {login ? null : (
          <View>
            <Text style={{ color: "#000" }}>Username</Text>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
            ></TextInput>
          </View>
        )}
        <View>
          <Text style={{ color: "#000" }}>
            {login ? "Email or username" : "Email"}
          </Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={login ? "Email or username" : "Email"}
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
          ></TextInput>
        </View>
        <View>
          <Text style={{ color: "#000" }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.input}
            secureTextEntry
          ></TextInput>
        </View>
      </View>
      <View>
        <RoundedButton
          text={login ? "Sign in" : "Sign up"}
          textColor="#fff"
          backgroundColor="#000"
          onPress={() => {
            if (login) {
              const isEmail = email.includes("@");
              const res = isEmail
                ? signIn({ variables: { email, password } })
                : signIn({ variables: { username, password } });
            } else {
              signUp({ variables: { username, email, password } });
            }
          }}
        />
        <RoundedButton
          text={login ? "Click here to Sign up" : "Click here to Sign in"}
          textColor="#000"
          backgroundColor="#fff"
          onPress={() => setLogin(!login)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#959595"
  },
  saveIcon: {
    position: "relative",
    left: 20,
    zIndex: 8
  },
  inputContainer: {
    flex: 0.4,
    justifyContent: "center"
  },
  input: {
    width: width - 60,
    height: 40,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    color: "#dedede"
  }
});

export default TabTwoScreen;
