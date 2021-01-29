const axios = require("axios");

const prepareData = async () => {
  const { data: movies } = await axios.get(
    "https://raw.githubusercontent.com/meilisearch/MeiliSearch/master/datasets/movies/movies.json"
  );

  // Make the object right shape
  const preparedMovies = movies.map((movie) => {
    if (movie.genres && movie.genres.length > 0) {
      const category = setCategory(movie.genres[0]);
      if (category) {
        return {
          title: movie.title,
          description: movie.overview,
          imageUrl: movie.poster,
          categoryId: category,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
    }
  });

  // Remove undefined values from preparedMovies
  const filteredMovies = preparedMovies.filter((movie) => movie !== undefined);

  return filteredMovies;
};

const setCategory = (category) => {
  switch (category) {
    case "Action":
      return 1;
    case "Science Fiction":
      return 2;
    case "Thriller":
      return 3;
    case "Animation":
      return 4;
    case "Documentary":
      return 5;
    case "Adventure":
      return 6;
    case "Fantasy":
      return 7;
    case "Mystery":
      return 8;
    case "Horror":
      return 9;
    case "Comedy":
      return 10;
    case "Music":
      return 11;
    case "Family":
      return 12;
    case "Crime":
      return 13;
    case "Drama":
      return 14;
    case "Romance":
      return 15;
    case "Horror":
      return 16;
    case "War":
      return 17;
    default:
      return null;
  }
};

module.exports = prepareData;
