import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { Trophy, XCircle, RefreshCcw } from 'lucide-react';

export const QuizResults: React.FC = () => {
  const { quizHistory } = useQuizStore();
  const latestQuiz = quizHistory[quizHistory.length - 1];

  if (!latestQuiz) return null;

  const averageScore = quizHistory.reduce((acc, quiz) => acc + quiz.score, 0) / quizHistory.length;
  const scoreImprovement = quizHistory.length > 1
    ? latestQuiz.score - quizHistory[quizHistory.length - 2].score
    : 0;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-gray-600">Your score: {latestQuiz.score}%</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Quizzes Taken</p>
            <p className="text-2xl font-bold">{quizHistory.length}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-2xl font-bold">{Math.round(averageScore)}%</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Improvement</p>
            <p className={`text-2xl font-bold ${scoreImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {scoreImprovement > 0 ? '+' : ''}{scoreImprovement}%
            </p>
          </div>
        </div>

        {latestQuiz.incorrectAnswers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Review Incorrect Answers</h3>
            <div className="space-y-4">
              {latestQuiz.incorrectAnswers.map((answer, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <XCircle className="text-red-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-2">{answer.question}</p>
                      <p className="text-sm text-red-600">Your answer: {answer.userAnswer}</p>
                      <p className="text-sm text-green-600">Correct answer: {answer.correctAnswer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <RefreshCcw className="mr-2" size={20} />
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};