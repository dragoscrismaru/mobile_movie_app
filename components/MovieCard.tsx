import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import Svg, { Circle } from "react-native-svg";

const ProgressSign = ({ popularity }: { popularity: number }) => {
  const size = 34;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = popularity / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <View className="absolute top-2 right-2 z-10">
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#404040"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFD700"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Percentage Text */}
      <View className="absolute inset-0 justify-center items-center">
        <Text className="text-white text-[10px] font-bold">
          {Math.round(popularity)}%
        </Text>
      </View>
    </View>
  );
};

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  popularity,
  release_date,
}: Movie) => {
  return (
    <Link
      href={{
        pathname: `/movies/[id]`,
        params: { id },
      }}
      asChild
    >
      <TouchableOpacity className="w-[30%]">
        {/* Popularity progress */}
        {/* <ProgressSign popularity={popularity} /> */}

        <Image
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
