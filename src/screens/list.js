import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const BeeListScreen = () => {
  const beeData = [
    { id: '1', description: 'Healthy bee colony', imageUri: 'https://example.com/bee1.jpg' },
    { id: '2', description: 'Bee colony with queen', imageUri: 'https://example.com/bee2.jpg' },
    // add more bee data here
  ];

  return (
    <View>
      <FlatList
        data={beeData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.imageUri }} style={{ width: 100, height: 100 }} />
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BeeListScreen;
