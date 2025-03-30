import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="felx justify-center items-center flex-1 flex-col gap-5">
        {/* <Text className="text-gray-500 text-base">Profile</Text> */}
        <TouchableOpacity className="w-full mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50">
          <Image
            source={icons.person}
            className="size-5 mr-1 mt-0.5"
            tintColor={"#FFF"}
          ></Image>
          <Text className="text-white font-semibold text-base">
            Conecteaza-te!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
