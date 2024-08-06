import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import images from "../../constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import Profile from "../../components/profile";

const steps = [
  "Åben lågen",
  "Put tøjet i vaskemaskinen",
  "Put en vaskekapsel ind til tøjet",
  "Luk lågen",
  "Vælg program på 60 grader",
  "Tryk på start",
  "Vent til programmet er færdig",
  "Åben lågen",
];

const Home = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 indicates the initial screen
  const [points, setPoints] = useState(0); // Track points
  const [rewards, setRewards] = useState([]); // Track rewards

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const storedPoints = await AsyncStorage.getItem("points");
        const storedRewards = await AsyncStorage.getItem("rewards");
        if (storedPoints !== null) {
          setPoints(parseInt(storedPoints, 10));
        }
        if (storedRewards !== null) {
          setRewards(JSON.parse(storedRewards));
        }
      } catch (error) {
        console.error("Failed to load points and rewards from storage", error);
      }
    };

    loadPoints();
  }, []);

  const savePointsAndRewards = async (newPoints, newRewards) => {
    try {
      await AsyncStorage.setItem("points", newPoints.toString());
      await AsyncStorage.setItem("rewards", JSON.stringify(newRewards));
    } catch (error) {
      console.error("Failed to save points and rewards to storage", error);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      const newPoints = points + 10; // Add points for each step
      const newRewards = [...rewards, { id: rewards.length, points: 10 }];
      setPoints(newPoints);
      setRewards(newRewards);
      savePointsAndRewards(newPoints, newRewards);
    } else {
      setCurrentStep(-1); // Reset to initial screen after finishing steps
      setPoints(0); // Reset points
      setRewards([]); // Reset rewards
      savePointsAndRewards(0, []);
    }
  };

  const renderReward = ({ item }) => (
    <Animatable.View animation="bounceIn" style={styles.rewardItem}>
      <Text style={styles.rewardText}>+{item.points} Points!</Text>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === -1 ? (
        <View style={styles.initialScreen}>
          <Text style={styles.headerText}>Latest Laundry</Text>
          <View style={styles.imageWrapper}>
            <Profile />
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => setCurrentStep(0)} // Start steps for light laundry
            >
              <Image
                source={images.laundry}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => setCurrentStep(0)} // Start steps for heavy laundry
            >
              <Image
                source={images.laundry}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.stepScreen}>
          <Text style={styles.stepText}>{steps[currentStep]}</Text>
          <Button title="Next" onPress={handleNextStep} />
          <Text style={styles.pointsText}>Total Points: {points}</Text>
        </View>
      )}
      <FlatList
        data={rewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id.toString()}
        style={styles.rewardsList}
        contentContainerStyle={styles.rewardsListContent}
        numColumns={4}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A202C", // Example primary color
  },
  initialScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  headerText: {
    color: "#E2E8F0", // Example gray-100 color
    fontSize: 18,
    fontFamily: "sans-serif-medium", // Example font family
    marginBottom: 10,
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageButton: {
    marginHorizontal: 10,
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
  },
  stepScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A202C",
  },
  stepText: {
    color: "#FFF",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  rewardItem: {
    padding: 10,
    margin: 5,
    backgroundColor: "#FFD700", // Gold color for reward
    borderRadius: 10,
  },
  rewardText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  pointsText: {
    color: "#FFF",
    fontSize: 18,
    marginTop: 20,
  },
  rewardsList: {
    width: "100%",
    paddingVertical: 10,
  },
  rewardsListContent: {
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
