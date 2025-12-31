import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Exam info
  examId: null,
  studentId: null,
  examData: null,
  examInfo: null, // Store exam_info from API

  // Sections and Blocks structure
  sections: [],

  // Questions (transformed) - kept for backward compatibility
  questions: [],

  // User progress - section-based
  currentSectionIndex: 0,
  currentBlockIndex: 0,
  // Legacy: currentIndex for backward compatibility
  currentIndex: 0,

  // Time
  totalTimeInSeconds: 0,
  timeRemaining: 0,

  // Answers in API format
  answers: [], // Array of { question_id, type, student_answer, correct_answer, is_correct }

  // Helper maps for UI
  answeredMap: {}, // { [questionId]: optionId } - for UI only (keeps ID for selection state)
  flaggedMap: {}, // { [questionId]: true/false }

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

    initializeExam: (state, action) => {
      const { sections: apiSections, examInfo } = action.payload;
      
      state.examInfo = examInfo || null;
      
      // Initialize timer from exam_info.time
      if (examInfo?.time) {
        state.totalTimeInSeconds = parseTimeToSeconds(examInfo.time);
        state.timeRemaining = state.totalTimeInSeconds;
      }

      const transformedSections = [];
      const allQuestions = [];
      let questionCounter = 0;

      apiSections.forEach((section) => {
        const sectionTitle = stripHtml(section.title) || "||";
        const sectionDescription = stripHtml(section.description) || "||";
        const blocks = [];

        // Process paragraphs
        section.paragraphs?.forEach((paraObj) => {
          const passage = stripHtml(paraObj.paragraph.paragraph_content);
          const paragraphQuestions = [];

          paraObj.questions?.forEach((q) => {
            if (!q.options || q.options.length === 0) return;

            const correctOption = q.options.find((o) => o.is_correct === 1);
            const formattedOptions = q.options.map((opt) => ({
              id: opt.id,
              text: stripHtml(opt.option_text),
              textHtml: opt.option_text,
              isCorrect: opt.is_correct === 1,
            }));

            const questionData = {
              id: q.id,
              text: stripHtml(q.question_text),
              textHtml: q.question_text,
              options: formattedOptions,
              correctAnswer: correctOption?.id || null,
              correctAnswerText: stripHtml(correctOption?.option_text) || null,
              explanation: stripHtml(correctOption?.question_explanation) || "لا يوجد تفسير متاح.",
              instructions: q.instructions || "",
              type: "paragraph",
              sectionId: section.id,
              sectionTitle: sectionTitle,
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

          const correctOption = q.options.find((o) => o.is_correct === 1);
          const formattedOptions = q.options.map((opt) => ({
            id: opt.id,
            text: stripHtml(opt.option_text),
            textHtml: opt.option_text,
            isCorrect: opt.is_correct === 1,
          }));

          const questionData = {
            id: q.id,
            text: stripHtml(q.question_text),
            textHtml: q.question_text,
            options: formattedOptions,
            correctAnswer: correctOption?.id || null,
            correctAnswerText: stripHtml(correctOption?.option_text) || null,
            explanation: stripHtml(correctOption?.question_explanation) || "لا يوجد تفسير متاح.",
            instructions: q.instructions || "",
            type: "mcq",
            sectionId: section.id,
            sectionTitle: sectionTitle,
            globalIndex: questionCounter++,
          };

          blocks.push({
            type: "mcq",
            passage: null,
            questions: [questionData],
          });

          allQuestions.push(questionData);
        });

        // Process Boolean questions
        section.boolean?.forEach((q) => {
          const questionData = {
            id: q.id,
            text: stripHtml(q.question_text),
            textHtml: q.question_text,
            options: [
              { id: "true", text: "صح", isCorrect: q.correct_answer === "true" },
              { id: "false", text: "خطأ", isCorrect: q.correct_answer === "false" },
            ],
            correctAnswer: q.correct_answer,
            correctAnswerText: q.correct_answer === "true" ? "صح" : "خطأ",
            explanation: "لا يوجد تفسير متاح.",
            instructions: q.instructions || "",
            type: "boolean",
            sectionId: section.id,
            sectionTitle: sectionTitle,
            globalIndex: questionCounter++,
          };

          blocks.push({
            type: "boolean",
            passage: null,
            questions: [questionData],
          });

          allQuestions.push(questionData);
        });

        if (blocks.length > 0) {
          transformedSections.push({
            id: section.id,
            title: sectionTitle,
            description: sectionDescription,
            blocks: blocks,
          });
        }
      });

      state.sections = transformedSections;
      state.questions = allQuestions; // Keep for backward compatibility
      state.examData = apiSections; // Keep for backward compatibility
    },

    // Legacy setExamData - redirects to initializeExam
    setExamData: (state, action) => {
      const data = action.payload;
      state.examData = data;

      const allQuestions = [];

      if (Array.isArray(data)) {
        data.forEach((section) => {
          // MCQ questions
          section.mcq?.forEach((question) => {
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
              correctAnswerId: correctOption?.id || null,
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

    // Section navigation
    setCurrentSectionIndex: (state, action) => {
      state.currentSectionIndex = action.payload;
      state.currentBlockIndex = 0;
      // Update currentIndex for backward compatibility
      const currentBlock = state.sections[action.payload]?.blocks[0];
      if (currentBlock) {
        const firstQuestion = currentBlock.questions[0];
        const questionIndex = state.questions.findIndex(q => q.id === firstQuestion?.id);
        if (questionIndex >= 0) state.currentIndex = questionIndex;
      }
    },

    setCurrentBlockIndex: (state, action) => {
      state.currentBlockIndex = action.payload;
      // Update currentIndex for backward compatibility
      const currentSection = state.sections[state.currentSectionIndex];
      const currentBlock = currentSection?.blocks[action.payload];
      if (currentBlock) {
        const firstQuestion = currentBlock.questions[0];
        const questionIndex = state.questions.findIndex(q => q.id === firstQuestion?.id);
        if (questionIndex >= 0) state.currentIndex = questionIndex;
      }
    },

    // Timer
    decrementTime: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },

    setTimeRemaining: (state, action) => {
      state.timeRemaining = action.payload;
    },

    // Legacy navigation methods
    setCurrentIndex: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.questions.length) {
        state.currentIndex = index;
        // Update section/block indices
        const question = state.questions[index];
        if (question) {
          let questionCounter = 0;
          for (let sIdx = 0; sIdx < state.sections.length; sIdx++) {
            const section = state.sections[sIdx];
            for (let bIdx = 0; bIdx < section.blocks.length; bIdx++) {
              const block = section.blocks[bIdx];
              for (let qIdx = 0; qIdx < block.questions.length; qIdx++) {
                if (questionCounter === index) {
                  state.currentSectionIndex = sIdx;
                  state.currentBlockIndex = bIdx;
                  return;
                }
                questionCounter++;
              }
            }
          }
        }
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

      if (question.type === "mcq" || question.type === "paragraph") {
        // Find selected option - support both old (options with label) and new (options with text) format
        const selectedOption = question.options?.find(
          (opt) => opt.id === answer
        );
        studentAnswerText = selectedOption ? (selectedOption.text || selectedOption.label) : null;

        // Get correct answer TEXT
        correctAnswerText = question.correctAnswerText;

        // Check if correct by comparing IDs
        isCorrect = answer === question.correctAnswer;
      } else if (question.type === "boolean") {
        studentAnswerText = String(answer);
        correctAnswerText = String(question.correctAnswer);
        isCorrect = answer === question.correctAnswer;
      } else if (question.type === "text") {
        studentAnswerText = answer;
        correctAnswerText = question.correctAnswer || "";
        isCorrect = false;
      }

      const answerObject = {
        question_id: questionId,
        type: question.type,
        student_answer: studentAnswerText,
        correct_answer: correctAnswerText,
        is_correct: isCorrect,
      };

      if (existingAnswerIndex >= 0) {
        state.answers[existingAnswerIndex] = answerObject;
      } else {
        state.answers.push(answerObject);
      }
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
  initializeExam,
  setExamData,
  setCurrentSectionIndex,
  setCurrentBlockIndex,
  decrementTime,
  setTimeRemaining,
  setCurrentIndex,
  nextQuestion,
  prevQuestion,
  setAnswer,
  toggleFlag,
  toggleBlockFlag,
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
export const selectExamInfo = (state) => state.exam.examInfo;
export const selectSections = (state) => state.exam.sections;
export const selectQuestions = (state) => state.exam.questions;
export const selectCurrentSectionIndex = (state) => state.exam.currentSectionIndex;
export const selectCurrentBlockIndex = (state) => state.exam.currentBlockIndex;
export const selectCurrentIndex = (state) => state.exam.currentIndex;
export const selectCurrentSection = (state) => {
  const { sections, currentSectionIndex } = state.exam;
  return sections[currentSectionIndex] || null;
};
export const selectCurrentBlock = (state) => {
  const { sections, currentSectionIndex, currentBlockIndex } = state.exam;
  const section = sections[currentSectionIndex];
  return section?.blocks[currentBlockIndex] || null;
};
export const selectCurrentQuestion = (state) =>
  state.exam.questions[state.exam.currentIndex] || null;
export const selectTimeRemaining = (state) => state.exam.timeRemaining;
export const selectTotalTime = (state) => state.exam.totalTimeInSeconds;
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
