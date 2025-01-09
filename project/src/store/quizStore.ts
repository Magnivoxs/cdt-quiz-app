import { create } from 'zustand';
import type { Question, QuizState, User } from '../types/database';

interface QuizStore extends QuizState {
  initializeQuiz: (questions: Question[]) => void;
  selectAnswer: (questionIndex: number, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  addUser: (name: string) => void;
  selectUser: (user: User) => void;
  setQuizLength: (length: number) => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuiz: [],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  quizHistory: [],
  isQuizComplete: false,
  users: [
    { id: '1', name: 'David Ragland' },
    { id: '2', name: 'Branen Dixon' }
  ],
  selectedUser: null,
  quizLength: null,

  initializeQuiz: (allQuestions) => {
    const { quizLength } = get();
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, quizLength || 50);
    
    const randomizedQuestions = selected.map(q => ({
      ...q,
      options: [...q.options].sort(() => 0.5 - Math.random())
    }));

    set({
      currentQuiz: randomizedQuestions,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isQuizComplete: false
    });
  },

  selectAnswer: (questionIndex, answer) => {
    set(state => ({
      selectedAnswers: {
        ...state.selectedAnswers,
        [questionIndex]: answer
      }
    }));
  },

  nextQuestion: () => {
    const { currentQuestionIndex, currentQuiz } = get();
    if (currentQuestionIndex < currentQuiz.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  completeQuiz: () => {
    const { currentQuiz, selectedAnswers, selectedUser } = get();
    
    if (!selectedUser) return;

    const incorrectAnswers = currentQuiz
      .filter((q, idx) => selectedAnswers[idx] !== q.correctAnswer)
      .map((q, idx) => ({
        question: q.question,
        userAnswer: selectedAnswers[idx],
        correctAnswer: q.correctAnswer
      }));

    const score = ((currentQuiz.length - incorrectAnswers.length) * 2);

    set(state => ({
      isQuizComplete: true,
      quizHistory: [
        ...state.quizHistory,
        {
          date: new Date().toISOString(),
          score,
          incorrectAnswers
        }
      ]
    }));
  },

  addUser: (name) => {
    set(state => ({
      users: [
        ...state.users,
        { id: String(state.users.length + 1), name }
      ]
    }));
  },

  selectUser: (user) => {
    set({ selectedUser: user });
  },

  setQuizLength: (length) => {
    set({ quizLength: length });
  }
}));