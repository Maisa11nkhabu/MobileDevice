import React, { useContext, useState, useMemo, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ThemeContext } from "../theme/ThemeContext";

const { width } = Dimensions.get('window');

const COURSES_BY_FACULTY = {
  "Faculty of Information Technology": [
    {
      name: "Bsc Business Information Technology",
      description: "Minimun of 4 C grades & C or better in any financial subject. Learn the essentials of business information technology with our Bsc Business Information Technology. Gain practical skills in IT management, business analytics, and digital transformation to excel in the dynamic intersection of business and technology. Prepare for a successful career in this evolving field with hands-on experience and industry insights.",
      image: require("../assets/BusinessTech.jpg"),
      video: require("../assets/BusinessTech.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Bsc in Information Technology",
      description: "Minimum of 4 C & 2 D  grades, C grade or better in Mathematics. Learn the essentials of information technology with our Bsc in Information Technology. Gain practical skills in programming, networking, and database management to excel in the dynamic field of IT. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/InfoTech.jpg"),
      video: require("../assets/BTech.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Bsc in Software Engineering With Multimedia",
      description: "Minimum of 4 C & 2 D grades, C grade or better in Mathematics. Learn the fundamentals of software development and multimedia integration with our Bsc in Software Engineering With Multimedia. Gain practical skills in programming, software design, and multimedia production to excel in the dynamic field of software engineering. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/SoftwareEng.jpg"),
      video: require("../assets/SoftwareEng.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Diploma in Business Information Technology",
      description: "Minimun of 3 C & 2 D grades, C in any financial subject. Learn the essentials of business information technology with our Diploma in Business Information Technology. Gain practical skills in IT management, business analytics, and digital transformation to excel in the dynamic intersection of business and technology. Prepare for a successful career in this evolving field with hands-on experience and industry insights.",
      image: require("../assets/BusinessTech.jpg"),
      video: require("../assets/DiplomaBTech.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Information Technology",
      description: "Minimun of 3 C & 2 D grades, C in mathematics. Learn the essentials of information technology with our Diploma in Information Technology. Gain practical skills in programming, networking, and database management to excel in the dynamic field of IT. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/InfoTech.jpg"),
      video: require("../assets/InfoTech.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Software Engineering",
      description: "Minimum of 3 C & 2 D grades, C in Mathematics. Learn the fundamentals of software development with our Diploma in Software Engineering. Gain practical skills in programming, software design, and project management to excel in the dynamic field of software engineering. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/SoftwareEng.jpg"),
      video: require("../assets/SoftwareEng.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
  ],
  "Faculty of Business": [
    {
      name: "Bsc In Human Resource Management",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject. Learn the essentials of human resource management with our Bsc in Human Resource Management. Gain practical skills in recruitment, training, and employee relations to excel in the dynamic field of HR. Prepare for a successful career in human resources with hands-on experience and industry insights.",
      image: require("../assets/BusinessAdmin.jpg"),
      video: require("../assets/Administration.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Bsc in International Business",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject. Learn the fundamentals of international business with our Bsc in International Business. Gain practical skills in global markets, cross-cultural communication, and international trade strategies. Prepare for a successful career in the dynamic field of international business with hands-on experience and industry insights.",
      image: require("../assets/IntBusiness.jpg"),
      video: require("../assets/International.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Bsc in Entrepreneurship",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject. Learn the essentials of entrepreneurship with our Bsc in Entrepreneurship. Gain practical skills in business planning, innovation, and startup management to turn your ideas into successful ventures. Prepare for a rewarding career as an entrepreneur with hands-on experience and industry insights.",
      image: require("../assets/Entrepre.jpg"),
      video: require("../assets/Entrepe.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Diploma in Business Management",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject. Learn the essentials of business management with our Diploma in Business Management. Gain practical skills in leadership, strategic planning, and organizational behavior to excel in the dynamic world of business. Prepare for a successful career in management with hands-on experience and industry insights.",
      image: require("../assets/BusinessM.jpg"),
      video: require("../assets/Bmanagement.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Retail Management",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject. Learn the essentials of retail management with our Diploma in Retail Management. Gain practical skills in inventory control, customer service, and sales strategies to excel in the dynamic retail industry. Prepare for a successful career in retail with hands-on experience and industry insights.",
      image: require("../assets/Retail.jpg"),
      video: require("../assets/Retail.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Marketing",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject. Learn the fundamentals of marketing with our Diploma in Marketing. Gain practical skills in market research, branding, and digital marketing strategies. Prepare for a successful career in the dynamic field of marketing with hands-on experience and industry insights.",
      image: require("../assets/Marketing.jpg"),
      video: require("../assets/DMarketing.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
  ],
  "Faculty of Design": [
    { 
      name: "Diploma in Creative Advertising",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design. Unleash your creativity with our Diploma in Creative Advertising. Learn the fundamentals of advertising, copywriting, and campaign development. Gain hands-on experience in creating compelling ad campaigns that captivate audiences across various media platforms.",
      image: require("../assets/Advert.jpg"),
      video: require("../assets/Advert.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Graphic Design",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design. Unleash your creativity with our Diploma in Graphic Design. Learn the fundamentals of visual communication, typography, and layout design. Gain hands-on experience with industry-standard software to create stunning graphics for print and digital media.",
      image: require("../assets/Design.jpg"),
      video: require("../assets/Graphic.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Fashion and Apparel Design.",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design. Learn the fundamentals of fashion design and apparel production with our Diploma in Fashion and Apparel Design. Gain hands-on experience in sketching, pattern making, and garment construction to build a successful career in the fashion industry.",
      image: require("../assets/Apparel.jpg"),
      video: require("../assets/Fashion.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
  ],
  "Faculty of Communication": [
    { 
      name: "Bsc in Professional Communication",
      description: "Minimum of 4 C grades including English grades and 2 D grades. Master the art of effective communication with our Bsc in Professional Communication. Develop essential skills in writing, public speaking, and media relations to excel in various industries. Gain practical experience through real-world projects and prepare for a successful career in communication.",
      image: require("../assets/Communication.jpg"),
      video: require("../assets/Communication.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Diploma in Public Relations",
      description: "Minimun of 3 C grades including English and 2 D grades. Master the art of strategic communication with our Diploma in Public Relations. Learn how to build and maintain a positive public image for organizations through media relations, crisis management, and effective messaging. Gain practical skills in crafting compelling narratives and managing stakeholder relationships in this dynamic field.",
      image: require("../assets/PR.jpg"),
      video: require("../assets/Public.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma Television and Film Production",
      description: "Minimun of 3 C grades including English and 2 D grades. Learn the art of storytelling through our Diploma in Television and Film Production. Gain hands-on experience in video production, editing, and directing. Explore the world of visual storytelling and prepare for a career in the dynamic field of television and film.",
      image: require("../assets/FilmTv.jpg"),
      video: require("../assets/Filming.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
  ],
  "Faculty of Tourism": [
    {
      name: "Bsc in Tourism Management",
      description: "Minimum of 4 C grades including English and 2 D grades. Explore the world of travel and hospitality with our Bsc in Tourism Management. Gain a comprehensive understanding of the tourism industry, including destination management, sustainable tourism practices, and customer service excellence. Prepare for a rewarding career in this dynamic field with hands-on experience and industry insights.",
      image: require("../assets/DegreeTourism.jpg"),
      video: require("../assets/DegreeTour.mp4"),
      duration: "4 Years",
      level: "Degree",
    },
    {
      name: "Diploma in Tourism Management",
      description: "Minimun of 3 C grades including English and 2 D grades. Embark on a journey to become a tourism industry leader with our Diploma in Tourism Management. Learn the essentials of travel planning, hospitality, and sustainable tourism practices. Gain practical skills in customer service, tour operations, and destination management to thrive in this dynamic field.",
      image: require("../assets/TourismManagement.jpg"),
      video: require("../assets/Tmanagement.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Hotel Management",
      description: "Minimun of 3 C grades including English and 2 D grades. Gain the skills to excel in the hospitality industry with our Diploma in Hotel Management. From front desk operations to housekeeping and food service, learn the essentials of running a successful hotel. Develop expertise in customer service, event planning, and hotel administration to thrive in this dynamic field.",
      image: require("../assets/HotelManagement.jpg"),
      video: require("../assets/Hotel.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
    {
      name: "Diploma in Events Management",
      description: "Minimun of 3 C grades including English and 2 D grades. Learn to plan and execute unforgettable events with our Diploma in Events Management. From corporate conferences to weddings, master the art of event planning, logistics, and coordination. Gain hands-on experience in creating memorable experiences that leave a lasting impression.",
      image: require("../assets/EventsManagement.jpg"),
      video: require("../assets/Events.mp4"),
      duration: "3 Years",
      level: "Diploma",
    },
  ],
};

export default function CourseScreen({ route, navigation }) {
  const { colors, isDark } = useContext(ThemeContext);
  const facultyName = route?.params?.facultyName || "Faculty";
  const courses = COURSES_BY_FACULTY[facultyName] || [];

  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);

  const scaleAnims = useRef({}).current;
  const fadeAnims = useRef({}).current;

  /* LOAD SAVED DATA */
  useEffect(() => {
    const loadData = async () => {
      const savedRatings = await AsyncStorage.getItem("ratings");
      const savedFavorites = await AsyncStorage.getItem("favorites");

      if (savedRatings) setRatings(JSON.parse(savedRatings));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    };
    loadData();
  }, []);

  /* FILTER */
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter((course) => {
      const name = course.name?.toLowerCase() || "";
      const desc = course.description?.toLowerCase() || "";
      return name.includes(query) || desc.includes(query);
    });
  }, [courses, search]);

  /* RATING */
  const increaseRating = async (courseKey) => {
    setRatings((prev) => {
      const current = prev[courseKey] ?? 0;
      if (current >= 6) return prev;

      const updated = { ...prev, [courseKey]: current + 1 };
      AsyncStorage.setItem("ratings", JSON.stringify(updated));
      return updated;
    });

    // Animate star
    if (scaleAnims[courseKey]) {
      Animated.sequence([
        Animated.timing(scaleAnims[courseKey], {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[courseKey], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  /* FAVORITE TOGGLE */
  const toggleFavorite = async (courseKey, courseData) => {
    // Initialize animation if needed
    if (!fadeAnims[courseKey]) {
      fadeAnims[courseKey] = new Animated.Value(1);
    }

    Animated.sequence([
      Animated.timing(fadeAnims[courseKey], {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnims[courseKey], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setFavorites((prev) => {
      const updated = { ...prev };

      if (updated[courseKey]) {
        delete updated[courseKey];
      } else {
        updated[courseKey] = courseData;
      }

      AsyncStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  /* Toggle expanded description */
  const toggleExpand = (courseKey) => {
    setExpandedCard(expandedCard === courseKey ? null : courseKey);
  };

  /* Get faculty icon based on name */
  const getFacultyIcon = () => {
    if (facultyName.includes("Information Technology")) return "laptop-code";
    if (facultyName.includes("Business")) return "briefcase";
    if (facultyName.includes("Design")) return "palette";
    if (facultyName.includes("Communication")) return "comments";
    if (facultyName.includes("Tourism")) return "car";
    return "graduation-cap";
  };

  /* Get faculty color */
  const getFacultyColor = () => {
    if (facultyName.includes("Information Technology")) return "#4169E1";
    if (facultyName.includes("Business")) return "#32CD32";
    if (facultyName.includes("Design")) return "#FF6B6B";
    if (facultyName.includes("Communication")) return "#FFA500";
    if (facultyName.includes("Tourism")) return "#9B59B6";
    return colors.accent;
  };

  const facultyColor = getFacultyColor();
  const facultyIcon = getFacultyIcon();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={isDark ? ['#1a1a1a', colors.bg] : [facultyColor + '20', colors.bg]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome5 name="arrow-left" size={18} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <View style={[styles.headerIconContainer, { backgroundColor: facultyColor + '20' }]}>
              <FontAwesome5 name={facultyIcon} size={20} color={facultyColor} solid />
            </View>
            <View>
              <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
                Faculty of
              </Text>
              <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
                {facultyName.replace("Faculty of ", "")}
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statBadge, { backgroundColor: colors.card }]}>
              <FontAwesome5 name="book-open" size={12} color={facultyColor} solid />
              <Text style={[styles.statText, { color: colors.text }]}>
                {courses.length} Courses
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <BlurView intensity={isDark ? 40 : 60} tint={isDark ? 'dark' : 'light'} style={styles.searchContainer}>
        <View style={[styles.searchWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <FontAwesome5 name="search" size={14} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search courses by name or description..."
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FontAwesome5 name="times-circle" size={16} color={colors.muted} solid />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>

      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={[styles.resultsText, { color: colors.muted }]}>
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
          </Text>
        </View>

        {/* COURSE CARDS */}
        {filteredCourses.map((course, index) => {
          const courseKey = `${facultyName}:${index}`;
          const rating = ratings[courseKey] ?? 0;
          const canRate = rating < 6;
          const isFavorite = favorites[courseKey];
          const isExpanded = expandedCard === courseKey;

          // Initialize animations
          if (!scaleAnims[courseKey]) {
            scaleAnims[courseKey] = new Animated.Value(1);
          }

          return (
            <Animated.View
              key={courseKey}
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderLeftColor: facultyColor,
                  borderLeftWidth: 4,
                }
              ]}
            >
              {/* Card Header with Image */}
              <View style={styles.cardHeader}>
                {course.image && (
                  <Image source={course.image} style={styles.cardImage} />
                )}
                
                {/* Favorite Button */}
                <TouchableOpacity
                  style={[styles.favoriteButton, { backgroundColor: colors.card + 'ee' }]}
                  onPress={() => toggleFavorite(courseKey, {
                    name: course.name,
                    description: course.description,
                    faculty: facultyName,
                  })}
                >
                  <Animated.View style={{ opacity: fadeAnims[courseKey] || 1 }}>
                    <FontAwesome
                      name={isFavorite ? "heart" : "heart-o"}
                      size={18}
                      color={isFavorite ? "#FF3B30" : colors.muted}
                    />
                  </Animated.View>
                </TouchableOpacity>

                {/* Level Badge */}
                <View style={[styles.levelBadge, { backgroundColor: facultyColor }]}>
                  <Text style={styles.levelText}>{course.level}</Text>
                </View>
              </View>

              {/* Card Body */}
              <View style={styles.cardBody}>
                <View style={styles.titleRow}>
                  <Text style={[styles.courseTitle, { color: colors.text }]}>
                    {course.name}
                  </Text>
                </View>

                {/* Duration & Type */}
                <View style={styles.courseMeta}>
                  <View style={styles.metaItem}>
                    <FontAwesome5 name="clock" size={12} color={colors.muted} solid />
                    <Text style={[styles.metaText, { color: colors.muted }]}>
                      {course.duration}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <FontAwesome5 name="graduation-cap" size={12} color={colors.muted} solid />
                    <Text style={[styles.metaText, { color: colors.muted }]}>
                      {course.level}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <TouchableOpacity onPress={() => toggleExpand(courseKey)}>
                  <Text 
                    style={[styles.description, { color: colors.muted }]}
                    numberOfLines={isExpanded ? undefined : 3}
                  >
                    {course.description}
                  </Text>
                  <Text style={[styles.readMore, { color: facultyColor }]}>
                    {isExpanded ? 'Read less' : 'Read more'}
                  </Text>
                </TouchableOpacity>

                {/* Video Player */}
                {course.video && (
                  <View style={[styles.videoContainer, { backgroundColor: colors.bg }]}>
                    <Video
                      source={course.video}
                      style={styles.video}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                    />
                  </View>
                )}

                {/* Rating Section */}
                <View style={styles.ratingSection}>
                  <View style={styles.ratingHeader}>
                    <Text style={[styles.ratingLabel, { color: colors.text }]}>
                      Course Rating
                    </Text>
                    <Text style={[styles.ratingValue, { color: facultyColor }]}>
                      {rating}/6
                    </Text>
                  </View>

                  <View style={styles.starsContainer}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Animated.View
                        key={i}
                        style={{
                          transform: [{ scale: i < rating ? (scaleAnims[courseKey] || 1) : 1 }]
                        }}
                      >
                        <FontAwesome
                          name={i < rating ? "star" : "star-o"}
                          size={24}
                          color={i < rating ? facultyColor : colors.muted}
                          style={styles.star}
                        />
                      </Animated.View>
                    ))}
                  </View>

                  <TouchableOpacity
                    onPress={() => increaseRating(courseKey)}
                    disabled={!canRate}
                  >
                    <LinearGradient
                      colors={canRate ? [facultyColor, facultyColor + 'dd'] : ['#ccc', '#aaa']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.rateButton, !canRate && styles.rateButtonDisabled]}
                    >
                      <Text style={styles.rateButtonText}>
                        {canRate ? "⭐ Rate this Course" : "✓ Maximum Rating Reached"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          );
        })}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Choose your path to success
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
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  headerGradient: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerContent: {
    paddingHorizontal: 20,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },

  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    maxWidth: width - 120,
  },

  statsContainer: {
    flexDirection: 'row',
  },

  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },

  statText: {
    fontSize: 13,
    fontWeight: '600',
  },

  searchContainer: {
    marginHorizontal: 16,
    marginTop: -25,
    marginBottom: 15,
    borderRadius: 30,
    overflow: 'hidden',
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    borderRadius: 30,
    borderWidth: 1,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },

  resultsInfo: {
    paddingHorizontal: 4,
    marginBottom: 15,
  },

  resultsText: {
    fontSize: 14,
    fontWeight: '500',
  },

  card: {
    marginBottom: 20,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  cardHeader: {
    position: 'relative',
    height: 180,
  },

  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },

  levelBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  cardBody: {
    padding: 16,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },

  courseMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  metaText: {
    fontSize: 13,
    fontWeight: '500',
  },

  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },

  readMore: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },

  videoContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
  },

  video: {
    width: '100%',
    height: 180,
  },

  ratingSection: {
    marginTop: 8,
  },

  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  ratingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },

  ratingValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },

  star: {
    marginRight: 4,
  },

  rateButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  rateButtonDisabled: {
    opacity: 0.7,
  },

  rateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
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