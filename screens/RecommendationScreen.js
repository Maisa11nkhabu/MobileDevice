import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { FontAwesome5 } from "@expo/vector-icons";

const QUESTIONS = [
  {
    id: "interest",
    question: "Which area interests you the most?",
    options: [
      "Technology",
      "Business",
      "Design",
      "Communication",
      "Tourism",
    ],
  },
  {
    id: "math",
    question: "How strong are you in Mathematics?",
    options: ["Strong", "Average", "Weak"],
  },
  {
    id: "creative",
    question: "Do you enjoy creative activities?",
    options: ["Yes", "Sometimes", "No"],
  },
];

/* ---------------- RECOMMENDATION LOGIC ---------------- */

function recommendCourse(answers) {
  if (answers.interest === "Technology" && answers.math === "Strong") {
    return "BSc in Software Engineering With Multimedia";
  }

  if (answers.interest === "Business") {
    return "BSc in International Business";
  }

  if (answers.interest === "Design" && answers.creative !== "No") {
    return "Diploma in Graphic Design";
  }

  if (answers.interest === "Communication") {
    return "BSc in Professional Communication";
  }

  if (answers.interest === "Tourism") {
    return "Diploma in Tourism Management";
  }

  return "BSc Business Information Technology";
}

/* ---------------- SCREEN ---------------- */

export default function RecommendationScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[step];

  const result = useMemo(() => {
    if (!finished) return null;
    return recommendCourse(answers);
  }, [finished, answers]);

  /* ---------- HANDLE ANSWER ---------- */

  const selectOption = (option) => {
    const updated = { ...answers, [question.id]: option };
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  /* ---------- RESULT SCREEN ---------- */

  if (finished) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.bg }]}
      >
        <View style={styles.center}>
          <FontAwesome5
            name="graduation-cap"
            size={60}
            color={colors.accent}
          />

          <Text style={[styles.resultTitle, { color: colors.text }]}>
            Recommended Course
          </Text>

          <Text style={[styles.resultCourse, { color: colors.accent }]}>
            {result}
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.accent },
            ]}
            onPress={() => navigation.navigate("Faculty")}
          >
            <Text style={styles.buttonText}>Back to Faculties</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* ---------- QUESTION SCREEN ---------- */

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.bg }]}
    >
      <View style={styles.container}>
        {/* Progress */}
        <Text style={{ color: colors.muted }}>
          Question {step + 1} of {QUESTIONS.length}
        </Text>

        {/* Question */}
        <Text style={[styles.question, { color: colors.text }]}>
          {question.question}
        </Text>

        {/* Options */}
        {question.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => selectOption(option)}
          >
            <Text style={{ color: colors.text }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  question: {
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 20,
  },

  option: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 20,
  },

  resultCourse: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 14,
    textAlign: "center",
  },

  button: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "800",
  },
});