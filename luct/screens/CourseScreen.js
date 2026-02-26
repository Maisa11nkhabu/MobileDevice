import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import { ThemeContext } from "../theme/ThemeContext";

const COURSES_BY_FACULTY = {
  "Faculty of Information Technology": [
    {
      name: "Bsc Business Information Technology",
      description: "Minimun of 4 C grades & C or better in any financial subject.",
      image: require("../assets/BusinessTech.jpg"),
      video: require("../assets/BusinessTech.mov"),
    },
    {
      name: "Bsc in Information Technology",
      description: "Minimum of 4 C & 2 D  grades, C grade or better in Mathematics .",
      image: require("../assets/InfoTech.jpg"),
      video: require("../assets/BTech.mov"),
    },
    {
      name: "Bsc in Software Engineering With Multimedia",
      description: "Minimum of 4 C & 2 D grades, C grade or better in Mathematics.",
      image: require("../assets/SoftwareEng.jpg"),
      video: require("../assets/SoftwareEng.mov"),
    },
    {
      name: "Diploma in Business Information Technology",
      description: "Minimun of 3 C & 2 D grades, C in any financial sunject.",
      image: require("../assets/BusinessTech.jpg"),
      video: require("../assets/DiplomaBTech.mov"),
    },
    {
      name: "Diploma in Information Technology",
      description: "Minimun of 3 C & 2 D grades, C in mathematics.",
      image: require("../assets/InfoTech.jpg"),
      video: require("../assets/InfoTech.mov"),
    },
    {
      name: "Diploma in Software Engineering",
      description: "Minimum of 3 C & 2 D grades, C in Mathematics.",
      image: require("../assets/SoftwareEng.jpg"),
      video: require("../assets/SoftwareEng.mov"),
    },
  ],
  "Faculty of Business": [
    {
      name: "Bsc In Human Resource Management",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject.",
      image: require("../assets/BusinessAdmin.jpg"),
      video: require("../assets/Administration.mov"),
    },
    {
      name: "Bsc in International Business",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject.",
      image: require("../assets/IntBusiness.jpg"),
      video: require("../assets/International.mov"),
    },
    {
      name: "Bsc in Entrepreneurship",
      description: "Minimun of 4 C grades maths included with at least a C in a commercial subject.",
      image: require("../assets/Entrepre.jpg"),
      video: require("../assets/Entrepe.mov"),
    },
    {
      name: "Diploma in Business Management",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject",
      image: require("../assets/BusinessM.jpg"),
      video: require("../assets/Bmanagement.mov"),
    },
    {
      name: "Diploma in Retail Management",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject",
      image: require("../assets/Retail.jpg"),
      video: require("../assets/Retail.mov"),
    },
    {
      name: "Diploma in Marketing",
      description: "Minimun of 3 C grades English included with at lease a C in a commercial subject",
      image: require("../assets/Marketing.jpg"),
      video: require("../assets/DMarketing.mov"),
    },
  ],
  "Faculty of Design": [
    { name: "Diploma in Creative Advertising",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design.",
      image: require("../assets/Advert.jpg"),
      video: require("../assets/Advert.mov"),
    },
    {
      name: "Diploma in Graphic Design",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design.",
      image: require("../assets/Design.jpg"),
      video: require("../assets/Graphic.mov"),
    },
    {
      name: "Diploma in Fashion and Apparel Design.",
      description: "Minimum of 3 C & 2 D grades including a C in Art or Design.",
      image: require("../assets/Apparel.jpg"),
      video: require("../assets/Fashion.mov"),
    },
  ],
  "Faculty of Communication": [
    { name: "Bsc in Professional Communication",
    description: "Minimum of 4 C grades including English grades and 2 D grades.",
    image: require("../assets/Communication.jpg"),
    video: require("../assets/Communication.mov"),
  },
    {
      name: "Diploma in Public Relations",
      description: "Minimun of 3 C grades including English and 2 D grades.",
      image: require("../assets/PR.jpg"),
      video: require("../assets/Public.mov"),
    },
    {
      name: "Diploma Television and Film Production",
      description: "Minimun of 3 C grades including English and 2 D grades.",
      image: require("../assets/FilmTv.jpg"),
      video: require("../assets/Filming.mov"),
    },
  ],
  "Faculty of Tourism": [
    {
      name: "Bsc in Tourism Management",
      description: "Minimum of 4 C grades including English and 2 D grades.",
      image: require("../assets/DegreeTourism.jpg"),
      video: require("../assets/DegreeTour.mov"),
    },
    {
      name: "Diploma in Tourism Management",
      description: "Minimun of 3 C grades including English and 2 D grades.",
      image: require("../assets/TourismManagement.jpg"),
      video: require("../assets/Tmanagement.mov"),
    },
    {
      name: "Diploma in Hotel Management",
      description: "Minimun of 3 C grades including English and 2 D grades.",
      image: require("../assets/HotelManagement.jpg"),
      video: require("../assets/Hotel.mov"),
    },
    {
      name: "Diploma in Events Management",
      description: "Minimun of 3 C grades including English and 2 D grades.",
      image: require("../assets/EventsManagement.jpg"),
      video: require("../assets/Events.mov"),
    },
  ],
};

export default function CourseScreen({ route }) {
  const { colors } = useContext(ThemeContext);
  const facultyName = route?.params?.facultyName || "Faculty";
  const courses = COURSES_BY_FACULTY[facultyName] || [
    { name: "No courses", description: "Courses for this faculty are not yet listed." },
  ];

  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return courses;
    return courses.filter((course) => {
      const name = course.name?.toLowerCase() || "";
      const desc = course.description?.toLowerCase() || "";
      return name.includes(query) || desc.includes(query);
    });
  }, [courses, search]);

  const increaseRating = (courseKey) => {
    setRatings((prev) => {
      const current = prev[courseKey] ?? 0;
      if (current >= 6) return prev;
      return { ...prev, [courseKey]: current + 1 };
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.content}>
        <View style={[styles.headerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{facultyName}</Text>

          <View style={[styles.searchRow, { backgroundColor: colors.bg }]}>
            <FontAwesome name="search" size={16} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search courses..."
              placeholderTextColor={colors.muted}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <FontAwesome name="times-circle" size={16} color={colors.muted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {filteredCourses.map((course, index) => {
          const courseKey = `${facultyName}:${index}`;
          const rating = ratings[courseKey] ?? 0;
          const canRate = rating < 6;

          return (
            <View key={courseKey} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {course.image ? (
                <Image source={course.image} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <FontAwesome name="graduation-cap" size={28} color={colors.muted} />
                  <Text style={[styles.imagePlaceholderText, { color: colors.muted }]}>No image</Text>
                </View>
              )}
              <View style={styles.cardBody}>
                <Text style={[styles.title, { color: colors.text }]}>{course.name}</Text>
                <Text style={[styles.description, { color: colors.muted }]}>{course.description}</Text>

                {course.video && (
                  <View style={styles.videoWrap}>
                    <Video source={course.video} style={styles.video} useNativeControls resizeMode="contain" />
                  </View>
                )}

                <View style={styles.ratingRow}>
                  <Text style={[styles.ratingLabel, { color: colors.text }]}>Rating</Text>
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
                  <Text style={[styles.ratingValue, { color: colors.text }]}>{rating}/6</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => increaseRating(courseKey)}
                  disabled={!canRate}
                  style={[styles.primaryButton, !canRate && styles.primaryButtonDisabled]}
                >
                  <Text style={[styles.primaryButtonText, !canRate && styles.primaryButtonTextDisabled]}>
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

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 28 },
  headerCard: { borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
  headerTitle: { fontSize: 22, fontWeight: "800", letterSpacing: 0.2 },
  searchRow: { marginTop: 12, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999 },
  searchInput: { flex: 1, fontSize: 13, paddingVertical: 0 },
  card: { marginBottom: 14, borderRadius: 16, borderWidth: 1, overflow: Platform.OS === "android" ? "hidden" : "visible", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 2 },
  cardBody: { padding: 14 },
  title: { fontSize: 17, fontWeight: "800", letterSpacing: 0.2 },
  description: { marginTop: 6, fontSize: 13.5, lineHeight: 19 },
  image: { width: "100%", height: 170 },
  imagePlaceholder: { width: "100%", height: 170, alignItems: "center", justifyContent: "center", gap: 6 },
  imagePlaceholderText: { fontWeight: "600" },
  videoWrap: { marginTop: 12, borderRadius: 14, overflow: "hidden", backgroundColor: "black" },
  video: { width: "100%", height: 190 },
  ratingRow: { marginTop: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  ratingLabel: { fontSize: 13, fontWeight: "700" },
  stars: { flexDirection: "row", alignItems: "center" },
  star: { marginRight: 4 },
  ratingValue: { marginLeft: "auto", fontSize: 13, fontWeight: "800" },
  primaryButton: { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: "center", backgroundColor: "lightblue"},
  primaryButtonDisabled: { backgroundColor: "lightsteelblue" },
  primaryButtonText: { fontSize: 14, fontWeight: "800", letterSpacing: 0.2 },
  primaryButtonTextDisabled: { color: "darkblue" },
});