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
  answeredMap: {}, // { [questionId]: student_answer } - for UI only
  flaggedMap: {}, // { [index]: true/false }

  // State
  isStarted: false,
  isSubmitted: false,
  startTime: null,
  endTime: null,

  // Results
  score: null, // "10/20"
  percentage: null, // 85
  resultData: null, // Full API response
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
    // Set student ID
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },

    // Set exam ID
    setExamId: (state, action) => {
      state.examId = action.payload;
    },

    // Set exam data from API and transform questions
    setExamData: (state, action) => {
      const data = action.payload;
      state.examData = data;

      // Transform questions from API format
      const allQuestions = [];

      // Handle if data is an array of sections
      if (Array.isArray(data)) {
        data.forEach((section) => {
          // MCQ questions
          section.mcq?.forEach((question) => {
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
              // Store correct answer for later validation
              correctAnswer:
                question.options?.find((opt) => opt.is_correct === 1)?.id ||
                null,
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

    // Set current index
    setCurrentIndex: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.currentIndex = index;
      }
    },

    // Go to next question
    nextQuestion: (state) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }
    },

    // Go to previous question
    prevQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },

    // Set answer for a question (stores in API format)
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;

      // Find the question
      const question = state.questions.find((q) => q.id === questionId);
      if (!question) return;

      // Update answeredMap for UI
      state.answeredMap[questionId] = answer;

      // Find or create answer in answers array
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.question_id === questionId
      );

      // Determine correct answer and if student is correct
      let correctAnswer = null;
      let isCorrect = false;

      if (question.type === "mcq") {
        correctAnswer = question.correctAnswer;
        isCorrect = answer === correctAnswer;
      } else if (question.type === "boolean") {
        correctAnswer = question.correctAnswer;
        isCorrect = answer === correctAnswer;
      } else if (question.type === "paragraph") {
        correctAnswer = question.correctAnswer || "";
        // For paragraph, we can't determine correctness client-side
        isCorrect = false;
      }

      const answerObject = {
        question_id: questionId,
        type: question.type,
        student_answer: answer,
        correct_answer: correctAnswer,
        is_correct: isCorrect,
      };

      if (existingAnswerIndex >= 0) {
        // Update existing answer
        state.answers[existingAnswerIndex] = answerObject;
      } else {
        // Add new answer
        state.answers.push(answerObject);
      }
    },

    // Toggle flag for a question
    toggleFlag: (state, action) => {
      const index = action.payload;
      state.flaggedMap[index] = !state.flaggedMap[index];
    },

    // Start exam
    startExam: (state) => {
      state.isStarted = true;
      state.startTime = new Date().toISOString();
    },

    // Submit exam
    submitExam: (state) => {
      state.isSubmitted = true;
      state.endTime = new Date().toISOString();
    },

    // Set exam results
    setExamResults: (state, action) => {
      const { score, percentage, resultData } = action.payload;
      state.score = score;
      state.percentage = percentage;
      state.resultData = resultData;
    },

    // Reset exam state
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

// Selector for API submission format
export const selectSubmissionData = (state) => ({
  student_id: state.exam.studentId,
  exam_id: state.exam.examId,
  answers: state.exam.answers,
});

// Selector for answers array
export const selectAnswers = (state) => state.exam.answers;

// Selector for exam results
export const selectExamScore = (state) => state.exam.score;
export const selectExamPercentage = (state) => state.exam.percentage;
export const selectExamResultData = (state) => state.exam.resultData;
