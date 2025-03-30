import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Redirect, router } from "expo-router";
import { SignOutButton } from "@/components/SignOutButton";

const Profile = () => {
  const { user } = useUser();

  return (
    <View className="bg-primary flex-1 px-10">
      {/* <View className="felx justify-center items-center flex-1 flex-col gap-5">
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
      </View> */}
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          {/* <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link> */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in")}
            className="w-full mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
          >
            <Image
              source={icons.person}
              className="size-5 mr-1 mt-0.5"
              tintColor={"#FFF"}
            ></Image>
            <Text className="text-white font-semibold text-base">
              Conecteaza-te!
            </Text>
          </TouchableOpacity>
          {/* <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link> */}
        </SignedOut>
      </View>
    </View>
  );
};

export default Profile;
