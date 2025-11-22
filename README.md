 Food Recipe App

A beautiful and interactive food recipe application built with React Native. This app allows users to browse a wide variety of recipes, search for specific meals, and save their favorite dishes for quick access. It leverages the power of React Native Reanimated for smooth, fluid animations and fetches data dynamically from TheMealDB API.

 Features

Search Functionality: Easily search for recipes by name or ingredient.

Categories: Browse recipes by categories (e.g., Beef, Chicken, Vegetarian, Dessert).

Detailed Recipe View: View full details including ingredients, measurements, and step-by-step instructions.

Youtube Integration: Watch video tutorials for recipes directly within the app (links to YouTube).

Favorites System: Save your best-loved recipes to a "Favorites" list for offline-like access (persisted locally).

Smooth Animations: Enhanced user experience with fluid transitions and interactions using React Native Reanimated.

Responsive Design: Optimized for various screen sizes on both iOS and Android.

🛠 Tech Stack

Framework: React Native (via Expo or CLI)

Language: JavaScript / TypeScript

Animations: React Native Reanimated

Navigation: React Navigation (Stack & Tabs)

Data Source: TheMealDB API

State Management: (Mention if you used Context API, Redux, or Zustand - defaulting to Context/Local State for this template)

Storage: AsyncStorage (for persisting favorites)

Icons: React Native Vector Icons / Lucide React Native

📱 Screenshots

Splash Screen

![WhatsApp Image 2025-11-19 at 1 46 10 PM](https://github.com/user-attachments/assets/0648ba67-e4ef-456f-8857-bbaad1b73234)

Home with search bar and categories

![WhatsApp Image 2025-11-19 at 1 46 09 PM (2)](https://github.com/user-attachments/assets/af7f4c14-5106-40a9-9102-6ecfca7bb1de)

Recipe Screen

![WhatsApp Image 2025-11-19 at 1 46 09 PM (1)](https://github.com/user-attachments/assets/59c34a96-b27b-4713-bcfd-2c0fffb10350)


Youtube video integration

![WhatsApp Image 2025-11-19 at 1 46 09 PM](https://github.com/user-attachments/assets/e73271e1-ae48-4e7c-bb12-70ccc37e6897)



Getting Started

Follow these steps to set up the project locally.

Prerequisites

Node.js installed

npm or yarn installed

React Native development environment set up (Android Studio / Xcode)

Installation

Clone the repository

git clone [https://github.com/yourusername/food-recipe-app.git](https://github.com/yourusername/food-recipe-app.git)
cd food-recipe-app


Install dependencies

npm install
# or
yarn install


Install Pods (iOS only)

cd ios && pod install && cd ..


Run the app

Android:

npm run android


iOS:

npm run ios


📂 Project Structure

src/
├── assets/          # Images and fonts
├── components/      # Reusable components (RecipeCard, CategoryPill, etc.)
├── constants/       # App constants (Colors, API URLs)
├── navigation/      # Navigation setup (AppNavigator)
├── screens/         # Main screens (HomeScreen, RecipeDetailScreen, SearchScreen)
├── utils/           # Helper functions
└── App.js           # Entry point


🔌 API Reference

This app uses the free tier of TheMealDB.

Search: www.themealdb.com/api/json/v1/1/search.php?s={query}

Lookup ID: www.themealdb.com/api/json/v1/1/lookup.php?i={id}

Categories: www.themealdb.com/api/json/v1/1/categories.php
