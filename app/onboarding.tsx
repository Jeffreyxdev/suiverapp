// Replace the image placeholder with the actual image for each onboarding screen

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { GradientArrowCircle } from "../components/GradientArrowCircle";
import { GradientCircle } from "../components/GradientCircle";

const ONBOARDING_SCREENS = [
  {
    id: 1,
    title: "No need for Waiting",
    description: "With Suiver, your crypto moves as fast as you do, swap to cash instantly, no queues, no delays.",
    image: require("../assets/images/first.png"),
  },
  {
    id: 2,
    title: "Deposit Crypto and get paid instant",
    description: "Turn your crypto into cash the moment it hits simple, direct, and stress-free.",
    image: require("../assets/images/wallet.svg"),
  },
  
{
  id:3,
  title:"Buy airtime & pay bills",
  description:'Suiver allows you to Top up your phone or settle bills straight with your crypto quick, easy, and seamless.',
  image: require("../assets/images/airtime.svg")
},
  {
    id: 4,
    title: "Send money to Family",
    description: "Move money home in seconds, crypto to cash, direct and reliable for the people who matter most.",
    image: require("../assets/images/send.png"),
  },
 
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const autoSlideTimer = React.useRef<number>();
  
  // Auto-slide functionality
  React.useEffect(() => {
    const startAutoSlide = () => {
      autoSlideTimer.current = setInterval(() => {
        if (currentIndex < ONBOARDING_SCREENS.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Clear interval when we reach the last slide
          if (autoSlideTimer.current) {
            clearInterval(autoSlideTimer.current);
          }
        }
      }, 3000); // Change slide every 3 seconds
    };

    startAutoSlide();

    // Cleanup on unmount
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [currentIndex]);
  
  // Create animated values for each circle
  const circleAnimations = React.useRef(
    Array.from({ length: 10 }).map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
    }))
  ).current;

  React.useEffect(() => {
    // Create animations for each circle
    circleAnimations.forEach((anim) => {
      const createAnimation = (axis: Animated.Value) => {
        const randomDuration = 3000 + Math.random() * 2000;
        const randomOffset = Math.random() * 30;
        
        Animated.sequence([
          Animated.timing(axis, {
            toValue: randomOffset,
            duration: randomDuration,
            useNativeDriver: true,
          }),
          Animated.timing(axis, {
            toValue: -randomOffset,
            duration: randomDuration,
            useNativeDriver: true,
          }),
        ]).start(() => createAnimation(axis));
      };

      createAnimation(anim.x);
      createAnimation(anim.y);
    });
  }, []);
  
  const finishOnboarding = async () => {
    if (currentScreen.id === 4) {
      await AsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/(auth)/get-started");
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentScreen = ONBOARDING_SCREENS[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Blue circles background */}
      <View style={styles.backgroundCircles}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Animated.View
        key={index}
        style={[
          styles.circle,
          {
            top: Math.random() * 600,
            left: Math.random() * width,
            opacity: 0.4,
            transform: [
          { translateX: circleAnimations[index].x },
          { translateY: circleAnimations[index].y }
            ]
          }
        ]}
          >
        <GradientCircle style={{ width: '100%', height: '100%' }} />
          </Animated.View>
        ))}
      </View>

      <View style={styles.content}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={currentScreen.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentScreen.title}</Text>
          {currentScreen.description && (
            <Text style={styles.description}>{currentScreen.description}</Text>
          )}
        </View>
      </View>

      {/* Progress Dots */}
      <View style={styles.pagination}>
        {ONBOARDING_SCREENS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null
            ]}
          />
        ))}
      </View>

      {/* Next Button - only show on last slide */}
      {currentScreen.id === 4 && (
        <TouchableOpacity 
          style={styles.button} 
          onPress={finishOnboarding}
        >
          <GradientArrowCircle style={styles.arrowCircle} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundCircles: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    shadowColor: '#255399ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    fontFamily: "Poppins",
  },
  description: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
    fontFamily: "Poppins",
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#9747FF',
    width: 24,
    height: 8,
  },
  button: {
    position: "absolute",
    bottom: 50,
    right: 20,
    padding: 10,
  },
  arrowCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#3c3a3dff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
