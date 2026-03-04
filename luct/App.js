import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider } from "./theme/ThemeContext";

import FacultyScreen from "./screens/FacultyScreen";
import CourseScreen from "./screens/CourseScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import RecommendationScreen from "./screens/RecommendationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* home stack */
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Faculty"
        component={FacultyScreen}
      />

      <Stack.Screen
        name="Courses"
        component={CourseScreen}
      />

      <Stack.Screen
        name="Recommend"
        component={RecommendationScreen}
      />
    </Stack.Navigator>
  );
}

/* bottom tabs */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "dodgerblue",
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          if (route.name === "Favorites") iconName = "heart";

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
}

/* applicatin routee */
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}
