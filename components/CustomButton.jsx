import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-blue-600 py-3 px-8 rounded ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
    >
      <Text
        className={`text-lg text-white text-center font-bold uppercase ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
