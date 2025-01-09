export interface Question {
  number: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface User {
  id: string;
  name: string;
}

export interface QuizState {
  currentQuiz: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  quizHistory: {
    date: string;
    score: number;
    incorrectAnswers: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
    }[];
  }[];
  isQuizComplete: boolean;
  users: User[];
  selectedUser: User | null;
  quizLength: number | null;
  addUser: (name: string) => void;
  selectUser: (user: User) => void;
  setQuizLength: (length: number) => void;
}