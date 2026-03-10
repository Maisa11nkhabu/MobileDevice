import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import { View, Text, StyleSheet, Animated, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { ThemeProvider, ThemeContext } from "./theme/ThemeContext";

import FacultyScreen from "./screens/FacultyScreen";
import CourseScreen from "./screens/CourseScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import RecommendationScreen from "./screens/RecommendationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------- CUSTOM TAB BAR ---------- */
function CustomTabBar({ state, descriptors, navigation }) {
  const { colors, isDark } = useContext(ThemeContext);
  
  return (
    <BlurView 
      intensity={isDark ? 80 : 90} 
      tint={isDark ? 'dark' : 'light'} 
      style={[styles.tabBar, { backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)' }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get icon based on route name
        const getIcon = () => {
          switch(route.name) {
            case 'Home':
              return { name: 'home', solid: isFocused };
            case 'Favorites':
              return { name: 'heart', solid: isFocused };
            case 'Profile':
              return { name: 'user', solid: isFocused };
            default:
              return { name: 'circle', solid: isFocused };
          }
        };

        const icon = getIcon();
        const iconColor = isFocused ? colors.accent : colors.muted;
        
        // Label for accessibility
        const label = options.tabBarLabel !== undefined 
          ? options.tabBarLabel 
          : options.title !== undefined 
          ? options.title 
          : route.name;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View style={[
              styles.tabIconContainer,
              isFocused && { backgroundColor: colors.accent + '20' }
            ]}>
              <FontAwesome5 
                name={icon.name} 
                size={isFocused ? 22 : 20} 
                color={iconColor}
                solid={icon.solid}
              />
            </View>
            {isFocused && (
              <Text style={[styles.tabLabel, { color: colors.accent }]}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
}

/* ---------- HOME STACK WITH CUSTOM HEADER ---------- */
function HomeStack() {
  const { colors, isDark } = useContext(ThemeContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Faculty" component={FacultyScreen} />
      <Stack.Screen 
        name="Courses" 
        component={CourseScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen 
        name="Recommend" 
        component={RecommendationScreen}
        options={{
          animation: "fade_from_bottom",
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

/* ---------- FAVORITES STACK ---------- */
function FavoritesStack() {
  const { colors } = useContext(ThemeContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

/* ---------- BOTTOM TABS ---------- */
function MainTabs() {
  const { colors } = useContext(ThemeContext);
  
  return (
    <Tab.Navigator
      id="MainTabs"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesStack}
        options={{
          tabBarLabel: 'Favorites',
        }}
      />
    </Tab.Navigator>
  );
}

/* ---------- SPLASH SCREEN ---------- */
function SplashScreen({ onFinish }) {
  const { colors } = useContext(ThemeContext);
  
  React.useEffect(() => {
    setTimeout(onFinish, 2000);
  }, []);

  return (
    <LinearGradient
      colors={[colors.accent, colors.accent + 'dd']}
      style={styles.splashContainer}
    >
      <View style={styles.splashContent}>
        <View style={[styles.splashLogo, { backgroundColor: '#FFF' }]}>
          <FontAwesome5 name="graduation-cap" size={50} color={colors.accent} solid />
        </View>
        <Text style={styles.splashTitle}>Limkokwing University</Text>
        <Text style={styles.splashSubtitle}>Of Creative Technology</Text>
      </View>
    </LinearGradient>
  );
}

/* ---------- APP ROOT ---------- */
export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const { colors } = useContext(ThemeContext);

  if (!isReady) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <SplashScreen onFinish={() => setIsReady(true)} />
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  /* Custom Tab Bar Styles */
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  tabIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },

  /* Splash Screen Styles */
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  splashContent: {
    alignItems: 'center',
  },

  splashLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  splashTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },

  splashSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
});
