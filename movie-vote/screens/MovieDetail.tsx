import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Dimensions
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";

import RoundedButton from "../components/RoundedButton";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const { width } = Dimensions.get("window");

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

const ADD_VOTE_MUTATION = gql`
  mutation AddVote($movieId: ID!) {
    addVote(movieId: $movieId)
  }
`;

const REMOVE_VOTE_MUTATION = gql`
  mutation RemoveVote($movieId: ID!) {
    removeVote(movieId: $movieId)
  }
`;

const MovieDetail = (props: any) => {
  const { data, refetch } = useQuery(PROFILE_QUERY);
  const [addVote] = useMutation(ADD_VOTE_MUTATION);
  const [removeVote] = useMutation(REMOVE_VOTE_MUTATION);

  const isVoted =
    data &&
    data.currentUser &&
    data.currentUser.votes &&
    data.currentUser.votes.find(
      (vote: any) => vote.movie.id === props.route.params.movie.id
    );

  const primaryColor = isVoted ? "rgba(95, 218, 214, 1)" : "#000";
  const secondaryColor = isVoted ? "#000" : "rgba(95, 218, 214, 1)";
  const saveString = isVoted ? "Remove Vote" : "Add Vote";

  let isToken = false;
  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("token");
      if (userToken) {
        isToken = true;
        props.navigation.navigate("Home");
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{ uri: props.route.params.movie.imageUrl }}
        />
        <Text numberOfLines={2} style={[styles.text, { textAlign: "center" }]}>
          {props.route.params.movie.title}
        </Text>

        <View style={styles.statRow}>
          <Text style={styles.stat}>Category</Text>
          <Text style={styles.stat}>
            {props.route.params.movie.category.title}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.stat}>
            {props.route.params.movie.description}
          </Text>
        </View>
        <RoundedButton
          text={saveString}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          onPress={() => {
            if (isVoted) {
              removeVote({
                variables: { movieId: props.route.params.movie.id }
              })
                .then(() => refetch())
                .catch((error) => console.log(error));
            } else {
              addVote({
                variables: { movieId: props.route.params.movie.id }
              })
                .then(() => refetch())
                .catch((error) => console.log(error));
            }
          }}
          icon={
            <Ionicons
              name="md-checkmark-sharp"
              size={20}
              color={primaryColor}
              style={styles.saveIcon}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#adacac"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 32,
    color: "#f1efef",
    paddingBottom: 15
  },
  image: {
    width,
    height: width,
    resizeMode: "center"
  },
  statRow: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stat: {
    color: "#202020",
    fontSize: 16,
    fontWeight: "500"
  },
  saveIcon: {
    position: "relative",
    left: 50,
    zIndex: 8
  },
  contentContainer: {
    paddingTop: 10
  }
});

export default MovieDetail;
