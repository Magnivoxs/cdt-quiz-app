import React from 'react';
import { useQuizStore } from './store/quizStore';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResults } from './components/QuizResults';
import { UserSelection } from './components/UserSelection';
import { QuizLengthSelection } from './components/QuizLengthSelection';
import { GraduationCap } from 'lucide-react';
import questionsData from './questions.json';
import { useEffect } from 'react';

function App() {
  const { initializeQuiz, isQuizComplete, selectedUser, quizLength } = useQuizStore();

  useEffect(() => {
    if (selectedUser && quizLength) {
      initializeQuiz(questionsData.questions);
    }
  }, [selectedUser, quizLength]);

  if (!selectedUser) {
    return <UserSelection />;
  }

  if (!quizLength) {
    return <QuizLengthSelection />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">CDT Exam Prep</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Logged in as:</span>
              <span className="text-sm font-medium text-gray-900">{selectedUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isQuizComplete ? <QuizResults /> : <QuizQuestion />}
      </main>
    </div>
  );
}

export default App;