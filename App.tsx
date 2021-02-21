/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, StyleSheet, View, FlatList, Animated} from 'react-native';
import {Card} from './src/components/Card';

import Card1 from './src/assets/card1.png';
import Card2 from './src/assets/card2.png';
import Card3 from './src/assets/card3.png';
import Card4 from './src/assets/card4.png';
import Card5 from './src/assets/card5.png';
import Card6 from './src/assets/card6.png';

const DATAIMAGES = [Card1, Card2, Card3, Card4, Card5, Card6];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const App = () => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.constainer}>
        <AnimatedFlatList
          data={DATAIMAGES}
          renderItem={({item, index}) => {
            return <Card image={item} y={y} index={index} />;
          }}
          keyExtractor={(item, i) => i.toString()}
          ItemSeparatorComponent={() => <View style={{height: 16}} />}
          scrollEventThrottle={16}
          onScroll={onScroll}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
});

export default App;
