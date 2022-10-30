import { View } from 'react-native';
import React from 'react';

const Divider = ({ color, size, horizontal, vertical }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        backgroundColor: color,
        marginHorizontal: horizontal,
        marginVertical: vertical,
        height: size,
      }}
    />
  );
};

export default Divider;
