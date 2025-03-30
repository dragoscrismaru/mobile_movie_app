import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { icons } from "@/constants/icons";
import { getFavorites } from "@/services/favoritesStorage"; // Ensure this path is correct
import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";

const Saved = () => {
  const [favorites, setFavorites] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      // Simulate a 2-second delay to mimic a fetch request.
      setTimeout(async () => {
        const favs = await getFavorites();
        setFavorites(favs);
        setRefreshing(false);
      }, 1000);
    };

    loadFavorites();
  }, [refreshing]);

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  const ListHeader = () => (
    <View>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <Text className="text-lg text-white font-bold mt-5 mb-3">
        Favorite Movies
      </Text>
    </View>
  );

  if (refreshing) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Image source={icons.save} className="w-10 h-10" tintColor={"#FFF"} />
          <Text className="text-gray-500 text-base mt-3">
            No favorites saved
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-primary">
          <Image source={images.bg} className="absolute w-full z-0" />
          <FlatList
            data={favorites}
            keyExtractor={(item: Movie) => item.id.toString()}
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
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 5 }}
          />
        </View>
      )}
    </>
  );
};

export default Saved;
