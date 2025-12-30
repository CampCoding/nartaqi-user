import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Exam info
  examId: null,
  studentId: null,
  examData: null,

  // Questions (transformed)
  questions: [],

  // User progress
  currentIndex: 0,

  // Answers in API format
  answers: [], // Array of { question_id, type, student_answer, correct_answer, is_correct }

  // Helper maps for UI
  answeredMap: {}, // { [questionId]: optionId } - for UI only (keeps ID for selection state)
  flaggedMap: {}, // { [index]: true/false }

  // State
  isStarted: false,
  isSubmitted: false,
  startTime: null,
  endTime: null,

  // Results
  score: null,
  percentage: null,
  resultData: null,
};

// Helper function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },

    setExamId: (state, action) => {
      state.examId = action.payload;
    },

    setExamData: (state, action) => {
      const data = action.payload;
      state.examData = data;

      const allQuestions = [];

      if (Array.isArray(data)) {
        data.forEach((section) => {
          // MCQ questions
          section.mcq?.forEach((question) => {
            // ✅ Find correct option
            const correctOption = question.options?.find(
              (opt) => opt.is_correct === 1
            );

            allQuestions.push({
              id: question.id,
              type: "mcq",
              text: stripHtml(question.question_text),
              textHtml: question.question_text,
              instructions: question.instructions,
              imageUrl: question.image_url || undefined,
              sectionId: section.id,
              sectionTitle: stripHtml(section.title),
              options:
                question.options?.map((opt) => ({
                  id: opt.id,
                  label: stripHtml(opt.option_text),
                  labelHtml: opt.option_text,
                  isCorrect: opt.is_correct === 1,
                  explanation: stripHtml(opt.question_explanation),
                  explanationHtml: opt.question_explanation,
                })) || [],
              // ✅ Store correct answer ID for UI comparison
              correctAnswerId: correctOption?.id || null,
              // ✅ Store correct answer TEXT for API submission
              correctAnswerText: stripHtml(correctOption?.option_text) || null,
            });
          });

          // Boolean questions
          section.boolean?.forEach((question) => {
            allQuestions.push({
              id: question.id,
              type: "boolean",
              text: stripHtml(question.question_text),
              textHtml: question.question_text,
              instructions: question.instructions,
              imageUrl: question.image_url || undefined,
              sectionId: section.id,
              sectionTitle: stripHtml(section.title),
              correctAnswer: question.correct_answer,
            });
          });

          // Text/Paragraph questions
          section.text?.forEach((question) => {
            allQuestions.push({
              id: question.id,
              type: "paragraph",
              text: stripHtml(question.question_text),
              textHtml: question.question_text,
              instructions: question.instructions,
              imageUrl: question.image_url || undefined,
              sectionId: section.id,
              sectionTitle: stripHtml(section.title),
              correctAnswer: question.correct_answer,
            });
          });
        });
      }

      state.questions = allQuestions;
    },

    setCurrentIndex: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.currentIndex = index;
      }
    },

    nextQuestion: (state) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }
    },

    prevQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },

    // ✅ UPDATED: Set answer with TEXT instead of ID
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;

      const question = state.questions.find((q) => q.id === questionId);
      if (!question) return;

      // Update answeredMap for UI (keep ID for selection state)
      state.answeredMap[questionId] = answer;

      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.question_id === questionId
      );

      let studentAnswerText = null;
      let correctAnswerText = null;
      let isCorrect = false;

      if (question.type === "mcq") {
        // ✅ Find selected option and get its TEXT
        const selectedOption = question.options.find(
          (opt) => opt.id === answer
        );
        studentAnswerText = selectedOption ? selectedOption.label : null;

        // ✅ Get correct answer TEXT
        correctAnswerText = question.correctAnswerText;

        // ✅ Check if correct by comparing IDs
        isCorrect = answer === question.correctAnswerId;
      } else if (question.type === "boolean") {
        // ✅ Convert boolean to string "true" or "false"
        studentAnswerText = String(answer);
        correctAnswerText = String(question.correctAnswer);
        isCorrect = answer === question.correctAnswer;
      } else if (question.type === "paragraph" || question.type === "text") {
        // ✅ Already a string
        studentAnswerText = answer;
        correctAnswerText = question.correctAnswer || "";
        // For paragraph, server will validate
        isCorrect = false;
      }

      const answerObject = {
        question_id: questionId,
        type: question.type,
        student_answer: studentAnswerText, // ✅ Now sending TEXT
        correct_answer: correctAnswerText, // ✅ Now sending TEXT
        is_correct: isCorrect,
      };

      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = answerObject;
      } else {
        state.answers.push(answerObject);
      }
    },

    toggleFlag: (state, action) => {
      const index = action.payload;
      state.flaggedMap[index] = !state.flaggedMap[index];
    },

    startExam: (state) => {
      state.isStarted = true;
      state.startTime = new Date().toISOString();
    },

    submitExam: (state) => {
      state.isSubmitted = true;
      state.endTime = new Date().toISOString();
    },
    closeExam: (state) => {
      state.isSubmitted = false;
    },

    setExamResults: (state, action) => {
      const { score, percentage, resultData } = action.payload;
      state.score = score;
      state.percentage = percentage;
      state.resultData = resultData;
    },

    resetExam: () => initialState,
  },
});

export const {
  setStudentId,
  setExamId,
  setExamData,
  setCurrentIndex,
  nextQuestion,
  prevQuestion,
  setAnswer,
  toggleFlag,
  startExam,
  submitExam,
  setExamResults,
  resetExam,
  closeExam
} = examSlice.actions;

export default examSlice.reducer;

// Selectors
export const selectExam = (state) => state.exam;
export const selectStudentId = (state) => state.exam.studentId;
export const selectExamId = (state) => state.exam.examId;
export const selectQuestions = (state) => state.exam.questions;
export const selectCurrentIndex = (state) => state.exam.currentIndex;
export const selectCurrentQuestion = (state) =>
  state.exam.questions[state.exam.currentIndex] || null;
export const selectAnsweredMap = (state) => state.exam.answeredMap;
export const selectFlaggedMap = (state) => state.exam.flaggedMap;
export const selectIsStarted = (state) => state.exam.isStarted;
export const selectIsSubmitted = (state) => state.exam.isSubmitted;
export const selectSubmissionData = (state) => ({
  student_id: state.exam.studentId,
  exam_id: state.exam.examId,
  answers: state.exam.answers,
});
export const selectAnswers = (state) => state.exam.answers;
export const selectExamScore = (state) => state.exam.score;
export const selectExamPercentage = (state) => state.exam.percentage;
export const selectExamResultData = (state) => state.exam.resultData;
