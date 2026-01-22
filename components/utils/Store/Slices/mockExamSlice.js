import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Exam info
  examId: null,
  studentId: null,
  examInfo: null, // Store full exam_info from API

  // Sections and Blocks structure
  sections: [],

  // Current position
  currentSectionIndex: 0,
  currentBlockIndex: 0,

  // Time
  totalTimeInSeconds: 0,
  timeRemaining: 0,
  // Per-section timers: { [sectionIndex]: seconds }
  sectionTimers: {},
  sectionTimeLimits: {}, // { [sectionIndex]: totalSeconds }

  // Answers
  answeredMap: {}, // { [questionId]: optionId } - keeps ID for UI
  flaggedMap: {}, // { [questionId]: true/false }

  // All questions flat (for easy access)
  allQuestions: [],

  // State
  isStarted: false,

  isSubmitted: false,
  isSolved: false,

  // Results
  score: null,
  correctAnswers: 0,
  totalQuestions: 0,
  percentage: 0,
};

// Helper function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  return html
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
      const { examId, studentId, sections: apiSections, examInfo } = action.payload;

      state.examId = examId;
      state.studentId = studentId;
      state.examInfo = examInfo || null;

      const transformedSections = [];
      const allQuestions = [];
      let calculatedTotalTime = 0;
      let questionCounter = 0;
      
      // Initialize section timers and limits objects
      state.sectionTimeLimits = {};
      state.sectionTimers = {};

      apiSections.forEach((section, sectionIndex) => {
        const sectionTitle = stripHtml(section.title) || "";
        const sectionDescription = stripHtml(section.description) || "";
        const sectionTimeLimit = parseTimeToSeconds(section.time_if_free);

        calculatedTotalTime += sectionTimeLimit;
        
        // Store section time limit and initialize timer
        state.sectionTimeLimits[sectionIndex] = sectionTimeLimit;
        state.sectionTimers[sectionIndex] = sectionTimeLimit;

        const blocks = [];

        // Process paragraphs - create one block per question to show one question at a time
        section.paragraphs?.forEach((paraObj) => {
          const passage = stripHtml(paraObj.paragraph.paragraph_content);

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
              // ✅ Store both ID and TEXT for correct answer
              correctAnswer: correctOption?.id || null,
              correctAnswerText: stripHtml(correctOption?.option_text) || null,
              explanation:
                stripHtml(correctOption?.question_explanation) ||
                "لا يوجد تفسير متاح.",
              instructions: q.instructions || "",
              type: "paragraph",
              globalIndex: questionCounter++,
            };

            // Create one block per question, but all share the same passage
            blocks.push({
              type: "paragraph",
              passage: passage, // Same passage for all questions from this paragraph
              questions: [questionData], // Only one question per block
            });

            allQuestions.push(questionData);
          });
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
            // ✅ Store both ID and TEXT for correct answer
            correctAnswer: correctOption?.id || null,
            correctAnswerText: stripHtml(correctOption?.option_text) || null,
            explanation:
              stripHtml(correctOption?.question_explanation) ||
              "لا يوجد تفسير متاح.",
            instructions: q.instructions || "",
            type: q.question_type || "mcq",
            globalIndex: questionCounter++,
          };

          blocks.push({
            type: q.question_type || "mcq",
            passage: null,
            questions: [questionData],
          });

          allQuestions.push(questionData);
        });

        // Process Boolean questions (if any)
        section.boolean?.forEach((q) => {
          const questionData = {
            id: q.id,
            text: stripHtml(q.question_text),
            options: [
              {
                id: "true",
                text: "صح",
                isCorrect: q.correct_answer === "true",
              },
              {
                id: "false",
                text: "خطأ",
                isCorrect: q.correct_answer === "false",
              },
            ],
            correctAnswer: q.correct_answer,
            correctAnswerText: q.correct_answer === "true" ? "صح" : "خطأ",
            explanation: "لا يوجد تفسير متاح.",
            instructions: q.instructions || "",
            type: "boolean",
            globalIndex: questionCounter++,
          };

          blocks.push({
            type: "boolean",
            passage: null,
            questions: [questionData],
          });

          allQuestions.push(questionData);
        });

        // Shuffle blocks only
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
      
      // Use exam_info.time if available, otherwise use calculated time from sections
      let examTimeSeconds = 0;
      if (examInfo?.time) {
        examTimeSeconds = parseTimeToSeconds(examInfo.time);
        state.totalTimeInSeconds = examTimeSeconds;
        state.timeRemaining = examTimeSeconds;
      } else {
        state.totalTimeInSeconds = calculatedTotalTime;
        // Initialize timeRemaining with first section's timer
        state.timeRemaining = state.sectionTimers[0] || calculatedTotalTime;
      }
      
      state.totalQuestions = allQuestions.length;
    },

    setIsSolved: (state, action) => {
      state.isSolved = action.payload;
    },

    startExam: (state) => {
      state.isStarted = true;
    },

    decrementTime: (state) => {
      // If exam_info.time is used, decrement the overall timer
      // Otherwise, use per-section timers
      if (state.examInfo?.time) {
        if (state.timeRemaining > 0) {
          state.timeRemaining -= 1;
        }
      } else {
        // Decrement current section's timer
        const currentSectionIndex = state.currentSectionIndex;
        if (state.sectionTimers[currentSectionIndex] > 0) {
          state.sectionTimers[currentSectionIndex] -= 1;
          state.timeRemaining = state.sectionTimers[currentSectionIndex];
        } else if (state.timeRemaining > 0) {
          state.timeRemaining -= 1;
        }
      }
    },

    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },

    setCurrentSectionIndex: (state, action) => {
      const newSectionIndex = action.payload;
      // Validate section index - prevent navigation to invalid sections
      if (newSectionIndex < 0 || !state.sections || newSectionIndex >= state.sections.length) {
        return; // Don't update if invalid
      }
      
      // When changing sections, update timeRemaining to the new section's timer
      // Only if we're using per-section timers (not exam_info.time)
      if (!state.examInfo?.time && state.sectionTimers && state.sectionTimers[newSectionIndex] !== undefined) {
        state.timeRemaining = state.sectionTimers[newSectionIndex];
      }
      state.currentSectionIndex = newSectionIndex;
      
      // Validate and adjust block index for the new section
      const newSection = state.sections[newSectionIndex];
      if (newSection && newSection.blocks && newSection.blocks.length > 0) {
        // If current block index is out of bounds for new section, keep it at current or reset to 0
        // Don't automatically reset - let setCurrentBlockIndex handle explicit changes
        if (state.currentBlockIndex >= newSection.blocks.length) {
          state.currentBlockIndex = 0;
        }
      } else {
        state.currentBlockIndex = 0;
      }
    },

    setCurrentBlockIndex: (state, action) => {
      const newBlockIndex = action.payload;
      // Validate section index first
      if (state.currentSectionIndex < 0 || state.currentSectionIndex >= state.sections.length) {
        return; // Don't update if section is invalid
      }
      
      // Validate block index against current section
      const currentSection = state.sections[state.currentSectionIndex];
      if (currentSection && currentSection.blocks && currentSection.blocks.length > 0) {
        // Ensure block index is within bounds
        if (newBlockIndex >= 0 && newBlockIndex < currentSection.blocks.length) {
          state.currentBlockIndex = newBlockIndex;
        } else {
          // Out of bounds, set to last valid block or 0
          state.currentBlockIndex = Math.max(0, Math.min(newBlockIndex, currentSection.blocks.length - 1));
        }
      } else if (newBlockIndex === 0) {
        // Allow setting to 0 even if section has no blocks (will show empty state)
        state.currentBlockIndex = 0;
      }
    },

    nextBlock: (state) => {
      const currentSection = state.sections[state.currentSectionIndex];
      if (!currentSection) return;

      if (state.currentBlockIndex < currentSection.blocks.length - 1) {
        state.currentBlockIndex += 1;
      }
    },

    prevBlock: (state) => {
      if (state.currentBlockIndex > 0) {
        state.currentBlockIndex -= 1;
      }
    },

    nextSection: (state) => {
      if (state.currentSectionIndex < state.sections.length - 1) {
        state.currentSectionIndex += 1;
        state.currentBlockIndex = 0;
      }
    },

    setAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      state.answeredMap[questionId] = optionId;
    },

    toggleFlag: (state, action) => {
      const questionId = action.payload;
      state.flaggedMap[questionId] = !state.flaggedMap[questionId];
    },

    toggleBlockFlag: (state, action) => {
      const questionIds = action.payload;
      const firstId = questionIds[0];
      const isCurrentlyFlagged = state.flaggedMap[firstId];

      questionIds.forEach((qId) => {
        state.flaggedMap[qId] = !isCurrentlyFlagged;
      });
    },

    submitExam: (state) => {
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

    restoreState: (state, action) => {
      const savedState = action.payload;
      state.currentSectionIndex = savedState.currentSectionIndex || 0;
      state.currentBlockIndex = savedState.currentBlockIndex || 0;
      
      // Restore section timers if available
      if (savedState.sectionTimers) {
        state.sectionTimers = savedState.sectionTimers;
      }
      
      // Restore time remaining
      // If using exam_info.time, use saved timeRemaining directly
      // Otherwise, use section-specific timer
      if (state.examInfo?.time) {
        state.timeRemaining = savedState.timeRemaining || state.totalTimeInSeconds;
      } else {
        const sectionIndex = savedState.currentSectionIndex || 0;
        if (state.sectionTimers && state.sectionTimers[sectionIndex] !== undefined) {
          state.timeRemaining = state.sectionTimers[sectionIndex];
        } else {
          state.timeRemaining = savedState.timeRemaining || state.totalTimeInSeconds;
        }
      }
      
      state.answeredMap = savedState.answeredMap || {};
      state.flaggedMap = savedState.flaggedMap || {};
      state.isStarted = savedState.isStarted || false;
    },

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
export const selectExamInfo = (state) => state.mockExam.examInfo;

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

export const selectIsCurrentBlockMarked = (state) => {
  const currentBlock = selectCurrentBlock(state);
  if (!currentBlock) return false;
  return currentBlock.questions.some((q) => state.mockExam.flaggedMap[q.id]);
};

export const selectIsLastBlockInSection = (state) => {
  const currentSection = selectCurrentSection(state);
  if (!currentSection) return false;
  return state.mockExam.currentBlockIndex === currentSection.blocks.length - 1;
};

export const selectIsLastSection = (state) => {
  return (
    state.mockExam.currentSectionIndex === state.mockExam.sections.length - 1
  );
};

export const selectIsFirstSection = (state) => {
  return state.mockExam.currentSectionIndex === 0;
};

export const selectCanGoToPreviousSection = (state) => {
  return state.mockExam.currentSectionIndex > 0;
};

// ✅ UPDATED: Format answers for API submission - NOW SENDS TEXT INSTEAD OF ID
export const selectFormattedAnswersForAPI = (state) => {
  const { allQuestions, answeredMap } = state.mockExam;
  const formattedAnswers = [];

  allQuestions.forEach((question) => {
    const userAnswerId = answeredMap[question.id];

    if (userAnswerId !== undefined) {
      // ✅ Find the selected option to get its TEXT
      const selectedOption = question.options.find(
        (opt) => opt.id === userAnswerId
      );

      // ✅ Get student answer text
      const studentAnswerText = selectedOption?.text || null;
      
      // ✅ Get student answer ID
      const studentAnswerId = selectedOption?.id || null;


      // ✅ Get correct answer text
      const correctAnswerText = question.correctAnswerText;
      // ✅ Get correct answer ID
      const correctAnswerId = question.correctAnswer;


      // ✅ Check if correct
      const isCorrect = userAnswerId === question.correctAnswer;

      formattedAnswers.push({
        question_id: question.id,
        type: question.type,
        student_answer: studentAnswerId, // ✅ Now TEXT instead of ID
        correct_answer: correctAnswerId, // ✅ Now TEXT instead of ID
        is_correct: isCorrect,
      });
    }
  });

  return formattedAnswers;
};

// ✅ NEW: Get submission data ready for API
export const selectSubmissionData = (state) => {
  const { examId, studentId } = state.mockExam;
  const answers = selectFormattedAnswersForAPI(state);

  return {
    student_id: studentId,
    exam_id: examId,
    answers: answers,
  };
};

export const selectStateForSave = (state) => {
  const {
    examId,
    currentSectionIndex,
    currentBlockIndex,
    timeRemaining,
    sectionTimers,
    answeredMap,
    flaggedMap,
    isStarted,
  } = state.mockExam;

  return {
    examId,
    currentSectionIndex,
    currentBlockIndex,
    timeRemaining,
    sectionTimers,
    answeredMap,
    flaggedMap,
    isStarted,
    savedAt: new Date().toISOString(),
  };
};
