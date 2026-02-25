import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const stylesVars = {
  bg: "whitesmoke",
  card: "white",
  text: "black",
  muted: "slategray",
  accent: "royalblue",
  border: "lightgray",
};

export default function FacultyScreen({ navigation }) {
  const faculties = [
    { name: "Faculty of Information Technology", icon: "laptop-code" },
    { name: "Faculty of Business", icon: "briefcase" },
    { name: "Faculty of Design", icon: "palette" },
    { name: "Faculty of Communication", icon: "comments" },
    { name: "Faculty of Tourism", icon: "car"},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/LimkoBadge.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Select a faculty to view courses</Text>
        </View>

        {faculties.map((faculty) => (
          <TouchableOpacity
            key={faculty.name}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => navigation.navigate("Courses", { facultyName: faculty.name })}
          >
            <View style={styles.row}>
              <View style={styles.iconBubble}>
                <FontAwesome5 name={faculty.icon} size={18} solid color={stylesVars.accent} />
              </View>
              <Text style={styles.text} numberOfLines={2}>
                {faculty.name}
              </Text>
              <FontAwesome5 name="chevron-right" size={16} solid color={stylesVars.muted} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: stylesVars.bg },
  container: { flex: 1, backgroundColor: stylesVars.bg },
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
    color: stylesVars.muted,
  },
  card: {
    backgroundColor: stylesVars.card,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: stylesVars.border,
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
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    color: stylesVars.text,
    fontSize: 16,
    fontWeight: "700",
  },
});
