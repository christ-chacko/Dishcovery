import { View, Text, SafeAreaView, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Greeting from "../components/Greeting";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";
import { mealData } from "../constants/CategoryData";

const HomeScreen = () => {
  const [ActiveCategory, setActiveCategory] = useState("Breakfast");
  const [categories, setcategories] = useState([]);
  const [Meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = category => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setcategories(response.data.categories);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };


  const getRecipes = async (category="Beef") => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got recipes: ', response.data)
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const renderHeader = () => (
    <View className="space-y-5" style={{ paddingHorizontal: wp(5), paddingTop: hp(6) }}>
      <Text style={{ fontSize: hp(2.5) }} className="text-neutral-800 font-bold">
        <Greeting />
      </Text>

      <Text style={{ fontSize: hp(4) }} className="font-semibold text-neutral-600 leading-snug">
        Find delicious food <Text className="text-amber-400">recipes!</Text>
      </Text>

      <View className="flex-row items-center rounded-full bg-black/5 p-[6px]">
        <TextInput
          placeholder="Search recipe"
          placeholderTextColor={'gray'}
          style={{ fontSize: hp(1.7) }}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
        />
        <View className="bg-white rounded-full p-3">
          <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
        </View>
      </View>

      <View className="mt-6">
        {categories.length > 0 && (
          <Categories
            categories={categories}
            ActiveCategory={ActiveCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[{}]} // dummy data to trigger renderItem
        renderItem={() => <Recipes meals={Meals} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
