import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  ListRenderItem
} from "react-native";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import MovieSplash from "../components/MovieSplash";
import Tag from "../components/Tag";

interface Movie {
  title: string;
  description: string;
  imageUrl: string;
  category: {
    title: string;
  };
}

const GET_MOVIES = gql`
  query Movies($categoryId: ID, $offset: Int) {
    movies(categoryId: $categoryId, limit: 30, offset: $offset) {
      id
      title
      description
      category {
        id
        title
      }
      imageUrl
    }
  }
`;

const CATEGORY_QUERY = gql`
  query Categories {
    categories {
      id
      title
    }
  }
`;

const HomeScreen = (props: any) => {
  const [categoryId, setCategoryId] = useState(0);
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_MOVIES, {
    variables: categoryId ? { categoryId } : {}
  });
  const { data: genres } = useQuery(CATEGORY_QUERY);
  const { navigation } = props;

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 10
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <ActivityIndicator size="large" color="#5fdad6" />
          <Text>It might take a while. Please wait.</Text>
        </View>
      </View>
    );
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <View style={styles.container}>
      {genres && (
        <FlatList
          data={genres.categories}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          extraData={categoryId}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const selected = categoryId === item.id;
            return (
              <Tag
                key={index}
                selected={selected}
                title={item.title}
                onPress={() => {
                  if (selected) {
                    setCategoryId(0);
                    refetch();
                  } else {
                    setCategoryId(item.id);
                    refetch();
                  }
                }}
              />
            );
          }}
        />
      )}
      <FlatList
        data={data.movies}
        keyExtractor={(item: Movie, index: number) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => {
          return (
            <MovieSplash
              movie={item}
              onPress={() =>
                props.navigation.navigate("Detail", { movie: item })
              }
            />
          );
        }}
        onEndReached={() => {
          fetchMore({
            variables: { offset: data.movies.length },
            updateQuery: (prev: any, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                movies: [...prev.movies, ...fetchMoreResult.movies]
              });
            }
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#959595"
  },
  scrollContent: {
    paddingTop: 10
  }
});

export default HomeScreen;
