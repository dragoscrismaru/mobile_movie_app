import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
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
  const [refreshing, setRefreshing] = useState(false); // Add refresh state
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
  // Add refresh handler
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

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"></Image>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className="text-lg text-white font-bold mt-5 mb-3">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3 mt-3">
                  Popular movies
                </Text>

                <FlatList
                  className="mb-4 mt-3"
                  contentContainerClassName="pr-6 gap-6"
                  data={trendingMovies}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-0" />}
                  renderItem={({ item, index }) => {
                    return <TrendingCard movie={item} index={index} />;
                  }}
                  keyExtractor={(item) => item.movie_id.toString()}
                ></FlatList>
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                scrollEnabled={false}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
