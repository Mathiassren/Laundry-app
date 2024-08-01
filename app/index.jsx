import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import animation from "../assets/icons/Laundryanimation.json"; // Update with the correct path to your Lottie file
import * as Animatable from "react-native-animatable";

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
        <View className="w-full justify-center items-center flex-1 px-4 relative">
          {renderBubbles()}
          <Animated.Text
            className="absolute uppercase font-pextrabold text-6xl text-white top-[10%] text-center"
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
              style={{ width: 300, height: 400 }} // Adjust the width and height to make it bigger
            />
            <Text className="text-white text-lg max-w-[1080px] text-center font-bold mt-[-60px]">
              En App for dig
            </Text>
            <Text className="text-white text-lg max-w-[1080px] text-center font-bold ">
              Som ønsker at blive bedre til at vaske tøj
            </Text>
          </View>
          <View className="absolute bottom-10 w-full flex items-center">
            <TouchableOpacity
              className="bg-blue-600 py-3 px-8 rounded"
              onPress={() => alert("Button Pressed")}
            >
              <Text className="text-lg text-white text-center font-bold uppercase">
                Start Her
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
