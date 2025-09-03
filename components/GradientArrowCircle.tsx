import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

interface GradientArrowCircleProps {
  style?: any;
}

export const GradientArrowCircle: React.FC<GradientArrowCircleProps> = ({ style }) => {
  return (
    <View style={[style, { overflow: 'hidden' }]}>
      <LinearGradient
        colors={['#57575aff', '#2b2a2cc9', '#2c2c2cbb']}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: style?.borderRadius || 25,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{ fontSize: 24, color: '#FFFFFF' }}>→</Text>
      </LinearGradient>
    </View>
  );
};
