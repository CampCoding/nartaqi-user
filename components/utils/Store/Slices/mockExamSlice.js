import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Exam info
  examId: null,
  studentId: null,

  // Sections and Blocks structure
  sections: [],

  // Current position
  currentSectionIndex: 0,
  currentBlockIndex: 0,

  // Time
  totalTimeInSeconds: 0,
  timeRemaining: 0,

  // Answers
  answeredMap: {}, // { [questionId]: optionId }
  flaggedMap: {}, // { [questionId]: true/false }

  // All questions flat (for easy access)
  allQuestions: [],

  // State
  isStarted: false,
  isSubmitted: false,
  isSolved: false,

  // Results
  score: null, // "10/20"
  correctAnswers: 0,
  totalQuestions: 0,
  percentage: 0,
};

// Helper function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
};

// Helper to parse time string "HH:MM:SS" to seconds
const parseTimeToSeconds = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(":");
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts.map(Number);
    return hours * 3600 + minutes * 60 + (seconds || 0);
  }
  if (parts.length === 2) {
    const [minutes, seconds] = parts.map(Number);
    return minutes * 60 + (seconds || 0);
  }
  return 0;
};

// Shuffle array function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const mockExamSlice = createSlice({
  name: "mockExam",
  initialState,
  reducers: {
    // Initialize exam with API data
    initializeExam: (state, action) => {
      const { examId, studentId, sections: apiSections } = action.payload;

      state.examId = examId;
      state.studentId = studentId;

      const transformedSections = [];
      const allQuestions = [];
      let calculatedTotalTime = 0;
      let questionCounter = 0;

      apiSections.forEach((section) => {
        const sectionTitle = stripHtml(section.title) || "||";
        const sectionDescription = stripHtml(section.description) || "||";

        // Add section time
        calculatedTotalTime += parseTimeToSeconds(section.time_if_free);

        const blocks = [];

        // Process paragraphs
        section.paragraphs?.forEach((paraObj) => {
          const passage = stripHtml(paraObj.paragraph.paragraph_content);
          const paragraphQuestions = [];

          paraObj.questions?.forEach((q) => {
            if (!q.options || q.options.length === 0) return;

            const formattedOptions = q.options.map((opt) => ({
              id: opt.id,
              text: stripHtml(opt.option_text),
              isCorrect: opt.is_correct === 1,
            }));

            const correctOption = q.options.find((o) => o.is_correct === 1);

            const questionData = {
              id: q.id,
              text: stripHtml(q.question_text),
              options: formattedOptions,
              correctAnswer: correctOption?.id || null,
              explanation:
                stripHtml(correctOption?.question_explanation) ||
                "لا يوجد تفسير متاح.",
              instructions: q.instructions || "",
              type: "paragraph",
              globalIndex: questionCounter++,
            };

            paragraphQuestions.push(questionData);
            allQuestions.push(questionData);
          });

          if (paragraphQuestions.length > 0) {
            blocks.push({
              type: "paragraph",
              passage: passage,
              questions: paragraphQuestions,
            });
          }
        });

        // Process MCQ questions
        section.mcq?.forEach((q) => {
          if (!q.options || q.options.length === 0) return;

          const formattedOptions = q.options.map((opt) => ({
            id: opt.id,
            text: stripHtml(opt.option_text),
            isCorrect: opt.is_correct === 1,
          }));

          const correctOption = q.options.find((o) => o.is_correct === 1);

          const questionData = {
            id: q.id,
            text: stripHtml(q.question_text),
            options: formattedOptions,
            correctAnswer: correctOption?.id || null,
            explanation:
              stripHtml(correctOption?.question_explanation) ||
              "لا يوجد تفسير متاح.",
            instructions: q.instructions || "",
            type: "mcq",
            globalIndex: questionCounter++,
          };

          blocks.push({
            type: "mcq",
            passage: null,
            questions: [questionData],
          });

          allQuestions.push(questionData);
        });

        // Shuffle blocks only (questions inside blocks stay in order)
        const shuffledBlocks = shuffleArray(blocks);

        if (shuffledBlocks.length > 0) {
          transformedSections.push({
            id: section.id,
            title: sectionTitle,
            description: sectionDescription,
            blocks: shuffledBlocks,
          });
        }
      });

      state.sections = transformedSections;
      state.allQuestions = allQuestions;
      state.totalTimeInSeconds = calculatedTotalTime;
      state.timeRemaining = calculatedTotalTime;
      state.totalQuestions = allQuestions.length;
    },

    // Set solved status
    setIsSolved: (state, action) => {
      state.isSolved = action.payload;
    },

    // Start exam
    startExam: (state) => {
      state.isStarted = true;
    },

    // Decrement time
    decrementTime: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },

    // Set time remaining (for restore)
    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },

    // Set current section index
    setCurrentSectionIndex: (state, action) => {
      state.currentSectionIndex = action.payload;
    },

    // Set current block index
    setCurrentBlockIndex: (state, action) => {
      state.currentBlockIndex = action.payload;
    },

    // Go to next block
    nextBlock: (state) => {
      const currentSection = state.sections[state.currentSectionIndex];
      if (!currentSection) return;

      if (state.currentBlockIndex < currentSection.blocks.length - 1) {
        state.currentBlockIndex += 1;
      }
    },

    // Go to previous block
    prevBlock: (state) => {
      if (state.currentBlockIndex > 0) {
        state.currentBlockIndex -= 1;
      }
    },

    // Move to next section
    nextSection: (state) => {
      if (state.currentSectionIndex < state.sections.length - 1) {
        state.currentSectionIndex += 1;
        state.currentBlockIndex = 0;
      }
    },

    // Set answer for a question
    setAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      state.answeredMap[questionId] = optionId;
    },

    // Toggle flag for a question
    toggleFlag: (state, action) => {
      const questionId = action.payload;
      state.flaggedMap[questionId] = !state.flaggedMap[questionId];
    },

    // Toggle flag for all questions in a block
    toggleBlockFlag: (state, action) => {
      const questionIds = action.payload; // array of question ids
      const firstId = questionIds[0];
      const isCurrentlyFlagged = state.flaggedMap[firstId];

      questionIds.forEach((qId) => {
        state.flaggedMap[qId] = !isCurrentlyFlagged;
      });
    },

    // Submit exam and calculate results
    submitExam: (state) => {
      state.isSubmitted = true;

      // Calculate score
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

    // Restore state from localStorage
    restoreState: (state, action) => {
      const savedState = action.payload;
      state.currentSectionIndex = savedState.currentSectionIndex || 0;
      state.currentBlockIndex = savedState.currentBlockIndex || 0;
      state.timeRemaining =
        savedState.timeRemaining || state.totalTimeInSeconds;
      state.answeredMap = savedState.answeredMap || {};
      state.flaggedMap = savedState.flaggedMap || {};
      state.isStarted = savedState.isStarted || false;
    },

    // Reset exam
    resetExam: () => initialState,
  },
});

export const {
  initializeExam,
  setIsSolved,
  startExam,
  decrementTime,
  setTimeRemaining,
  setCurrentSectionIndex,
  setCurrentBlockIndex,
  nextBlock,
  prevBlock,
  nextSection,
  setAnswer,
  toggleFlag,
  toggleBlockFlag,
  submitExam,
  restoreState,
  resetExam,
} = mockExamSlice.actions;

export default mockExamSlice.reducer;

// ============ SELECTORS ============

export const selectMockExam = (state) => state.mockExam;

// Basic info
export const selectExamId = (state) => state.mockExam.examId;
export const selectStudentId = (state) => state.mockExam.studentId;

// Sections and blocks
export const selectSections = (state) => state.mockExam.sections;
export const selectCurrentSectionIndex = (state) =>
  state.mockExam.currentSectionIndex;
export const selectCurrentBlockIndex = (state) =>
  state.mockExam.currentBlockIndex;

export const selectCurrentSection = (state) => {
  const { sections, currentSectionIndex } = state.mockExam;
  return sections[currentSectionIndex] || null;
};

export const selectCurrentBlock = (state) => {
  const { sections, currentSectionIndex, currentBlockIndex } = state.mockExam;
  const section = sections[currentSectionIndex];
  return section?.blocks[currentBlockIndex] || null;
};

// Time
export const selectTimeRemaining = (state) => state.mockExam.timeRemaining;
export const selectTotalTime = (state) => state.mockExam.totalTimeInSeconds;

// Answers and flags
export const selectAnsweredMap = (state) => state.mockExam.answeredMap;
export const selectFlaggedMap = (state) => state.mockExam.flaggedMap;

// Questions
export const selectAllQuestions = (state) => state.mockExam.allQuestions;
export const selectTotalQuestions = (state) => state.mockExam.totalQuestions;

// State
export const selectIsStarted = (state) => state.mockExam.isStarted;
export const selectIsSubmitted = (state) => state.mockExam.isSubmitted;
export const selectIsSolved = (state) => state.mockExam.isSolved;

// Results
export const selectScore = (state) => state.mockExam.score;
export const selectCorrectAnswers = (state) => state.mockExam.correctAnswers;
export const selectPercentage = (state) => state.mockExam.percentage;

// Computed selectors
export const selectAnsweredCount = (state) =>
  Object.keys(state.mockExam.answeredMap).length;

export const selectFlaggedCount = (state) =>
  Object.values(state.mockExam.flaggedMap).filter(Boolean).length;

export const selectUnansweredCount = (state) =>
  state.mockExam.totalQuestions -
  Object.keys(state.mockExam.answeredMap).length;

// Get current question number (first question in current block)
export const selectCurrentQuestionNumber = (state) => {
  const { sections, currentSectionIndex, currentBlockIndex } = state.mockExam;
  let count = 0;

  for (let i = 0; i < currentSectionIndex; i++) {
    sections[i]?.blocks?.forEach((block) => {
      count += block.questions.length;
    });
  }

  const currentSection = sections[currentSectionIndex];
  if (currentSection) {
    for (let i = 0; i < currentBlockIndex; i++) {
      count += currentSection.blocks[i]?.questions.length || 0;
    }
  }

  return count + 1;
};

// Get progress text
export const selectProgressText = (state) => {
  const currentQuestionNumber = selectCurrentQuestionNumber(state);
  const currentBlock = selectCurrentBlock(state);
  const totalQuestions = state.mockExam.totalQuestions;
  const blockQuestionCount = currentBlock?.questions.length || 1;

  if (blockQuestionCount > 1) {
    const endNum = currentQuestionNumber + blockQuestionCount - 1;
    return `${currentQuestionNumber}-${endNum} من ${totalQuestions}`;
  }
  return `${currentQuestionNumber} من ${totalQuestions}`;
};

// Check if current block is marked
export const selectIsCurrentBlockMarked = (state) => {
  const currentBlock = selectCurrentBlock(state);
  if (!currentBlock) return false;
  return currentBlock.questions.some((q) => state.mockExam.flaggedMap[q.id]);
};

// Check if last block in section
export const selectIsLastBlockInSection = (state) => {
  const currentSection = selectCurrentSection(state);
  if (!currentSection) return false;
  return state.mockExam.currentBlockIndex === currentSection.blocks.length - 1;
};

// Check if last section
export const selectIsLastSection = (state) => {
  return (
    state.mockExam.currentSectionIndex === state.mockExam.sections.length - 1
  );
};

// Format answers for API submission
export const selectFormattedAnswersForAPI = (state) => {
  const { allQuestions, answeredMap } = state.mockExam;
  const formattedAnswers = [];

  allQuestions.forEach((question) => {
    const userAnswer = answeredMap[question.id];
    if (userAnswer !== undefined) {
      formattedAnswers.push({
        question_id: question.id,
        type: question.type,
        student_answer: userAnswer,
        correct_answer: question.correctAnswer,
        is_correct: userAnswer === question.correctAnswer,
      });
    }
  });

  return formattedAnswers;
};

// Get state for localStorage save
export const selectStateForSave = (state) => {
  const {
    examId,
    currentSectionIndex,
    currentBlockIndex,
    timeRemaining,
    answeredMap,
    flaggedMap,
    isStarted,
  } = state.mockExam;

  return {
    examId,
    currentSectionIndex,
    currentBlockIndex,
    timeRemaining,
    answeredMap,
    flaggedMap,
    isStarted,
    savedAt: new Date().toISOString(),
  };
};
