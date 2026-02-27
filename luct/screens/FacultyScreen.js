import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";

export default function FacultyScreen({ navigation }) {
  const { colors, toggleTheme, isDark } = useContext(ThemeContext);

  const faculties = [
    { name: "Faculty of Information Technology", icon: "laptop-code" },
    { name: "Faculty of Business", icon: "briefcase" },
    { name: "Faculty of Design", icon: "palette" },
    { name: "Faculty of Communication", icon: "comments" },
    { name: "Faculty of Tourism", icon: "car" },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        contentContainerStyle={styles.content}
      >
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/LimkoBadge.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Welcome To Limkokwing University Of Creative Technology
          </Text>

          <TouchableOpacity onPress={toggleTheme} style={{ marginTop: 10 }}>
            <Text style={{ color: colors.accent }}>
              Switch to {isDark ? "Light" : "Dark"} Mode
            </Text>
          </TouchableOpacity>
        </View>

        {/* ✅ QUIZ CARD */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.quizCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => navigation.navigate("Recommend")}
        >
          <View style={styles.row}>
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: colors.accent + "22" },
              ]}
            >
              <FontAwesome5
                name="question-circle"
                size={20}
                solid
                color={colors.accent}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { color: colors.text }]}>
                Course Recommendation Quiz
              </Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>
                Answer questions and find your best course
              </Text>
            </View>

            <FontAwesome5
              name="chevron-right"
              size={16}
              solid
              color={colors.muted}
            />
          </View>
        </TouchableOpacity>

        {/* FACULTY CARDS */}
        {faculties.map((faculty) => (
          <TouchableOpacity
            key={faculty.name}
            activeOpacity={0.85}
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() =>
              navigation.navigate("Courses", {
                facultyName: faculty.name,
              })
            }
          >
            <View style={styles.row}>
              <View
                style={[
                  styles.iconBubble,
                  { backgroundColor: colors.accent + "22" },
                ]}
              >
                <FontAwesome5
                  name={faculty.icon}
                  size={18}
                  solid
                  color={colors.accent}
                />
              </View>

              <Text
                style={[styles.text, { color: colors.text }]}
                numberOfLines={2}
              >
                {faculty.name}
              </Text>

              <FontAwesome5
                name="chevron-right"
                size={16}
                solid
                color={colors.muted}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 28 },

  logoContainer: {
    alignItems: "center",
    marginBottom: 18,
  },

  logo: {
    width: 180,
    height: 180,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
  },

  /* ⭐ QUIZ CARD STYLE */
  quizCard: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 18,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  card: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: "black",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
  },
});