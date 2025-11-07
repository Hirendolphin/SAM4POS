import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../theme/Metrics';

const CustomSwitch = ({
  value = false,
  onValueChange = (isOn: boolean) => {},
  activeColor = colors.primary,
  inactiveColor = colors.switch,
  thumbColor = colors.white,
  width = moderateScale(35),
  height = moderateScale(19),
}) => {
  const [isOn, setIsOn] = useState(value);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    onValueChange(!isOn);
  };

  const interpolateBackground = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, width - height],
  });

  return (
    <Pressable onPress={toggleSwitch} style={{ width, height }}>
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: interpolateBackground,
            width,
            height,
            borderRadius: height / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              backgroundColor: thumbColor,
              width: height - moderateScale(5),
              height: height - moderateScale(5),
              borderRadius: (height - 4) / 2,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
    paddingVertical: verticalScale(2),
    paddingHorizontal: horizontalScale(2),
  },
});

export default CustomSwitch;
