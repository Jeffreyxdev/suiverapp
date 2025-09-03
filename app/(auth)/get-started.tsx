import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { GradientCircle } from '../../components/GradientCircle';



export default function GetStartedScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48); // Full width with padding

  // Create animated values for floating circles
  const circleAnimations = React.useRef(
    Array.from({ length: 6 }).map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
    }))
  ).current;

  React.useEffect(() => {
    // Animate the floating circles
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating Circles Background */}
      <View style={styles.backgroundCircles}>
        {Array.from({ length: 6 }).map((_, index) => (
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
            
          </Animated.View>
        ))}
      </View>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/white.png')} // Update with your full Suiver logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

     
      

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.getStartedButton]}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  logo: {
    width: 300,
    height: 330,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  featureIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    fontFamily: 'Poppins',
  },
  buttonContainer: {
    padding: 24,
    marginTop: 80,
    gap: 12,
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins',
  },
  getStartedButton: {
    backgroundColor: '#000000',
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
});
