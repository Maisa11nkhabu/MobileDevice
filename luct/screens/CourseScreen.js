import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";

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

  const courseCountLabel = useMemo(() => {
    const total = courses.length;
    const visible = filteredCourses.length;
    if (!search.trim()) {
      return `${total} course${total === 1 ? "" : "s"}`;
    }
    return `${visible} of ${total} course${total === 1 ? "" : "s"} found`;
  }, [courses.length, filteredCourses.length, search]);

  const increaseRating = (courseKey) => {
    setRatings((prev) => {
      const current = prev[courseKey] ?? 0;
      if (current >= 6) return prev;
      return { ...prev, [courseKey]: current + 1 };
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>{facultyName}</Text>

          <View style={styles.searchRow}>
            <FontAwesome
              name="search"
              size={16}
              color={stylesVars.muted}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              placeholderTextColor={stylesVars.muted}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
                <FontAwesome name="times-circle" size={16} color={stylesVars.muted} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.headerMetaRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{courseCountLabel}</Text>
            </View>
            <Text style={styles.headerSubtitle}>Tap “Rate course” to add a star</Text>
          </View>
        </View>

        {filteredCourses.map((course, index) => {
          const courseKey = `${facultyName}:${index}`;
          const rating = ratings[courseKey] ?? 0;
          const canRate = rating < 6;

          return (
            <View key={courseKey} style={styles.card}>
              {course.image ? (
                <Image source={course.image} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <FontAwesome name="graduation-cap" size={28} color={stylesVars.muted} />
                  <Text style={styles.imagePlaceholderText}>No image</Text>
                </View>
              )}

              <View style={styles.cardBody}>
                <Text style={styles.title}>{course.name}</Text>
                <Text style={styles.description}>{course.description}</Text>

                {course.video ? (
                  <View style={styles.videoWrap}>
                    <Video
                      source={course.video}
                      style={styles.video}
                      useNativeControls
                      resizeMode="contain"
                    />
                  </View>
                ) : null}

                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>Rating</Text>
                  <View style={styles.stars}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <FontAwesome
                        key={i}
                        name={i < rating ? "star" : "star-o"}
                        size={16}
                        color={i < rating ? stylesVars.accent : stylesVars.muted}
                        style={styles.star}
                      />
                    ))}
                  </View>
                  <Text style={styles.ratingValue}>
                    {rating}/6
                  </Text>
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

const stylesVars = {
  bg: "whitesmoke",
  card: "white",
  text: "black",
  muted: "slategray",
  accent: "royalblue",
  border: "lightgray",
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: stylesVars.bg },
  container: { flex: 1, backgroundColor: stylesVars.bg },
  content: { padding: 16, paddingBottom: 28 },
  headerCard: {
    backgroundColor: stylesVars.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: stylesVars.border,
    shadowColor: "black",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: stylesVars.text,
    letterSpacing: 0.2,
  },
  headerMetaRow: {
    marginTop: 10,
    gap: 10,
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    color: stylesVars.accent,
    fontWeight: "700",
    fontSize: 12,
  },
  headerSubtitle: {
    color: stylesVars.muted,
    fontSize: 13,
  },
  searchRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "whitesmoke",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: stylesVars.text,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 6,
  },
  card: {
    backgroundColor: stylesVars.card,
    marginBottom: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: stylesVars.border,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  cardBody: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: stylesVars.text,
    letterSpacing: 0.2,
  },
  description: {
    marginTop: 6,
    color: stylesVars.muted,
    fontSize: 13.5,
    lineHeight: 19,
  },
  image: {
    width: "100%",
    height: 170,
  },
  imagePlaceholder: {
    width: "100%",
    height: 170,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  imagePlaceholderText: {
    color: stylesVars.muted,
    fontWeight: "600",
  },
  videoWrap: {
    marginTop: 12,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: 190,
  },
  ratingRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingLabel: {
    fontSize: 13,
    color: stylesVars.text,
    fontWeight: "700",
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 4,
  },
  ratingValue: {
    marginLeft: "auto",
    fontSize: 13,
    fontWeight: "800",
    color: stylesVars.text,
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: stylesVars.accent,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "lightsteelblue",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  primaryButtonTextDisabled: {
    color: "darkblue",
  },
});
