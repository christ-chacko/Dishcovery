import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constants/CategoryData'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CachedImage from '../helpers/Images';


function Categories ({categories, ActiveCategory, handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        className='space-x-4'
        contentContainerStyle={{paddingHorizontal:15}}
        >
        
        {
            categories.map((cat, index) => {
                let isActive = cat.strCategory==ActiveCategory;
                let activeButtonClass = isActive? 'bg-amber-400' : 'bg-black/10';
                return (
                    <TouchableOpacity
                    key={index}
                    onPress={() => handleChangeCategory(cat.strCategory)}
                    className='flex items-center space-y-1 mr-4' >

                     <View className={`rounded-full  ${activeButtonClass}`}  style={{ width: hp(10), height: hp(10), padding: 8}}>
                        <Image 
                        source={{uri: cat.strCategoryThumb}}
                        style={{width:hp(8), height: hp(8)}}
                        className='rounded-full justify-center items-centers'
                            />

                          {/* <CachedImage
                          uri = { cat.strCategoryThumb}
                        style={{width:hp(8), height: hp(8)}}
                        className='rounded-full justify-center items-centers'/> */}

                    </View>

                    
                    <Text className='text-neutral-600' style={{fontSize: hp(1.6)}}>{cat.strCategory}</Text>
                    

                   </TouchableOpacity>
                )
            })
        }
      
      </ScrollView>
    </Animated.View>
  )
}

export default Categories