import { View, Text, Pressable, Image, FlatList } from 'react-native';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants/CategoryData';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CachedImage from '../helpers/Images';
import { useNavigation } from '@react-navigation/native';
import { sharedTransitionTag } from 'react-native-reanimated';


const Recipes = ({meals = []}) => {
  const navigation = useNavigation();
  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) , marginTop: 4}} className='font-semibold text-neutral-600 '>Recipes</Text>

      <MasonryList
        data={meals}
        keyExtractor={(item, index) => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation = {navigation}/>}
      
      />
    </View>
  );
};

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index%2==0;
  return (

    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
    <Pressable
      style={{
        
        width: wp('44%'), 
        paddingLeft: isEven? 0:8, paddingRight: isEven?8:0
      }}
      className='dlex justify-center mb-4 space-y-1'
      onPress={() => navigation.navigate('RecipeDetail', {...item})}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        style={{
          width: '100%',
          height: index % 3 == 0 ? hp(25) : hp(35),
          borderRadius: 30,}}
          className="bg-black/5"
          sharedTransitionTag = {item.strMeal}
        
      />

      {/* <CachedImage 
           uri= { item.strMealThumb }
          style={{
          width: '100%',
          height: index % 3 == 0 ? hp(25) : hp(35),
          borderRadius: 30,}}
          className="bg-black/5"
        /> */}

      <Text className='font-semibold text-neutral-600'>
        {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
      </Text>
    </Pressable>

    </Animated.View>
  );
};

export default Recipes;
