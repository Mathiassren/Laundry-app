import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import animation from "../assets/icons/Laundryanimation.json"; // Update with the correct path to your Lottie file
import * as Animatable from "react-native-animatable";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const textOpacity = useRef(new Animated.Value(0)).current; // Initial opacity set to 0
  const textTranslateY = useRef(new Animated.Value(10)).current; // Initial position set to 10

  useEffect(() => {
    Animated.timing(textOpacity, {
      toValue: 1, // Final opacity value
      duration: 2000, // Duration of the animation
      useNativeDriver: true,
      easing: Easing.ease, // Easing function for smooth animation
    }).start();

    Animated.timing(textTranslateY, {
      toValue: 0, // Final position value
      duration: 2000, // Duration of the animation
      useNativeDriver: true,
      easing: Easing.ease, // Easing function for smooth animation
    }).start();
  }, []);

  const renderBubbles = () => {
    const bubbles = Array.from({ length: 10 }, (_, index) => {
      const bubbleSize = Math.random() * 50 + 20;
      const animationDelay = Math.random() * 2000;
      const duration = Math.random() * 2000 + 3000;
      const leftPosition = Math.random() * 100;

      return (
        <Animatable.View
          key={index}
          className="absolute bottom-0 bg-blue-500 rounded-full"
          style={{
            width: bubbleSize,
            height: bubbleSize,
            left: `${leftPosition}%`,
          }}
          animation={{
            0: { translateY: 0, opacity: 0.6 },
            0.5: { opacity: 0.8 },
            1: { translateY: -600, opacity: 0 },
          }}
          duration={duration}
          delay={animationDelay}
          iterationCount="infinite"
          easing="ease-in-out"
        />
      );
    });
    return bubbles;
  };

  return (
    <SafeAreaView className="bg-primary h-full flex">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center items-center min-h-[100vh]  px-4 ">
          {renderBubbles()}
          <Animated.Text
            className="absolute uppercase font-pextrabold text-3xl text-white top-[30%] text-center"
            style={{
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            }}
          >
            wash<Text className="text-blue-500">Wise</Text>
          </Animated.Text>
          <View className="flex-1 justify-center items-center">
            <LottieView
              source={animation}
              autoPlay
              loop
              style={{ width: 300, height: 300 }} // Adjust the width and height to make it smaller
            />
            <Text className="text-white text-lg text-center font-bold ">
              Den bedste vasketøjs guide
            </Text>
          </View>
          <View className="absolute bottom-10 w-full flex items-center">
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full rounded-xl"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
