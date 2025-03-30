// favoritesStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favorites";

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading favorites", e);
    return [];
  }
};

export const addFavorite = async (movie: MovieDetails) => {
  try {
    const minimalMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
      release_date: movie.release_date,
    };
    const favorites = await getFavorites();
    favorites.push(minimalMovie);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Error adding favorite", e);
  }
};

export const removeFavorite = async (movieId: number) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter(
      (item: MovieDetails) => item.id !== movieId
    );
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  } catch (e) {
    console.error("Error removing favorite", e);
  }
};

export const isFavorite = async (movieId: number) => {
  try {
    const favorites = await getFavorites();
    return favorites.some((item: MovieDetails) => item.id === movieId);
  } catch (e) {
    console.error("Error checking favorite", e);
    return false;
  }
};
