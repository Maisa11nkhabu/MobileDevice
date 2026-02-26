// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./theme/ThemeContext";

import FacultyScreen from "./screens/FacultyScreen";
import CourseScreen from "./screens/CourseScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Faculty">
          <Stack.Screen
            name="Faculty"
            component={FacultyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Courses"
            component={CourseScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}