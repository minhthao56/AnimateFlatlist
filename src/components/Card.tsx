import React from 'react';
import {Image, StyleSheet, Animated, Dimensions} from 'react-native';

const {height: wHeight} = Dimensions.get('window');
const height = wHeight - 64;

interface ICard {
  image: any;
  y: Animated.Value;
  index: number;
}
const CARD_HEIGHT = 200;

export const Card: React.FC<ICard> = ({image, y, index}) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;

  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.0001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: 'clamp',
      }),
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    }),
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View
      style={[
        styles.constainer,
        {opacity, transform: [{translateY}, {scale}]},
      ]}>
      <Image source={image} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 8,
  },
});
