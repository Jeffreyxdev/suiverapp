import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const logoScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(-width * 0.2)).current;
  
  // Calculate responsive dimensions
  const logoSize = Math.min(width, height) * 0.25; // 25% of smallest screen dimension
  const fontSize = width * 0.1; // 10% of screen width for text
  const spacing = width * 0.02; // 2% of screen width for spacing

  useEffect(() => {
    // Step 1: Scale in the logo
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      // Step 2: Fade + slide in the text
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Optional: navigate away after animation
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 2000);
    });
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {/* Logo */}
        <Animated.Image
          source={require("../../assets/images/icon.png")}
          style={[
            styles.logo,
            {
              width: logoSize,
              height: logoSize,
              marginRight: -spacing,
              marginLeft: -spacing,
              transform: [{ scale: logoScale }],
            },
          ]}
          resizeMode="contain"
        />

        {/* Text */}
        <Animated.Text
          style={[
            styles.text,
            {
              fontSize,
              opacity: textOpacity,
              transform: [{ translateX: textTranslateX }],
            },
          ]}
        >
          Suiver
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  logo: {
    aspectRatio: 1,
  },
  text: {
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Poppins",
  },
});
