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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../theme/ThemeContext";

const COURSES_BY_FACULTY = {
  "Faculty of Information Technology": [
    {
      name: "Bsc Business Information Technology",
      description: "Minimun of 4 C grades & C or better in any financial subject. Learn the essentials of business information technology with our Bsc Business Information Technology. Gain practical skills in IT management, business analytics, and digital transformation to excel in the dynamic intersection of business and technology. Prepare for a successful career in this evolving field with hands-on experience and industry insights.",
      image: require("../assets/BusinessTech.jpg"),
      video: require("../assets/BusinessTech.mp4"),
    },
    {
      name: "Bsc in Information Technology",
      description: "Minimum of 4 C & 2 D  grades, C grade or better in Mathematics. Learn the essentials of information technology with our Bsc in Information Technology. Gain practical skills in programming, networking, and database management to excel in the dynamic field of IT. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/InfoTech.jpg"),
      video: require("../assets/BTech.mp4"),
    },
    {
      name: "Bsc in Software Engineering With Multimedia",
      description: "Minimum of 4 C & 2 D grades, C grade or better in Mathematics. Learn the fundamentals of software development and multimedia integration with our Bsc in Software Engineering With Multimedia. Gain practical skills in programming, software design, and multimedia production to excel in the dynamic field of software engineering. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/SoftwareEng.jpg"),
      video: require("../assets/SoftwareEng.mp4"),
    },
    {
      name: "Diploma in Business Information Technology",
      description: "Minimun of 3 C & 2 D grades, C in any financial sunject. Learn the essentials of business information technology with our Diploma in Business Information Technology. Gain practical skills in IT management, business analytics, and digital transformation to excel in the dynamic intersection of business and technology. Prepare for a successful career in this evolving field with hands-on experience and industry insights.",
      image: require("../assets/BusinessTech.jpg"),
      video: require("../assets/DiplomaBTech.mp4"),
    },
    {
      name: "Diploma in Information Technology",
      description: "Minimun of 3 C & 2 D grades, C in mathematics. Learn the essentials of information technology with our Diploma in Information Technology. Gain practical skills in programming, networking, and database management to excel in the dynamic field of IT. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/InfoTech.jpg"),
      video: require("../assets/InfoTech.mp4"),
    },
    {
      name: "Diploma in Software Engineering",
      description: "Minimum of 3 C & 2 D grades, C in Mathematics. Learn the fundamentals of software development with our Diploma in Software Engineering. Gain practical skills in programming, software design, and project management to excel in the dynamic field of software engineering. Prepare for a successful career in technology with hands-on experience and industry insights.",
      image: require("../assets/SoftwareEng.jpg"),
      video: require("../assets/SoftwareEng.mp4"),
    },
  ],
  "Faculty of Business": [
    {
      name: "Bsc In Human Resource Management",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject. Learn the essentials of human resource management with our Bsc in Human Resource Management. Gain practical skills in recruitment, training, and employee relations to excel in the dynamic field of HR. Prepare for a successful career in human resources with hands-on experience and industry insights.",
      image: require("../assets/BusinessAdmin.jpg"),
      video: require("../assets/Administration.mp4"),
    },
    {
      name: "Bsc in International Business",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject. Learn the fundamentals of international business with our Bsc in International Business. Gain practical skills in global markets, cross-cultural communication, and international trade strategies. Prepare for a successful career in the dynamic field of international business with hands-on experience and industry insights.",
      image: require("../assets/IntBusiness.jpg"),
      video: require("../assets/International.mp4"),
    },
    {
      name: "Bsc in Entrepreneurship",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject. Learn the essentials of entrepreneurship with our Bsc in Entrepreneurship. Gain practical skills in business planning, innovation, and startup management to turn your ideas into successful ventures. Prepare for a rewarding career as an entrepreneur with hands-on experience and industry insights.",
      image: require("../assets/Entrepre.jpg"),
      video: require("../assets/Entrepe.mp4"),
    },
    {
      name: "Diploma in Business Management",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject. Learn the essentials of business management with our Diploma in Business Management. Gain practical skills in leadership, strategic planning, and organizational behavior to excel in the dynamic world of business. Prepare for a successful career in management with hands-on experience and industry insights.",
      image: require("../assets/BusinessM.jpg"),
      video: require("../assets/Bmanagement.mp4"),
    },
    {
      name: "Diploma in Retail Management",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject. Learn the essentials of retail management with our Diploma in Retail Management. Gain practical skills in inventory control, customer service, and sales strategies to excel in the dynamic retail industry. Prepare for a successful career in retail with hands-on experience and industry insights.",
      image: require("../assets/Retail.jpg"),
      video: require("../assets/Retail.mp4"),
    },
    {
      name: "Diploma in Marketing",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject. Learn the fundamentals of marketing with our Diploma in Marketing. Gain practical skills in market research, branding, and digital marketing strategies. Prepare for a successful career in the dynamic field of marketing with hands-on experience and industry insights.",
      image: require("../assets/Marketing.jpg"),
      video: require("../assets/DMarketing.mp4"),
    },
  ],
  "Faculty of Design": [
    { name: "Diploma in Creative Advertising",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design. Unleash your creativity with our Diploma in Creative Advertising. Learn the fundamentals of advertising, copywriting, and campaign development. Gain hands-on experience in creating compelling ad campaigns that captivate audiences across various media platforms.",
      image: require("../assets/Advert.jpg"),
      video: require("../assets/Advert.mp4"),
    },
    {
      name: "Diploma in Graphic Design",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design. Unleash your creativity with our Diploma in Graphic Design. Learn the fundamentals of visual communication, typography, and layout design. Gain hands-on experience with industry-standard software to create stunning graphics for print and digital media.",
      image: require("../assets/Design.jpg"),
      video: require("../assets/Graphic.mp4"),
    },
    {
      name: "Diploma in Fashion and Apparel Design.",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design. Learn the fundamentals of fashion design and apparel production with our Diploma in Fashion and Apparel Design. Gain hands-on experience in sketching, pattern making, and garment construction to build a successful career in the fashion industry.",
      image: require("../assets/Apparel.jpg"),
      video: require("../assets/Fashion.mp4"),
    },
  ],
  "Faculty of Communication": [
    { name: "Bsc in Professional Communication",
    description: "Minimum of 4 C grades including English grades and 2 D grades. Master the art of effective communication with our Bsc in Professional Communication. Develop essential skills in writing, public speaking, and media relations to excel in various industries. Gain practical experience through real-world projects and prepare for a successful career in communication.",
    image: require("../assets/Communication.jpg"),
    video: require("../assets/Communication.mp4"),
  },
    {
      name: "Diploma in Public Relations",
      description: "Minimun of 3 C grades including English and 2 D grades. Master the art of strategic communication with our Diploma in Public Relations. Learn how to build and maintain a positive public image for organizations through media relations, crisis management, and effective messaging. Gain practical skills in crafting compelling narratives and managing stakeholder relationships in this dynamic field.",
      image: require("../assets/PR.jpg"),
      video: require("../assets/Public.mp4"),
    },
    {
      name: "Diploma Television and Film Production",
      description: "Minimun of 3 C grades including English and 2 D grades. Learn the art of storytelling through our Diploma in Television and Film Production. Gain hands-on experience in video production, editing, and directing. Explore the world of visual storytelling and prepare for a career in the dynamic field of television and film.",
      image: require("../assets/FilmTv.jpg"),
      video: require("../assets/Filming.mp4"),
    },
  ],
  "Faculty of Tourism": [
    {
      name: "Bsc in Tourism Management",
      description: "Minimum of 4 C grades including English and 2 D grades. Explore the world of travel and hospitality with our Bsc in Tourism Management. Gain a comprehensive understanding of the tourism industry, including destination management, sustainable tourism practices, and customer service excellence. Prepare for a rewarding career in this dynamic field with hands-on experience and industry insights.",
      image: require("../assets/DegreeTourism.jpg"),
      video: require("../assets/DegreeTour.mp4"),
    },
    {
      name: "Diploma in Tourism Management",
      description: "Minimun of 3 C grades including English and 2 D grades. Embark on a journey to become a tourism industry leader with our Diploma in Tourism Management. Learn the essentials of travel planning, hospitality, and sustainable tourism practices. Gain practical skills in customer service, tour operations, and destination management to thrive in this dynamic field.",
      image: require("../assets/TourismManagement.jpg"),
      video: require("../assets/Tmanagement.mp4"),
    },
    {
      name: "Diploma in Hotel Management",
      description: "Minimun of 3 C grades including English and 2 D grades. Gain the skills to excel in the hospitality industry with our Diploma in Hotel Management. From front desk operations to housekeeping and food service, learn the essentials of running a successful hotel. Develop expertise in customer service, event planning, and hotel administration to thrive in this dynamic field.",
      image: require("../assets/HotelManagement.jpg"),
      video: require("../assets/Hotel.mp4"),
    },
    {
      name: "Diploma in Events Management",
      description: "Minimun of 3 C grades including English and 2 D grades. Learn to plan and execute unforgettable events with our Diploma in Events Management. From corporate conferences to weddings, master the art of event planning, logistics, and coordination. Gain hands-on experience in creating memorable experiences that leave a lasting impression.",
      image: require("../assets/EventsManagement.jpg"),
      video: require("../assets/Events.mp4"),
    },
  ],
};


export default function CourseScreen({ route }) {
  const { colors } = useContext(ThemeContext);
  const facultyName = route?.params?.facultyName || "Faculty";
  const courses = COURSES_BY_FACULTY[facultyName] || [];

  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState({});

  const scaleAnim = useRef(new Animated.Value(1)).current;

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
  };

  /* FAVORITE TOGGLE WITH ANIMATION */
  const toggleFavorite = async (courseKey, courseData) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.bg }]}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View
          style={[
            styles.headerCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {facultyName}
          </Text>

          <View style={[styles.searchRow, { backgroundColor: colors.bg }]}>
            <FontAwesome name="search" size={16} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search courses..."
              placeholderTextColor={colors.muted}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* COURSE CARDS */}
        {filteredCourses.map((course, index) => {
          const courseKey = `${facultyName}:${index}`;
          const rating = ratings[courseKey] ?? 0;
          const canRate = rating < 6;
          const isFavorite = favorites[courseKey];

          return (
            <View
              key={courseKey}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              {/* HEART */}
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() =>
                  toggleFavorite(courseKey, {
                    name: course.name,
                    description: course.description,
                  })
                }
              >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={22}
                    color={isFavorite ? "red" : colors.muted}
                  />
                </Animated.View>
              </TouchableOpacity>

              {course.image && (
                <Image source={course.image} style={styles.image} />
              )}

              <View style={styles.cardBody}>
                <Text style={[styles.title, { color: colors.text }]}>
                  {course.name}
                </Text>
                <Text style={[styles.description, { color: colors.muted }]}>
                  {course.description}
                </Text>

                {course.video && (
                  <View style={styles.videoWrap}>
                    <Video
                      source={course.video}
                      style={styles.video}
                      useNativeControls
                      resizeMode="contain"
                    />
                  </View>
                )}

                <View style={styles.ratingRow}>
                  <Text style={{ color: colors.text }}>Rating</Text>
                  <View style={styles.stars}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <FontAwesome
                        key={i}
                        name={i < rating ? "star" : "star-o"}
                        size={16}
                        color={i < rating ? colors.accent : colors.muted}
                        style={styles.star}
                      />
                    ))}
                  </View>
                  <Text style={{ marginLeft: "auto", color: colors.text }}>
                    {rating}/6
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => increaseRating(courseKey)}
                  disabled={!canRate}
                  style={[
                    styles.primaryButton,
                    !canRate && styles.primaryButtonDisabled,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>
                    {canRate ? "Rate course" : "Max rating reached"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 28 },

  headerCard: { borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1 },
  headerTitle: { fontSize: 22, fontWeight: "800" },
  searchRow: { marginTop: 12, flexDirection: "row", alignItems: "center" },
  searchInput: { flex: 1, marginLeft: 8 },

  card: { marginBottom: 14, borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  heartIcon: { position: "absolute", top: 12, right: 12, zIndex: 10 },
  image: { width: "100%", height: 170 },
  cardBody: { padding: 14 },

  title: { fontSize: 17, fontWeight: "800" },
  description: { marginTop: 6 },

  videoWrap: { marginTop: 12, borderRadius: 14, overflow: "hidden" },
  video: { width: "100%", height: 190 },

  ratingRow: { marginTop: 12, flexDirection: "row", alignItems: "center" },
  stars: { flexDirection: "row", marginLeft: 10 },
  star: { marginRight: 4 },

  primaryButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  primaryButtonDisabled: { backgroundColor: "lightsteelblue" },
  primaryButtonText: { fontWeight: "bold" },
});