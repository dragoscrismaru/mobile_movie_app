import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getMostSearchedMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useFetch(getMostSearchedMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({ query: "" }));

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchTrending(), refetchMovies()]);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Define a header component to include logo and trending movies
  const ListHeader = () => (
    <View>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      {trendingMovies && (
        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3 mt-3">
            Popular movies
          </Text>
          <FlatList
            data={trendingMovies}
            horizontal={true}
            className="mb-4 mt-3"
            contentContainerClassName="gap-6"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 26 }}
            renderItem={({ item, index }) => (
              <TrendingCard movie={item} index={index} />
            )}
            keyExtractor={(item) => item.movie_id.toString()}
          />
        </View>
      )}
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </View>
  );

  if (moviesLoading || trendingLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (moviesError || trendingError) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Error: {moviesError?.message || trendingError?.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 8,
          paddingLeft: 8,
          marginBottom: 10,
        }}
        ListHeaderComponent={ListHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 5 }}
      />
    </View>
  );
}
