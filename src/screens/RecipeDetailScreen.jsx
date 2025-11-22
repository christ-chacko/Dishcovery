import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import {HeartIcon, ClockIcon} from 'react-native-heroicons/solid';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import { sharedTransitionTag } from 'react-native-reanimated';


const RecipeDetailScreen = ({route}) => {
    let item = route.params;
    const [isFavourite, setisFavourite] = useState(false);
    const [Meal, setMeal] = useState(null);
    const [loading, setloading] = useState(true)

    const navigation = useNavigation();

    useEffect(()=> {
        getMealData(item.idMeal);
    },[])

     const getMealData = async (id) => {
        try {
          const response = await axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        //   console.log('got meal data: ', response.data)
          if (response && response.data) {
            setMeal(response.data.meals[0]);
            setloading(false)
          }
        } catch (error) {
          console.log('error', error.message);
        }
      };


      const ingredientsIndexes = (Meal) => {
        if (!Meal) return [];
        let indexes = [];
        
        for(let i=1; i<=20; i++){
            if (Meal['strIngredient' + i] && Meal['strIngredient' + i].trim() !== ''){
                indexes.push(i);
            }
        }
        return indexes;
      }

      const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if(match && match[1]){
            return match[1];
        }
        return null;
      }

    
  return (
    <ScrollView
    className = 'bg-white flex-1'
    showsVerticalScrollIndicator = {false}
    contentContainerStyle={{paddingBottom:30}}
    >
    
    <StatusBar style={'light'}/>
    <View>
    <Image
    source={{ uri: item.strMealThumb }}
    sharedTransitionTag = {item.strMeal}
    style={{width: wp(100), height: hp(50), borderRadius: 0, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
    />
    </View>

    <View className = 'w-full absolute flex-row justify-between items-center pt-14'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='p-2 rounded-full ml-5 bg-white'>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth= {4.5}  color={'#fbbf24'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setisFavourite(!isFavourite) } className='p-2 rounded-full mr-5 bg-white'>
            <HeartIcon size={hp(3.5)} strokeWidth= {4.5}  color= {isFavourite?'red': 'gray'}/>
        </TouchableOpacity>
    </View>

    {/* {
        loading? (
            <Loading size='large' className='mt-16'/>
        ): (
            <View>
                <Text>display meal</Text>
            </View>
        )
    } */}

    <View className ='px-4 flex justify-between space-y-4 pt-8'>
        <View className='space-y-2'>
            <Text style={{fontSize:hp(3)}} className='font-bold flex-1 text-neutral-700'>
                {Meal?.strMeal}
            </Text>
            <Text style={{fontSize:hp(2)}} className='font-medium flex-1 text-neutral-500'>
                {Meal?.strArea}
            </Text>
        </View>

        {/* misc info */}
        <View className='flex-row justify-around mt-3'>

            <View className='flex rounded-full bg-amber-300 p-2'>
                <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className='bg-white rounded-full flex items-center justify-center'>
                
                <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                 </View>

                 <View className='flex items-center py-2 space-y-1'>
                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>35</Text>    
                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>Mins</Text>    
                </View>   
            </View>

             <View className='flex rounded-full bg-amber-300 p-2'>
                <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className='bg-white rounded-full flex items-center justify-center'>
                
                <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                 </View>

                 <View className='flex items-center py-2 space-y-1'>
                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>03</Text>    
                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>Servings</Text>    
                </View>   
            </View>

            <View className='flex rounded-full bg-amber-300 p-2'>
                <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className='bg-white rounded-full flex items-center justify-center'>
                
                <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                 </View>

                 <View className='flex items-center py-2 space-y-1'>
                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>103</Text>    
                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>Cal</Text>    
                </View>   
            </View>

            <View className='flex rounded-full bg-amber-300 p-2'>
                <View 
                style={{height: hp(6.5), width: hp(6.5)}}
                className='bg-white rounded-full flex items-center justify-center'>
                
                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252'/>
                 </View>

                 <View className='flex items-center py-2 space-y-1'>
                    <Text style={{fontSize: hp(2)}} className='font-bold text-neutral-700'>103</Text>    
                    <Text style={{fontSize: hp(1.3)}} className='font-bold text-neutral-700'>Cal</Text>    
                </View>   
            </View>

        </View>

        {Meal && ingredientsIndexes(Meal).length > 0 && (
        <View className='mt-4'>
            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Ingredients</Text>
        </View>)}

        {Meal && ingredientsIndexes(Meal).length > 0 && (
        <View className='mt-2 '>
            {
                ingredientsIndexes(Meal).map(i => {
                    return (
                        <View key ={i} className='flex-row ml-4'>
                            <View style={{height: hp(1.5), width: hp(1.5)}} 
                            className=' bg-amber-300 rounded-full mt-1'>

                            </View>
                                <View className='flex-row space-x-2'>

                                    <Text style={{fontSize: hp(1.7)}} className='ml-2 font-extrabold text-neutral-700'>{Meal['strMeasure'+i]}</Text>
                                    <Text style={{fontSize: hp(1.7)}} className='ml-2 font-medium text-neutral-600'>{Meal['strIngredient'+i]}</Text>
                                </View>
                        </View>
                    )
                })
            }
        </View>)}

        {Meal?.strInstructions?.trim() && (
         <View className='mt-4'>
            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Instructions</Text>
        </View>)}

       <Text style={{fontSize:hp(1.6)}} className='text-neutral-700'>

        {
            Meal?.strInstructions
        }
       </Text>

        {Meal?.strYoutube && (
         <View className='mt-4'>
            <Text style={{fontSize: hp(2.5)}} className='font-bold flex-1 text-neutral-700'>Recipe Video</Text>
        
        <View>
            <YoutubeIframe
            videoId= {getYoutubeVideoId(Meal.strYoutube)}
            height={hp(30)}
            />
        </View>
        
        </View>
    
    )}

    </View>

    </ScrollView>
  )
}

export default RecipeDetailScreen