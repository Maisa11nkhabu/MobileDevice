import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ThemeContext } from "../theme/ThemeContext";
import { Swipeable } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function FavoritesScreen({ navigation }) {
  const { colors, isDark } = useContext(ThemeContext);
  const [favorites, setFavorites] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const swipeableRefs = useRef({});

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isLoading]);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (courseKey) => {
    // Close swipeable if open
    if (swipeableRefs.current[courseKey]) {
      swipeableRefs.current[courseKey].close();
    }

    Alert.alert(
      "Remove Favorite",
      "Are you sure you want to remove this course from favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            const updated = { ...favorites };
            delete updated[courseKey];

            await AsyncStorage.setItem("favorites", JSON.stringify(updated));
            setFavorites(updated);
          },
        },
      ]
    );
  };

  const clearAllFavorites = () => {
    if (Object.keys(favorites).length === 0) return;

    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all favorite courses?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.setItem("favorites", JSON.stringify({}));
            setFavorites({});
          },
        },
      ]
    );
  };

  const getFacultyColor = (courseName) => {
    if (courseName?.includes("Information Technology")) return "#4169E1";
    if (courseName?.includes("Business")) return "#32CD32";
    if (courseName?.includes("Design")) return "#FF6B6B";
    if (courseName?.includes("Communication")) return "#FFA500";
    if (courseName?.includes("Tourism")) return "#9B59B6";
    return colors.accent;
  };

  const getFacultyIcon = (courseName) => {
    if (courseName?.includes("Information Technology")) return "laptop-code";
    if (courseName?.includes("Business")) return "briefcase";
    if (courseName?.includes("Design")) return "palette";
    if (courseName?.includes("Communication")) return "comments";
    if (courseName?.includes("Tourism")) return "car";
    return "graduation-cap";
  };

  const renderRightActions = (progress, dragX, courseKey) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => removeFavorite(courseKey)}
      >
        <Animated.View style={[styles.deleteActionContent, { transform: [{ scale }] }]}>
          <FontAwesome5 name="trash-alt" size={24} color="#FFF" solid />
          <Text style={styles.deleteActionText}>Remove</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const favoritesCount = Object.keys(favorites).length;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', colors.bg] : ['#f0f0f0', colors.bg]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <FontAwesome5 name="arrow-left" size={18} color={colors.text} />
            </TouchableOpacity>
            <View>
              <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
                Your Collection
              </Text>
              <Text style={[styles.title, { color: colors.text }]}>
                Favorite Courses
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              onPress={loadFavorites}
              style={styles.refreshButton}
            >
              <FontAwesome5 
                name="sync-alt" 
                size={16} 
                color={colors.accent} 
                solid
              />
            </TouchableOpacity>
            <View style={[styles.countBadge, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.countText, { color: colors.accent }]}>
                {favoritesCount}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={clearAllFavorites}
              style={[
                styles.clearButton,
                favoritesCount === 0 && styles.clearButtonDisabled
              ]}
              disabled={favoritesCount === 0}
            >
              <FontAwesome5 
                name="trash" 
                size={16} 
                color={favoritesCount === 0 ? colors.muted : '#FF3B30'} 
                solid
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Bar */}
      {favoritesCount > 0 && (
        <BlurView intensity={isDark ? 40 : 60} tint={isDark ? 'dark' : 'light'} style={styles.statsBar}>
          <View style={styles.statsContent}>
            <FontAwesome5 name="heart" size={14} color="#FF3B30" solid />
            <Text style={[styles.statsText, { color: colors.text }]}>
              You have {favoritesCount} favorite {favoritesCount === 1 ? 'course' : 'courses'}
            </Text>
          </View>
        </BlurView>
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          // Loading Skeleton
          <View style={styles.loadingContainer}>
            {[1, 2, 3].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.skeletonCard,
                  { backgroundColor: colors.card, borderColor: colors.border }
                ]}
              >
                <View style={styles.skeletonHeader}>
                  <View style={[styles.skeletonIcon, { backgroundColor: colors.border }]} />
                  <View style={[styles.skeletonTitle, { backgroundColor: colors.border }]} />
                </View>
                <View style={[styles.skeletonLine, { backgroundColor: colors.border }]} />
                <View style={[styles.skeletonLine, { backgroundColor: colors.border, width: '80%' }]} />
              </Animated.View>
            ))}
          </View>
        ) : favoritesCount === 0 ? (
          // Empty State
          <Animated.View 
            style={[
              styles.emptyContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <View style={[styles.emptyIconContainer, { backgroundColor: colors.card }]}>
              <FontAwesome5 name="heart-broken" size={50} color={colors.muted} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Favorites Yet
            </Text>
            <Text style={[styles.emptyMessage, { color: colors.muted }]}>
              Start exploring courses and tap the heart icon to save your favorites here
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => {
                // Navigate to Home tab first, then to Faculty
                navigation.getParent('MainTabs')?.navigate('Home', { 
                  screen: 'Faculty',
                  params: {}
                });
              }}
            >
              <LinearGradient
                colors={[colors.accent, colors.accent + 'dd']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.exploreButtonGradient}
              >
                <Text style={styles.exploreButtonText}>Explore Courses</Text>
                <FontAwesome5 name="arrow-right" size={14} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          // Favorites List
          <Animated.View style={{ opacity: fadeAnim }}>
            {Object.entries(favorites).map(([key, course], index) => {
              const facultyColor = getFacultyColor(course.name);
              const facultyIcon = getFacultyIcon(course.name);
              const delay = index * 100;

              return (
                <Animated.View
                  key={key}
                  style={{
                    opacity: fadeAnim,
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      })
                    }]
                  }}
                >
                  <Swipeable
                    ref={ref => swipeableRefs.current[key] = ref}
                    renderRightActions={(progress, dragX) => 
                      renderRightActions(progress, dragX, key)
                    }
                    overshootRight={false}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        // Navigate to course details if needed
                      }}
                    >
                      <View
                        style={[
                          styles.favoriteCard,
                          {
                            backgroundColor: colors.card,
                            borderColor: colors.border,
                            borderLeftColor: facultyColor,
                            borderLeftWidth: 4,
                          }
                        ]}
                      >
                        <View style={styles.cardHeader}>
                          <View style={styles.cardHeaderLeft}>
                            <View style={[styles.cardIcon, { backgroundColor: facultyColor + '20' }]}>
                              <FontAwesome5 
                                name={facultyIcon} 
                                size={20} 
                                color={facultyColor} 
                                solid
                              />
                            </View>
                            <View style={styles.cardTitleContainer}>
                              <Text style={[styles.courseName, { color: colors.text }]}>
                                {course.name}
                              </Text>
                              <Text style={[styles.courseFaculty, { color: colors.muted }]}>
                                {course.faculty || 'Course'}
                              </Text>
                            </View>
                          </View>
                          <FontAwesome5 
                            name="chevron-right" 
                            size={14} 
                            color={colors.muted} 
                          />
                        </View>

                        <Text 
                          style={[styles.description, { color: colors.muted }]}
                          numberOfLines={2}
                        >
                          {course.description}
                        </Text>

                        <View style={styles.cardFooter}>
                          <View style={styles.tagsContainer}>
                            <View style={[styles.tag, { backgroundColor: facultyColor + '15' }]}>
                              <FontAwesome5 name="book-open" size={10} color={facultyColor} solid />
                              <Text style={[styles.tagText, { color: facultyColor }]}>
                                Course
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            style={styles.quickAction}
                            onPress={() => removeFavorite(key)}
                          >
                            <FontAwesome5 name="heart" size={16} color="#FF3B30" solid />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                </Animated.View>
              );
            })}

            {/* Footer Note */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.muted }]}>
                Swipe left on a card to remove it
              </Text>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  headerGradient: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  countText: {
    fontSize: 14,
    fontWeight: "700",
  },

  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearButtonDisabled: {
    opacity: 0.5,
  },

  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statsBar: {
    marginHorizontal: 20,
    marginTop: -15,
    marginBottom: 15,
    borderRadius: 30,
    overflow: 'hidden',
  },

  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },

  statsText: {
    fontSize: 14,
    fontWeight: '600',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: '100%',
  },

  loadingContainer: {
    gap: 16,
    paddingTop: 10,
  },

  skeletonCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },

  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  skeletonIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },

  skeletonTitle: {
    flex: 1,
    height: 20,
    borderRadius: 4,
  },

  skeletonLine: {
    height: 12,
    borderRadius: 4,
    width: '100%',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
  },

  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },

  exploreButton: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
  },

  exploreButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },

  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  favoriteCard: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTitleContainer: {
    flex: 1,
  },

  courseName: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },

  courseFaculty: {
    fontSize: 12,
    fontWeight: '500',
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },

  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },

  quickAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3B30' + '15',
  },

  deleteAction: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  deleteActionContent: {
    alignItems: 'center',
    gap: 4,
  },

  deleteActionText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },

  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.6,
  },
});