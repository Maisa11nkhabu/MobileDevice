import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FacultyScreen from "./screens/FacultyScreen";
import CourseScreen from "./screens/CourseScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Limkokwing University Faculties" 
          component={FacultyScreen} 
        />
        <Stack.Screen 
          name="Courses" 
          component={CourseScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
