import React, { useState, useContext, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ThemeContext } from "../theme/ThemeContext";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const QUESTIONS = [
  {
    id: "interest",
    question: "Which area sparks your passion?",
    options: [
      { 
        label: "Technology", 
        icon: "laptop-code", 
        description: "Code, innovate, build the future",
        color: "#4169E1"
      },
      { 
        label: "Business", 
        icon: "briefcase", 
        description: "Lead, manage, create value",
        color: "#32CD32"
      },
      { 
        label: "Design", 
        icon: "palette", 
        description: "Create, visualize, inspire",
        color: "#FF6B6B"
      },
      { 
        label: "Communication", 
        icon: "comments", 
        description: "Connect, influence, share stories",
        color: "#FFA500"
      },
      { 
        label: "Tourism", 
        icon: "car", 
        description: "Explore, host, create experiences",
        color: "#9B59B6"
      },
    ],
  },
  {
    id: "math",
    question: "How would you rate your math skills?",
    options: [
      { 
        label: "Strong", 
        icon: "rocket", 
        description: "I love numbers and problem-solving",
        color: "#4169E1"
      },
      { 
        label: "Average", 
        icon: "balance-scale", 
        description: "I can handle basic calculations",
        color: "#FFA500"
      },
      { 
        label: "Weak", 
        icon: "seedling", 
        description: "I prefer creative over analytical",
        color: "#32CD32"
      },
    ],
  },
  {
    id: "creative",
    question: "Do you enjoy creative activities?",
    options: [
      { 
        label: "Yes", 
        icon: "palette", 
        description: "I love expressing myself creatively",
        color: "#FF6B6B"
      },
      { 
        label: "Sometimes", 
        icon: "adjust", 
        description: "I enjoy a mix of both worlds",
        color: "#FFA500"
      },
      { 
        label: "No", 
        icon: "cogs", 
        description: "I prefer structured, logical tasks",
        color: "#4169E1"
      },
    ],
  },
];

function recommendCourse(answers) {
  if (answers.interest === "Technology" && answers.math === "Strong") {
    return {
      name: "BSc in Software Engineering With Multimedia",
      faculty: "Information Technology",
      level: "Degree",
      duration: "3 Years",
      icon: "laptop-code",
      color: "#4169E1",
      description: "Perfect match! Your strong math skills and interest in technology make this ideal."
    };
  }

  if (answers.interest === "Business") {
    return {
      name: "BSc in International Business",
      faculty: "Business",
      level: "Degree",
      duration: "3 Years",
      icon: "briefcase",
      color: "#32CD32",
      description: "Your business interest aligns perfectly with global opportunities."
    };
  }

  if (answers.interest === "Design" && answers.creative !== "No") {
    return {
      name: "Diploma in Graphic Design",
      faculty: "Design",
      level: "Diploma",
      duration: "2 Years",
      icon: "palette",
      color: "#FF6B6B",
      description: "Your creative spirit will flourish in our design program."
    };
  }

  if (answers.interest === "Communication") {
    return {
      name: "BSc in Professional Communication",
      faculty: "Communication",
      level: "Degree",
      duration: "3 Years",
      icon: "comments",
      color: "#FFA500",
      description: "Your communication skills will be honed to professional excellence."
    };
  }

  if (answers.interest === "Tourism") {
    return {
      name: "Diploma in Tourism Management",
      faculty: "Tourism",
      level: "Diploma",
      duration: "2 Years",
      icon: "car",
      color: "#9B59B6",
      description: "Turn your passion for travel into a rewarding career."
    };
  }

  return {
    name: "BSc Business Information Technology",
    faculty: "Information Technology",
    level: "Degree",
    duration: "3 Years",
    icon: "laptop-code",
    color: "#4169E1",
    description: "A balanced program combining business and technology."
  };
}

export default function RecommendationScreen({ navigation }) {
  const { colors, isDark } = useContext(ThemeContext);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const question = QUESTIONS[step];
  const progress = (step + 1) / QUESTIONS.length;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const result = useMemo(() => {
    if (!finished) return null;
    return recommendCourse(answers);
  }, [finished, answers]);

  const selectOption = (option) => {
    setSelectedOption(option.label);
    
    // Animate selection
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Update answer
    const updated = { ...answers, [question.id]: option.label };
    setAnswers(updated);

    // Move to next question or finish
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        // Animate transition
        Animated.sequence([
          Animated.timing(slideAnim, {
            toValue: -width,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: width,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        
        setStep(step + 1);
        setSelectedOption(null);
      } else {
        // Animate to result
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setFinished(true);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      }
    }, 300);
  };

  const restartQuiz = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep(0);
      setAnswers({});
      setFinished(false);
      setSelectedOption(null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  /* Result Screen */
  if (finished && result) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <LinearGradient
          colors={[result.color + '20', colors.bg]}
          style={StyleSheet.absoluteFill}
        />
        
        <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
          {/* Decorative Circle */}
          <View style={[styles.resultCircle, { backgroundColor: result.color + '20' }]}>
            <View style={[styles.resultIconContainer, { backgroundColor: result.color }]}>
              <FontAwesome5
                name={result.icon}
                size={40}
                color="#FFF"
                solid
              />
            </View>
          </View>

          <Text style={[styles.resultBadge, { backgroundColor: result.color + '20', color: result.color }]}>
            Your Perfect Match
          </Text>

          <Text style={[styles.resultTitle, { color: colors.text }]}>
            {result.name}
          </Text>

          <View style={styles.resultMeta}>
            <View style={[styles.metaBadge, { backgroundColor: colors.card }]}>
              <FontAwesome5 name="graduation-cap" size={12} color={result.color} solid />
              <Text style={[styles.metaText, { color: colors.text }]}>{result.level}</Text>
            </View>
            <View style={[styles.metaBadge, { backgroundColor: colors.card }]}>
              <FontAwesome5 name="clock" size={12} color={result.color} solid />
              <Text style={[styles.metaText, { color: colors.text }]}>{result.duration}</Text>
            </View>
            <View style={[styles.metaBadge, { backgroundColor: colors.card }]}>
              <FontAwesome5 name="university" size={12} color={result.color} solid />
              <Text style={[styles.metaText, { color: colors.text }]}>{result.faculty}</Text>
            </View>
          </View>

          <Text style={[styles.resultDescription, { color: colors.muted }]}>
            {result.description}
          </Text>

          <View style={styles.resultActions}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: result.color }]}
              onPress={() => navigation.navigate("Faculty")}
            >
              <Text style={styles.primaryButtonText}>Explore Faculty</Text>
              <FontAwesome5 name="arrow-right" size={14} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.border }]}
              onPress={restartQuiz}
            >
              <FontAwesome5 name="redo" size={14} color={colors.text} />
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                Take Quiz Again
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }

  /* Question Screen */
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <LinearGradient
        colors={isDark ? ['#1a1a1a', colors.bg] : ['#f0f0f0', colors.bg]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome5 name="arrow-left" size={18} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <Animated.View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: colors.accent,
                    width: progressWidth 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: colors.muted }]}>
              {step + 1}/{QUESTIONS.length}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          }
        ]}
      >
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={[styles.question, { color: colors.text }]}>
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.label;
            const delay = index * 100;

            return (
              <Animated.View
                key={option.label}
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
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => selectOption(option)}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isSelected ? option.color : colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    }
                  ]}
                >
                  <View style={styles.optionContent}>
                    <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                      <FontAwesome5
                        name={option.icon}
                        size={20}
                        color={option.color}
                        solid
                      />
                    </View>
                    
                    <View style={styles.optionTextContainer}>
                      <Text style={[styles.optionLabel, { color: colors.text }]}>
                        {option.label}
                      </Text>
                      <Text style={[styles.optionDescription, { color: colors.muted }]}>
                        {option.description}
                      </Text>
                    </View>

                    {isSelected && (
                      <View style={[styles.checkmark, { backgroundColor: option.color }]}>
                        <FontAwesome5 name="check" size={12} color="#FFF" solid />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Motivational Quote */}
        <BlurView intensity={isDark ? 40 : 60} tint={isDark ? 'dark' : 'light'} style={styles.quoteContainer}>
          <Text style={[styles.quoteText, { color: colors.muted }]}>
            "Find the path that excites your curiosity and fuels your passion."
          </Text>
        </BlurView>
      </Animated.View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  questionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },

  question: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
  },

  optionsContainer: {
    gap: 12,
  },

  optionCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 15,
  },

  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionTextContainer: {
    flex: 1,
  },

  optionLabel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  optionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },

  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quoteContainer: {
    marginTop: 40,
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },

  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Result Screen Styles
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  resultCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  resultIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  resultBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    overflow: 'hidden',
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  resultMeta: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },

  metaText: {
    fontSize: 12,
    fontWeight: '600',
  },

  resultDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  resultActions: {
    width: '100%',
    gap: 12,
  },

  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});