import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import {
  addFavorite,
  isFavorite,
  removeFavorite,
} from "@/services/favoritesStorage";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

import { Heart } from "lucide-react-native";

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  const [favorite, setFavorite] = useState(false);

  // Check favorite status when movie is loaded
  useEffect(() => {
    const checkFavorite = async () => {
      if (movie) {
        const fav = await isFavorite(movie.id);
        setFavorite(fav);
      }
    };
    checkFavorite();
  }, [movie]);

  const toggleFavorite = async () => {
    if (movie) {
      if (favorite) {
        await removeFavorite(movie.id);
      } else {
        await addFavorite(movie);
      }
      setFavorite(!favorite);
    }
  };

  return (
    <View className="bg-primary flex-1">
      {/* <Text className="text-white">Movie Details</Text> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          ></Image>
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          {/* Header with Movie Title and Heart Icon */}
          <View className="flex-row items-center justify-between w-full">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Heart fill={favorite ? "red" : ""} color={"red"} />
              {/* {favorite ? <Heart fill={"red"} color={"red"} /> : <Heart />} */}
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-1 mt-2 ">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4"></Image>
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-2/3">
            <MovieInfo
              label="Bugdet"
              value={`$${movie?.budget! / 1_000_000} million`}
            ></MovieInfo>
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue!) / 1_000_000} million`}
            ></MovieInfo>
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          ></MovieInfo>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#FFF"}
        ></Image>
        <Text className="text-white font-semibold text-base">Go back!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
