import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

interface GradientCircleProps {
  style?: any;
}

export const GradientCircle: React.FC<GradientCircleProps> = ({ style }) => {
  return (
    <View style={style}>
      <LinearGradient
        colors={['#9747FF', '#582e80ff', '#4B0082']}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: style?.borderRadius || 10,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};
