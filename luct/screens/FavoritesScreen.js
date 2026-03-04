import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "../theme/ThemeContext";

export default function FavoritesScreen() {
  const { colors } = useContext(ThemeContext);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  };

  const removeFavorite = async (courseKey) => {
    const updated = { ...favorites };
    delete updated[courseKey];

    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          ❤️ My Favorite Courses
        </Text>
        <TouchableOpacity onPress={loadFavorites} style={styles.refreshButton}>
          <FontAwesome name="refresh" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(favorites).length === 0 ? (
          <Text style={[styles.empty, { color: colors.muted }]}>
            No favorites yet.
          </Text>
        ) : (
          Object.entries(favorites).map(([key, course]) => (
            <View
              key={key}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.courseName, { color: colors.text }]}>
                {course.name}
              </Text>

              <Text style={[styles.description, { color: colors.muted }]}>
                {course.description}
              </Text>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFavorite(key)}
              >
                <FontAwesome name="trash" size={16} color="white" />
                <Text style={styles.removeText}> Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* styles */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  refreshButton: {
    padding: 6,
  },

  content: {
    padding: 20,
    paddingBottom: 100,
  },

  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },

  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
  },

  courseName: {
    fontSize: 16,
    fontWeight: "800",
  },

  description: {
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 20,
  },

  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "crimson",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  removeText: {
    color: "white",
    fontWeight: "700",
    marginLeft: 6,
  },
});
