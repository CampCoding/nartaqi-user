import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examId: null,
  studentId: null,
  examData: null,
  examInfo: null,

  sections: [],
  questions: [],

  currentSectionIndex: 0,
  currentBlockIndex: 0,
  currentQuestionInBlockIndex: 0,
  currentIndex: 0,

  totalTimeInSeconds: 0,
  timeRemaining: 0,

  answers: [],
  answeredMap: {},
  flaggedMap: {},

  isStarted: false,
  isSubmitted: false,
  startTime: null,
  endTime: null,

  score: null,
  percentage: null,
  resultData: null,
};

const stripHtml = (html) => {
  if (!html) return "";
  return html;
};

const parseTimeToSeconds = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(":");
  if (parts.length === 3) {
    const [h, m, s] = parts.map(Number);
    return h * 3600 + m * 60 + (s || 0);
  }
  if (parts.length === 2) {
    const [m, s] = parts.map(Number);
    return m * 60 + (s || 0);
  }
  return parseInt(timeStr) || 0;
};

const mapQuestionType = (apiType) => {
  const typeMap = {
    mcq: "mcq",
    t_f: "t_f",
    paragraph_mcq: "paragraph",
    text: "text",
    boolean: "boolean",
  };
  return typeMap[apiType] || "mcq";
};

// ✅ Normalize boolean answer to "true"/"false"
const normalizeBooleanValue = (val) => {
  if (val === true) return "true";
  if (val === false) return "false";
  const s = String(val).toLowerCase().trim();
  if (s === "true" || s === "صح" || s === "صحيح") return "صحيح";
  if (s === "false" || s === "خطأ" || s === "خاطئ") return "خطأ";
  return String(val);
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

      if (examInfo?.time) {
        state.totalTimeInSeconds = parseTimeToSeconds(examInfo.time);
        state.timeRemaining = state.totalTimeInSeconds;
      }

      const transformedSections = [];
      const allQuestions = [];
      let globalQuestionIndex = 0;

      const processedParagraphQuestionIds = new Set();

      apiSections.forEach((section) => {
        const sectionTitle = section.title || "";
        const sectionDescription = section.description || "";
        const blocks = [];

        // 1) Paragraphs
        if (section.paragraphs?.length) {
          section.paragraphs.forEach((paraObj) => {
            const passage = paraObj.paragraph?.paragraph_content || "";
            const paragraphQuestions = [];

            paraObj.questions?.forEach((q) => {
              processedParagraphQuestionIds.add(q.id);

              if (!q.options?.length) return;

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
                  stripHtml(correctOption?.question_explanation) || "لا يوجد تفسير متاح.",
                instructions: q.instructions || "",
                type: "paragraph",
                sectionId: section.id,
                sectionTitle: stripHtml(sectionTitle),
                globalIndex: globalQuestionIndex++,
                passage,
              };

              paragraphQuestions.push(questionData);
              allQuestions.push(questionData);
            });

            if (paragraphQuestions.length) {
              blocks.push({
                type: "paragraph",
                passage,
                questions: paragraphQuestions,
              });
            }
          });
        }

        // 2) MCQ array (includes paragraph_mcq duplicated)
        if (section.mcq?.length) {
          section.mcq.forEach((q) => {
            if (processedParagraphQuestionIds.has(q.id)) return;
            if (!q.options?.length) return;
            
            const questionType = mapQuestionType(q.question_type);

            // ✅ FIX: boolean always "true"/"false"
            let formattedOptions = [];
            let correctAnswer = null;
            let correctAnswerText = null;

            if (questionType === "t_f") {
              const trueOpt = q.options.find((o) => ["صحيح", "صح" , "true" , true].includes(stripHtml(o.option_text)));
              const falseOpt = q.options.find((o) => ["خطأ", "خاطئ"  , "false" , false].includes(stripHtml(o.option_text)));

              const trueCorrect = trueOpt?.is_correct === 1;
              const falseCorrect = falseOpt?.is_correct === 1;

              formattedOptions = [
                { id: "true", text: "صح", textHtml: "صح", isCorrect: trueCorrect },
                { id: "false", text: "خطأ", textHtml: "خطأ", isCorrect: falseCorrect },
              ];

              if (trueCorrect) {
                correctAnswer = "صحيح";
                correctAnswerText = "صح";
              } else if (falseCorrect) {
                correctAnswer = "خطأ";
                correctAnswerText = "خطأ";
              } else {
                correctAnswer = null;
                correctAnswerText = null;
              }
            } else {
              const correctOption = q.options.find((o) => o.is_correct === 1);

              formattedOptions = q.options.map((opt) => ({
                id: opt.id,
                text: stripHtml(opt.option_text),
                textHtml: opt.option_text,
                isCorrect: opt.is_correct === 1,
              }));

              correctAnswer = correctOption?.id || null;
              correctAnswerText = stripHtml(correctOption?.option_text) || null;
            }

            const correctOptionForExplanation = q.options.find((o) => o.is_correct === 1);

            const questionData = {
              id: q.id,
              text: stripHtml(q.question_text),
              textHtml: q.question_text,
              options: formattedOptions,
              correctAnswer,
              correctAnswerText,
              explanation:
                stripHtml(correctOptionForExplanation?.question_explanation) || "لا يوجد تفسير متاح.",
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

        if (blocks.length) {
          transformedSections.push({
            id: section.id,
            title: sectionTitle,
            description: sectionDescription,
            blocks,
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

    setCurrentSectionIndex: (state, action) => {
      const newSectionIndex = action.payload;
      if (newSectionIndex < 0 || newSectionIndex >= state.sections.length) return;

      state.currentSectionIndex = newSectionIndex;
      state.currentBlockIndex = 0;
      state.currentQuestionInBlockIndex = 0;

      const newBlock = state.sections[newSectionIndex]?.blocks[0];
      if (newBlock?.questions?.[0]) {
        const qId = newBlock.questions[0].id;
        const gIdx = state.questions.findIndex((q) => q.id === qId);
        if (gIdx >= 0) state.currentIndex = gIdx;
      }
    },

    setCurrentBlockIndex: (state, action) => {
      const newBlockIndex = action.payload;
      const section = state.sections[state.currentSectionIndex];
      if (!section || newBlockIndex < 0 || newBlockIndex >= section.blocks.length) return;

      state.currentBlockIndex = newBlockIndex;
      state.currentQuestionInBlockIndex = 0;

      const newBlock = section.blocks[newBlockIndex];
      if (newBlock?.questions?.[0]) {
        const qId = newBlock.questions[0].id;
        const gIdx = state.questions.findIndex((q) => q.id === qId);
        if (gIdx >= 0) state.currentIndex = gIdx;
      }
    },

    setCurrentQuestionInBlockIndex: (state, action) => {
      const newIndex = action.payload;
      const block = state.sections[state.currentSectionIndex]?.blocks[state.currentBlockIndex];
      if (!block || newIndex < 0 || newIndex >= block.questions.length) return;

      state.currentQuestionInBlockIndex = newIndex;

      const q = block.questions[newIndex];
      if (q) {
        const gIdx = state.questions.findIndex((x) => x.id === q.id);
        if (gIdx >= 0) state.currentIndex = gIdx;
      }
    },

    decrementTime: (state) => {
      if (state.timeRemaining > 0) state.timeRemaining -= 1;
    },

    setCurrentIndex: (state, action) => {
      const targetIndex = action.payload;
      if (targetIndex < 0 || targetIndex >= state.questions.length) return;

      state.currentIndex = targetIndex;
      const targetQuestion = state.questions[targetIndex];
      if (!targetQuestion) return;

      for (let sIdx = 0; sIdx < state.sections.length; sIdx++) {
        const section = state.sections[sIdx];
        for (let bIdx = 0; bIdx < section.blocks.length; bIdx++) {
          const block = section.blocks[bIdx];
          const qInBlockIdx = block.questions.findIndex((q) => q.id === targetQuestion.id);
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
      const section = state.sections[state.currentSectionIndex];
      const block = section?.blocks[state.currentBlockIndex];

      if (!block) {
        if (state.currentIndex < state.questions.length - 1) state.currentIndex += 1;
        return;
      }

      if (state.currentQuestionInBlockIndex < block.questions.length - 1) {
        state.currentQuestionInBlockIndex += 1;
        state.currentIndex += 1;
        return;
      }

      if (state.currentBlockIndex < section.blocks.length - 1) {
        state.currentBlockIndex += 1;
        state.currentQuestionInBlockIndex = 0;
        state.currentIndex += 1;
        return;
      }

      if (state.currentSectionIndex < state.sections.length - 1) {
        state.currentSectionIndex += 1;
        state.currentBlockIndex = 0;
        state.currentQuestionInBlockIndex = 0;
        state.currentIndex += 1;
      }
    },

    prevQuestion: (state) => {
      const section = state.sections[state.currentSectionIndex];
      const block = section?.blocks[state.currentBlockIndex];

      if (!block) {
        if (state.currentIndex > 0) state.currentIndex -= 1;
        return;
      }

      if (state.currentQuestionInBlockIndex > 0) {
        state.currentQuestionInBlockIndex -= 1;
        state.currentIndex -= 1;
        return;
      }

      if (state.currentBlockIndex > 0) {
        state.currentBlockIndex -= 1;
        const prevBlock = section.blocks[state.currentBlockIndex];
        state.currentQuestionInBlockIndex = prevBlock.questions.length - 1;
        state.currentIndex -= 1;
        return;
      }

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

      state.answeredMap[questionId] = answer;

      const existingIdx = state.answers.findIndex((a) => a.question_id === questionId);

      let studentAnswerText = null;
      let correctAnswerText = null;
      let isCorrect = false;

      if (question.type === "mcq" || question.type === "paragraph" ) {
        const selected = question.options?.find((opt) => opt.id === answer);
        studentAnswerText = selected ? selected.text : null;
        correctAnswerText = question.correctAnswerText;
        isCorrect = answer === question.correctAnswer;
      } else if (question.type === "t_f") {
        const normalized = normalizeBooleanValue(answer);
        studentAnswerText = normalized;
        correctAnswerText = question.correctAnswer; // "true"/"false"
        isCorrect = normalized === question.correctAnswer;
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

      if (existingIdx >= 0) state.answers[existingIdx] = answerObject;
      else state.answers.push(answerObject);
    },

    toggleFlag: (state, action) => {
      const questionId = action.payload;
      state.flaggedMap[questionId] = !state.flaggedMap[questionId];
    },

    toggleBlockFlag: (state, action) => {
      const ids = action.payload;
      if (!Array.isArray(ids) || !ids.length) return;
      const isFlagged = state.flaggedMap[ids[0]];
      ids.forEach((id) => (state.flaggedMap[id] = !isFlagged));
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
  setCurrentSectionIndex,
  setCurrentBlockIndex,
  setCurrentQuestionInBlockIndex,
  decrementTime,
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

export const selectCurrentQuestionFromBlock = (state) => {
  const block = selectCurrentBlock(state);
  const { currentQuestionInBlockIndex } = state.exam;
  return block?.questions[currentQuestionInBlockIndex] || null;
};

export const selectCurrentQuestion = (state) => {
  const q = selectCurrentQuestionFromBlock(state);
  return q || state.exam.questions[state.exam.currentIndex] || null;
};

export const selectTimeRemaining = (state) => state.exam.timeRemaining;
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

export const selectIsFirstQuestion = (state) => state.exam.currentIndex === 0;
export const selectIsLastQuestion = (state) =>
  state.exam.currentIndex === state.exam.questions.length - 1;


export const selectExamScore = (state) => state.exam.score;
export const selectExamPercentage = (state) => state.exam.percentage;
export const selectExamResultData = (state) => state.exam.resultData;