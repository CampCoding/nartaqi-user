// Store/Slices/placementTestSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testId: null,
  testInfo: null,
  sections: [],
  allQuestions: [],
  currentQuestionIndex: 0,
  answeredMap: {},
  flaggedMap: {},
  isLoading: false,
  isStarted: false,
  isSubmitted: false,
  score: null,
  correctAnswers: 0,
  totalQuestions: 0,
  percentage: 0,
};

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/&nbsp;/gi, " ");
};

const placementTestSlice = createSlice({
  name: "placementTest",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    initializeTest: (state, action) => {
      const { testId, sections } = action.payload;

      state.testId = testId;

      const transformedSections = [];
      const allQuestions = [];
      let questionCounter = 0;

      if (!Array.isArray(sections)) {
        console.error("sections is not an array");
        return;
      }

      sections.forEach((section, sectionIndex) => {
        const sectionQuestions = [];

        // Process direct questions (MCQ, T/F)
        if (Array.isArray(section.questions)) {
          section.questions.forEach((q) => {
            if (!q.options || q.options.length === 0) return;

            const correctOption = q.options.find((o) => o.is_correct === 1);

            const questionData = {
              id: q.id,
              text: stripHtml(q.question_text),
              type: q.question_type,
              label: stripHtml(q.label),
              options: q.options.map((opt) => ({
                id: opt.id,
                text: stripHtml(opt.option_text),
                isCorrect: opt.is_correct === 1,
              })),
              correctAnswer: correctOption?.id || null,
              passage: null,
              globalIndex: questionCounter++,
              sectionIndex,
            };

            sectionQuestions.push(questionData);
            allQuestions.push(questionData);
          });
        }

        // Process paragraph questions
        if (Array.isArray(section.paragraphs)) {
          section.paragraphs.forEach((para) => {
            const passage = stripHtml(para.paragraph_content);

            if (Array.isArray(para.questions)) {
              para.questions.forEach((q) => {
                if (!q.options || q.options.length === 0) return;

                const correctOption = q.options.find((o) => o.is_correct === 1);

                const questionData = {
                  id: q.id,
                  text: stripHtml(q.question_text),
                  type: q.question_type,
                  label: stripHtml(q.label),
                  options: q.options.map((opt) => ({
                    id: opt.id,
                    text: stripHtml(opt.option_text),
                    isCorrect: opt.is_correct === 1,
                  })),
                  correctAnswer: correctOption?.id || null,
                  passage: passage,
                  paragraphId: para.id,
                  globalIndex: questionCounter++,
                  sectionIndex,
                };

                sectionQuestions.push(questionData);
                allQuestions.push(questionData);
              });
            }
          });
        }

        transformedSections.push({
          id: section.id,
          title: stripHtml(section.title),
          description: stripHtml(section.description),
          questions: sectionQuestions,
        });
      });

      state.sections = transformedSections;
      state.allQuestions = allQuestions;
      state.totalQuestions = allQuestions.length;

      // Set testInfo from first section
      if (sections.length > 0) {
        state.testInfo = {
          id: sections[0].placement_test_id,
          title: sections[0].title || "اختبار تحديد المستوى",
        };
      }
    },

    startTest: (state) => {
      state.isStarted = true;
    },

    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },

    setAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      state.answeredMap[questionId] = optionId;
    },

    toggleFlag: (state, action) => {
      const questionId = action.payload;
      state.flaggedMap[questionId] = !state.flaggedMap[questionId];
    },

    submitTest: (state) => {
      state.isSubmitted = true;

      let correct = 0;
      state.allQuestions.forEach((question) => {
        const userAnswer = state.answeredMap[question.id];
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      });

      state.correctAnswers = correct;
      state.score = `${correct}/${state.totalQuestions}`;
      state.percentage =
        state.totalQuestions > 0
          ? Math.round((correct / state.totalQuestions) * 100)
          : 0;
    },

    resetTest: () => initialState,
  },
});

export const {
  setLoading,
  initializeTest,
  startTest,
  setCurrentQuestionIndex,
  setAnswer,
  toggleFlag,
  submitTest,
  resetTest,
} = placementTestSlice.actions;

export default placementTestSlice.reducer;

// ============ SELECTORS ============
export const selectTestInfo = (state) => state.placementTest.testInfo;
export const selectSections = (state) => state.placementTest.sections;
export const selectAllQuestions = (state) => state.placementTest.allQuestions;
export const selectCurrentQuestionIndex = (state) =>
  state.placementTest.currentQuestionIndex;
export const selectAnsweredMap = (state) => state.placementTest.answeredMap;
export const selectFlaggedMap = (state) => state.placementTest.flaggedMap;
export const selectIsStarted = (state) => state.placementTest.isStarted;
export const selectIsSubmitted = (state) => state.placementTest.isSubmitted;
export const selectTotalQuestions = (state) =>
  state.placementTest.totalQuestions;
export const selectScore = (state) => state.placementTest.score;
export const selectPercentage = (state) => state.placementTest.percentage;
export const selectCorrectAnswers = (state) =>
  state.placementTest.correctAnswers;

export const selectCurrentQuestion = (state) => {
  const { allQuestions, currentQuestionIndex } = state.placementTest;
  return allQuestions[currentQuestionIndex] || null;
};

export const selectProgressText = (state) => {
  const { currentQuestionIndex, totalQuestions } = state.placementTest;
  return `${currentQuestionIndex + 1} من ${totalQuestions}`;
};
