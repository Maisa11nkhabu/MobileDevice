import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function FacultyScreen({ navigation }) {
  const { colors, toggleTheme, isDark } = useContext(ThemeContext);
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const faculties = [
    { name: "Faculty of Information Technology", icon: "laptop-code", color: "#4169E1", students: "200+" },
    { name: "Faculty of Business", icon: "briefcase", color: "#32CD32", students: "300+" },
    { name: "Faculty of Design", icon: "palette", color: "#FF6B6B", students: "200+" },
    { name: "Faculty of Communication", icon: "comments", color: "#FFA500", students: "200+" },
    { name: "Faculty of Tourism", icon: "car", color: "#9B59B6", students: "400+" },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={isDark ? ['#1a1a1a', colors.bg] : ['#f0f0f0', colors.bg]}
          style={styles.headerGradient}
        >
          {/* Logo Section */}
          <View style={styles.logoWrapper}>
            <View style={[styles.logoContainer, { 
              backgroundColor: colors.card,
              shadowColor: colors.accent,
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 10,
            }]}>
              <Image
                source={require("../assets/LimkoBadge.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.universityName, { color: colors.text }]}>
              Limkokwing University
            </Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Of Creative Technology
            </Text>

            {/* Theme Toggle with Blur Effect */}
            <BlurView intensity={isDark ? 40 : 60} tint={isDark ? 'dark' : 'light'} style={styles.themeToggle}>
              <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                <FontAwesome5 
                  name={isDark ? "sun" : "moon"} 
                  size={16} 
                  color={colors.accent} 
                  solid
                />
                <Text style={[styles.themeText, { color: colors.text }]}>
                  {isDark ? "Light Mode" : "Dark Mode"}
                </Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </LinearGradient>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>
            Explore Your Future
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.muted }]}>
            Discover the perfect course for your passion
          </Text>
        </View>

        {/* Quiz Card with Animation */}
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate("Recommend")}
          >
            <LinearGradient
              colors={[colors.accent, colors.accent + 'dd']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.quizCard, { borderColor: colors.accent + '33' }]}
            >
              <View style={styles.quizContent}>
                <View style={styles.quizIconContainer}>
                  <FontAwesome5
                    name="magic"
                    size={24}
                    solid
                    color="#FFF"
                  />
                </View>
                
                <View style={styles.quizTextContainer}>
                  <Text style={styles.quizTitle}>
                    Course Recommendation Quiz
                  </Text>
                  <Text style={styles.quizSubtitle}>
                    Find your perfect match in 2 minutes
                  </Text>
                </View>

                <View style={styles.quizArrow}>
                  <FontAwesome5
                    name="arrow-right"
                    size={16}
                    solid
                    color="#FFF"
                  />
                </View>
              </View>

              {/* Decorative Elements */}
              <View style={styles.quizDecoration1} />
              <View style={styles.quizDecoration2} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Faculties
          </Text>
          <Text style={[styles.sectionCount, { color: colors.muted }]}>
            {faculties.length} available
          </Text>
        </View>

        {/* Faculty Cards */}
        {faculties.map((faculty, index) => (
          <TouchableOpacity
            key={faculty.name}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Courses", {
                facultyName: faculty.name,
              })
            }
          >
            <Animated.View style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderLeftColor: faculty.color,
                borderLeftWidth: 4,
              }
            ]}>
              <View style={styles.cardContent}>
                <View style={[styles.cardIconContainer, { backgroundColor: faculty.color + '20' }]}>
                  <FontAwesome5
                    name={faculty.icon}
                    size={22}
                    solid
                    color={faculty.color}
                  />
                </View>

                <View style={styles.cardInfo}>
                  <Text 
                    style={[styles.cardTitle, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {faculty.name}
                  </Text>
                  
                  <View style={styles.cardMeta}>
                    <View style={styles.metaItem}>
                      <FontAwesome5 name="graduation-cap" size={10} color={colors.muted} solid />
                      <Text style={[styles.metaText, { color: colors.muted }]}>
                        {faculty.students} students
                      </Text>
                    </View>
                    
                    <View style={styles.metaItem}>
                      <FontAwesome5 name="book-open" size={10} color={colors.muted} solid />
                      <Text style={[styles.metaText, { color: colors.muted }]}>
                        12+ courses
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardArrow}>
                  <FontAwesome5
                    name="chevron-right"
                    size={14}
                    solid
                    color={colors.muted}
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Find your passion, build your future
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { 
    paddingBottom: 30,
  },

  headerGradient: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  logoWrapper: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 12,
  },

  logo: {
    width: 100,
    height: 100,
  },

  universityName: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.8,
  },

  themeToggle: {
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 8,
  },

  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },

  themeText: {
    fontSize: 14,
    fontWeight: '600',
  },

  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },

  welcomeSubtitle: {
    fontSize: 15,
    opacity: 0.7,
  },

  quizCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 24,
    borderColor: 'white',
    borderWidth: 0.1,
    overflow: 'hidden',
    position: 'relative',
  },

  quizContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },

  quizIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quizTextContainer: {
    flex: 1,
  },

  quizTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: '#bbb6b6fc',
    marginBottom: 4,
  },

  quizSubtitle: {
    fontSize: 13,
    color: 'rgba(202, 193, 193, 0.9)',
  },

  quizArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(193, 182, 182, 0.81)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quizDecoration1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.62)',
  },

  quizDecoration2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
  },

  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 12,
  },

  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardMeta: {
    flexDirection: 'row',
    gap: 12,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaText: {
    fontSize: 11,
    fontWeight: '500',
  },

  cardArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },

  footerText: {
    fontSize: 13,
    fontStyle: 'italic',
    opacity: 0.6,
  },
});