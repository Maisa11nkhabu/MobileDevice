import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./theme/ThemeContext";

import FacultyScreen from "./screens/FacultyScreen";
import CourseScreen from "./screens/CourseScreen";
import RecommendationScreen from "./screens/RecommendationScreen"; // ⭐ NEW

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Faculty"
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
      </NavigationContainer>
    </ThemeProvider>
  );
}
