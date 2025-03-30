import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants/icons";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.

        console.error(JSON.stringify, signInAttempt, null, 2);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <View>
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
          <Text className="text-2xl text-white font-bold mt-5 mb-3">
            Welcome Sign-IN👋
          </Text>
        </View>
        <Text className="text-white">
          valeus: {emailAddress} {password}
        </Text>
        <View className="w-full">
          <InputField
            autoCapitalize="none"
            label="Email"
            placeholder="Enter email"
            icon={icons.person}
            textContentType="emailAddress"
            value={emailAddress}
            onChangeText={(value) => setEmailAddress(value)}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            // icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <CustomButton
            bgVariant="success"
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />
        </View>
        {/* <Text>Sign in</Text> */}
      </View>
    </ScrollView>
  );
}
