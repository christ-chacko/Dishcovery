import React from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Greeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning ☀️';
    if (hour < 18) return 'Good afternoon 🌤️';
    return 'Good evening 🌙';
  };

  return (
    <View >
      <Text className='font-semibold text-black tracking-wider ' style={{fontSize: hp(3)}} >
        {getGreeting()}
      </Text>
    </View>
  );
};

export default Greeting;
