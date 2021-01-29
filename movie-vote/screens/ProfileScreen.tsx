import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { gql, useQuery } from "@apollo/client";

import MovieSplash from "../components/MovieSplash";
import { Ionicons } from "@expo/vector-icons";
import RoundedButton from "../components/RoundedButton";

const PROFILE_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
      votes {
        id
        movie {
          id
          title
          imageUrl
          description
          category {
            id
            title
          }
        }
      }
    }
  }
`;

const ProfileScreen = (props: any) => {
  const { data, loading, error } = useQuery(PROFILE_QUERY, {
    fetchPolicy: "network-only"
  });

  if (!data || !data.currentUser) {
    return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject }} />;
  }

  const { currentUser } = data;
  const { username, email, votes } = currentUser;

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <RoundedButton
          text="Logout"
          textColor="#fff"
          backgroundColor="#000"
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            props.navigation.replace("TabTwoScreen");
          }}
        />
      </View>
      {votes && votes.length ? (
        <FlatList
          data={votes}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item: { movie }, index }) => (
            <MovieSplash
              movie={movie}
              onPress={() => {
                props.navigation.navigate("Detail", { movie });
              }}
            />
          )}
        />
      ) : (
        <Text style={{ alignSelf: "center" }}>
          Here will be displayed movies you voted on
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#959595"
  },
  saveIcon: {
    position: "relative",
    right: 20,
    zIndex: 8
  }
});

export default ProfileScreen;
