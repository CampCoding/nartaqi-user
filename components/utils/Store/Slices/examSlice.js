import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Exam info
  examId: null,
  studentId: null,
  examData: null,
  examInfo: null,

  // Sections and Blocks structure
  sections: [],

  // Questions (transformed) - flat list for easy navigation
  questions: [],

  // User progress
  currentSectionIndex: 0,
  currentBlockIndex: 0,
  currentQuestionInBlockIndex: 0, // NEW: For paragraph blocks with multiple questions
  currentIndex: 0, // Global question index

  // Time
  totalTimeInSeconds: 0,
  timeRemaining: 0,

  // Answers in API format
  answers: [],

  // Helper maps for UI
  answeredMap: {},
  flaggedMap: {},

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
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

// Helper to parse time string "HH:MM:SS" or "MM:SS" to seconds
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
  return parseInt(timeStr) || 0;
};

// Map API question types to internal types
const mapQuestionType = (apiType) => {
  const typeMap = {
    mcq: "mcq",
    t_f: "boolean",
    paragraph_mcq: "paragraph",
    text: "text",
    boolean: "boolean",
  };
  return typeMap[apiType] || "mcq";
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
      let globalQuestionIndex = 0;

      // Track processed paragraph question IDs to avoid duplicates
      const processedParagraphQuestionIds = new Set();

      apiSections.forEach((section) => {
        const sectionTitle = section.title || "";
        const sectionDescription = section.description || "";
        const blocks = [];

        // 1. Process paragraphs FIRST
        if (section.paragraphs && section.paragraphs.length > 0) {
          section.paragraphs.forEach((paraObj) => {
            const passage = paraObj.paragraph?.paragraph_content || "";
            const paragraphQuestions = [];

            if (paraObj.questions && paraObj.questions.length > 0) {
              paraObj.questions.forEach((q) => {
                // Mark this question as processed
                processedParagraphQuestionIds.add(q.id);

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
                  explanation:
                    stripHtml(correctOption?.question_explanation) ||
                    "لا يوجد تفسير متاح.",
                  instructions: q.instructions || "",
                  type: "paragraph",
                  sectionId: section.id,
                  sectionTitle: stripHtml(sectionTitle),
                  globalIndex: globalQuestionIndex++,
                  passage: passage, // Store passage reference
                };

                paragraphQuestions.push(questionData);
                allQuestions.push(questionData);
              });
            }

            // Create one block per paragraph with all its questions
            if (paragraphQuestions.length > 0) {
              blocks.push({
                type: "paragraph",
                passage: passage,
                questions: paragraphQuestions,
              });
            }
          });
        }

        // 2. Process MCQ array (contains mcq, t_f, and paragraph_mcq)
        if (section.mcq && section.mcq.length > 0) {
          section.mcq.forEach((q) => {
            // SKIP if already processed as paragraph question
            if (processedParagraphQuestionIds.has(q.id)) {
              return;
            }

            // Skip paragraph_mcq without options
            if (!q.options || q.options.length === 0) return;

            const questionType = mapQuestionType(q.question_type);
            const correctOption = q.options.find((o) => o.is_correct === 1);

            let formattedOptions;
            let correctAnswer;
            let correctAnswerText;

            if (questionType === "boolean") {
              // Handle T/F questions
              formattedOptions = [
                {
                  id: "true",
                  text: "صح",
                  textHtml: "صح",
                  isCorrect: q.options.find(
                    (o) => o.option_text === "صحيح" || o.option_text === "صح"
                  )?.is_correct === 1,
                },
                {
                  id: "false",
                  text: "خطأ",
                  textHtml: "خطأ",
                  isCorrect: q.options.find(
                    (o) => o.option_text === "خطأ" || o.option_text === "خاطئ"
                  )?.is_correct === 1,
                },
              ];
              
              // Find the correct answer
              const trueOption = q.options.find(
                (o) => o.option_text === "صحيح" || o.option_text === "صح"
              );
              const falseOption = q.options.find(
                (o) => o.option_text === "خطأ" || o.option_text === "خاطئ"
              );
              
              if (trueOption?.is_correct === 1) {
                correctAnswer = "true";
                correctAnswerText = "صح";
              } else if (falseOption?.is_correct === 1) {
                correctAnswer = "false";
                correctAnswerText = "خطأ";
              } else {
                // Fallback: use the original option structure
                correctAnswer = correctOption?.id;
                correctAnswerText = stripHtml(correctOption?.option_text);
                formattedOptions = q.options.map((opt) => ({
                  id: opt.id,
                  text: stripHtml(opt.option_text),
                  textHtml: opt.option_text,
                  isCorrect: opt.is_correct === 1,
                }));
              }
            } else {
              // MCQ or other types
              formattedOptions = q.options.map((opt) => ({
                id: opt.id,
                text: stripHtml(opt.option_text),
                textHtml: opt.option_text,
                isCorrect: opt.is_correct === 1,
              }));
              correctAnswer = correctOption?.id || null;
              correctAnswerText = stripHtml(correctOption?.option_text) || null;
            }

            const questionData = {
              id: q.id,
              text: stripHtml(q.question_text),
              textHtml: q.question_text,
              options: formattedOptions,
              correctAnswer: correctAnswer,
              correctAnswerText: correctAnswerText,
              explanation:
                stripHtml(correctOption?.question_explanation) ||
                "لا يوجد تفسير متاح.",
              instructions: q.instructions || "",
              type: questionType,
              sectionId: section.id,
              sectionTitle: stripHtml(sectionTitle),
              globalIndex: globalQuestionIndex++,
            };

            blocks.push({
              type: questionType,
              passage: null,
              questions: [questionData],
            });

            allQuestions.push(questionData);
          });
        }

        // Add section if it has blocks
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
      state.questions = allQuestions;
      state.examData = apiSections;
      state.currentSectionIndex = 0;
      state.currentBlockIndex = 0;
      state.currentQuestionInBlockIndex = 0;
      state.currentIndex = 0;
    },

    // Legacy setExamData - for backward compatibility
    setExamData: (state, action) => {
      const data = action.payload;
      state.examData = data;

      // Check if data has the new structure
      if (data?.sections && data?.examInfo) {
        // Use initializeExam logic
        examSlice.caseReducers.initializeExam(state, {
          payload: { sections: data.sections, examInfo: data.examInfo },
        });
        return;
      }

      // Check if data is message wrapper
      if (data?.message?.sections) {
        examSlice.caseReducers.initializeExam(state, {
          payload: {
            sections: data.message.sections,
            examInfo: data.message.exam_info,
          },
        });
        return;
      }

      const allQuestions = [];
      const processedIds = new Set();

      if (Array.isArray(data)) {
        data.forEach((section) => {
          // Process paragraphs first
          section.paragraphs?.forEach((paraObj) => {
            paraObj.questions?.forEach((question) => {
              processedIds.add(question.id);
              const correctOption = question.options?.find(
                (opt) => opt.is_correct === 1
              );

              allQuestions.push({
                id: question.id,
                type: "paragraph",
                text: stripHtml(question.question_text),
                textHtml: question.question_text,
                instructions: question.instructions,
                imageUrl: question.image_url || undefined,
                sectionId: section.id,
                sectionTitle: stripHtml(section.title),
                passage: paraObj.paragraph?.paragraph_content || "",
                options:
                  question.options?.map((opt) => ({
                    id: opt.id,
                    text: stripHtml(opt.option_text),
                    label: stripHtml(opt.option_text),
                    textHtml: opt.option_text,
                    labelHtml: opt.option_text,
                    isCorrect: opt.is_correct === 1,
                    explanation: stripHtml(opt.question_explanation),
                    explanationHtml: opt.question_explanation,
                  })) || [],
                correctAnswer: correctOption?.id || null,
                correctAnswerId: correctOption?.id || null,
                correctAnswerText: stripHtml(correctOption?.option_text) || null,
              });
            });
          });

          // MCQ questions
          section.mcq?.forEach((question) => {
            // Skip if already processed
            if (processedIds.has(question.id)) return;

            const questionType = mapQuestionType(question.question_type);
            const correctOption = question.options?.find(
              (opt) => opt.is_correct === 1
            );

            allQuestions.push({
              id: question.id,
              type: questionType,
              text: stripHtml(question.question_text),
              textHtml: question.question_text,
              instructions: question.instructions,
              imageUrl: question.image_url || undefined,
              sectionId: section.id,
              sectionTitle: stripHtml(section.title),
              options:
                question.options?.map((opt) => ({
                  id: opt.id,
                  text: stripHtml(opt.option_text),
                  label: stripHtml(opt.option_text),
                  textHtml: opt.option_text,
                  labelHtml: opt.option_text,
                  isCorrect: opt.is_correct === 1,
                  explanation: stripHtml(opt.question_explanation),
                  explanationHtml: opt.question_explanation,
                })) || [],
              correctAnswer: correctOption?.id || null,
              correctAnswerId: correctOption?.id || null,
              correctAnswerText: stripHtml(correctOption?.option_text) || null,
            });
          });

          // Boolean questions (if separate array exists)
          section.boolean?.forEach((question) => {
            if (processedIds.has(question.id)) return;

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

          // Text questions (if separate array exists)
          section.text?.forEach((question) => {
            if (processedIds.has(question.id)) return;

            allQuestions.push({
              id: question.id,
              type: "text",
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
      const newSectionIndex = action.payload;
      if (newSectionIndex < 0 || newSectionIndex >= state.sections.length) return;

      state.currentSectionIndex = newSectionIndex;
      state.currentBlockIndex = 0;
      state.currentQuestionInBlockIndex = 0;

      // Update global currentIndex
      const newBlock = state.sections[newSectionIndex]?.blocks[0];
      if (newBlock?.questions?.[0]) {
        const questionId = newBlock.questions[0].id;
        const globalIndex = state.questions.findIndex((q) => q.id === questionId);
        if (globalIndex >= 0) state.currentIndex = globalIndex;
      }
    },

    setCurrentBlockIndex: (state, action) => {
      const newBlockIndex = action.payload;
      const currentSection = state.sections[state.currentSectionIndex];
      if (!currentSection || newBlockIndex < 0 || newBlockIndex >= currentSection.blocks.length) return;

      state.currentBlockIndex = newBlockIndex;
      state.currentQuestionInBlockIndex = 0;

      // Update global currentIndex
      const newBlock = currentSection.blocks[newBlockIndex];
      if (newBlock?.questions?.[0]) {
        const questionId = newBlock.questions[0].id;
        const globalIndex = state.questions.findIndex((q) => q.id === questionId);
        if (globalIndex >= 0) state.currentIndex = globalIndex;
      }
    },

    // NEW: Navigate within paragraph block
    setCurrentQuestionInBlockIndex: (state, action) => {
      const newIndex = action.payload;
      const currentBlock = state.sections[state.currentSectionIndex]?.blocks[state.currentBlockIndex];
      if (!currentBlock || newIndex < 0 || newIndex >= currentBlock.questions.length) return;

      state.currentQuestionInBlockIndex = newIndex;

      // Update global currentIndex
      const question = currentBlock.questions[newIndex];
      if (question) {
        const globalIndex = state.questions.findIndex((q) => q.id === question.id);
        if (globalIndex >= 0) state.currentIndex = globalIndex;
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

    // Legacy navigation - navigate by global question index
    setCurrentIndex: (state, action) => {
      const targetIndex = action.payload;
      if (targetIndex < 0 || targetIndex >= state.questions.length) return;

      state.currentIndex = targetIndex;

      // Find section, block, and question-in-block indices
      const targetQuestion = state.questions[targetIndex];
      if (!targetQuestion) return;

      for (let sIdx = 0; sIdx < state.sections.length; sIdx++) {
        const section = state.sections[sIdx];
        for (let bIdx = 0; bIdx < section.blocks.length; bIdx++) {
          const block = section.blocks[bIdx];
          const qInBlockIdx = block.questions.findIndex(
            (q) => q.id === targetQuestion.id
          );
          if (qInBlockIdx >= 0) {
            state.currentSectionIndex = sIdx;
            state.currentBlockIndex = bIdx;
            state.currentQuestionInBlockIndex = qInBlockIdx;
            return;
          }
        }
      }
    },

    nextQuestion: (state) => {
      const currentSection = state.sections[state.currentSectionIndex];
      const currentBlock = currentSection?.blocks[state.currentBlockIndex];

      if (!currentBlock) {
        // Legacy fallback
        if (state.currentIndex < state.questions.length - 1) {
          state.currentIndex += 1;
        }
        return;
      }

      // Check if there are more questions in current block
      if (state.currentQuestionInBlockIndex < currentBlock.questions.length - 1) {
        state.currentQuestionInBlockIndex += 1;
        state.currentIndex += 1;
        return;
      }

      // Move to next block
      if (state.currentBlockIndex < currentSection.blocks.length - 1) {
        state.currentBlockIndex += 1;
        state.currentQuestionInBlockIndex = 0;
        state.currentIndex += 1;
        return;
      }

      // Move to next section
      if (state.currentSectionIndex < state.sections.length - 1) {
        state.currentSectionIndex += 1;
        state.currentBlockIndex = 0;
        state.currentQuestionInBlockIndex = 0;
        state.currentIndex += 1;
      }
    },

    prevQuestion: (state) => {
      const currentSection = state.sections[state.currentSectionIndex];
      const currentBlock = currentSection?.blocks[state.currentBlockIndex];

      if (!currentBlock) {
        // Legacy fallback
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
        }
        return;
      }

      // Check if there are previous questions in current block
      if (state.currentQuestionInBlockIndex > 0) {
        state.currentQuestionInBlockIndex -= 1;
        state.currentIndex -= 1;
        return;
      }

      // Move to previous block
      if (state.currentBlockIndex > 0) {
        state.currentBlockIndex -= 1;
        const prevBlock = currentSection.blocks[state.currentBlockIndex];
        state.currentQuestionInBlockIndex = prevBlock.questions.length - 1;
        state.currentIndex -= 1;
        return;
      }

      // Move to previous section
      if (state.currentSectionIndex > 0) {
        state.currentSectionIndex -= 1;
        const prevSection = state.sections[state.currentSectionIndex];
        state.currentBlockIndex = prevSection.blocks.length - 1;
        const prevBlock = prevSection.blocks[state.currentBlockIndex];
        state.currentQuestionInBlockIndex = prevBlock.questions.length - 1;
        state.currentIndex -= 1;
      }
    },

    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;

      const question = state.questions.find((q) => q.id === questionId);
      if (!question) return;

      // Update answeredMap for UI
      state.answeredMap[questionId] = answer;

      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.question_id === questionId
      );

      let studentAnswerText = null;
      let correctAnswerText = null;
      let isCorrect = false;

      if (question.type === "mcq" || question.type === "paragraph") {
        const selectedOption = question.options?.find((opt) => opt.id === answer);
        studentAnswerText = selectedOption
          ? selectedOption.text || selectedOption.label
          : null;
        correctAnswerText = question.correctAnswerText;
        isCorrect = answer === question.correctAnswer;
      } else if (question.type === "boolean") {
        studentAnswerText = String(answer);
        correctAnswerText = String(question.correctAnswer);
        isCorrect = String(answer) === String(question.correctAnswer);
      } else if (question.type === "text") {
        studentAnswerText = answer;
        correctAnswerText = question.correctAnswer || "";
        isCorrect = false; // Text answers need manual grading
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
      if (!Array.isArray(questionIds) || questionIds.length === 0) return;
      
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
  setCurrentQuestionInBlockIndex,
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
  closeExam,
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
export const selectCurrentQuestionInBlockIndex = (state) => state.exam.currentQuestionInBlockIndex;
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

// NEW: Get current question from block (handles multi-question blocks)
export const selectCurrentQuestionFromBlock = (state) => {
  const block = selectCurrentBlock(state);
  const { currentQuestionInBlockIndex } = state.exam;
  return block?.questions[currentQuestionInBlockIndex] || null;
};

export const selectCurrentQuestion = (state) => {
  // Try to get from block first (more accurate for paragraph blocks)
  const blockQuestion = selectCurrentQuestionFromBlock(state);
  if (blockQuestion) return blockQuestion;
  
  // Fallback to global index
  return state.exam.questions[state.exam.currentIndex] || null;
};

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

// NEW: Check if at first/last question
export const selectIsFirstQuestion = (state) => state.exam.currentIndex === 0;
export const selectIsLastQuestion = (state) => 
  state.exam.currentIndex === state.exam.questions.length - 1;

// NEW: Get answered count
export const selectAnsweredCount = (state) => 
  Object.keys(state.exam.answeredMap).length;

// NEW: Get progress percentage
export const selectProgressPercentage = (state) => {
  const total = state.exam.questions.length;
  if (total === 0) return 0;
  const answered = Object.keys(state.exam.answeredMap).length;
  return Math.round((answered / total) * 100);
};