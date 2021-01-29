import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

const MovieSplash = (props: any) => {
  const {
    movie,
    movie: { title, category, imageUrl },
    onPress
  } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress()}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.genre}>{category.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 10,
    marginBottom: 20,
    marginRight: 5,
    height: height / 2,
    width: width / 2.12,
    backgroundColor: "#003366",
    borderRadius: 10
  },
  imageContainer: {
    flex: 1
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...StyleSheet.absoluteFillObject
  },
  title: {
    fontSize: 14,
    marginTop: 4,
    alignSelf: "center",
    color: "#fff"
  },
  genre: {
    color: "#e4e3e3",
    fontSize: 12,
    lineHeight: 14,
    alignSelf: "center"
  }
});

export default MovieSplash;
