import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import clsx from 'clsx';

export const QuizQuestion: React.FC = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    selectedAnswers,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
  } = useQuizStore();

  const currentQuestion = currentQuiz[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.length - 1;
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  if (!currentQuestion) return null;

  const handleAnswerSelect = (answer: string) => {
    if (!selectedAnswer) { // Only allow selection if no answer has been chosen yet
      selectAnswer(currentQuestionIndex, answer);
    }
  };

  const handleNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      if (isLastQuestion) {
        completeQuiz();
      } else {
        nextQuestion();
      }
    } else {
      previousQuestion();
    }
  };

  const getAnswerStyles = (option: string) => {
    const optionLetter = option.charAt(0);
    const isSelected = selectedAnswer === optionLetter;
    const isCorrect = currentQuestion.correctAnswer === optionLetter;
    
    if (!selectedAnswer) {
      return "border-gray-200 hover:border-blue-200";
    }

    if (isCorrect) {
      return "border-green-500 bg-green-50 text-green-700";
    }

    if (isSelected && !isCorrect) {
      return "border-red-500 bg-red-50 text-red-700";
    }

    return "border-gray-200 opacity-50";
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {currentQuiz.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / currentQuiz.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const optionLetter = option.charAt(0);
            const isSelected = selectedAnswer === optionLetter;
            const isCorrect = currentQuestion.correctAnswer === optionLetter;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(optionLetter)}
                disabled={!!selectedAnswer}
                className={clsx(
                  "w-full text-left p-4 rounded-lg border transition-all relative",
                  getAnswerStyles(option)
                )}
              >
                {option}
                {selectedAnswer && (isSelected || isCorrect) && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isCorrect ? (
                      <Check className="text-green-500" size={20} />
                    ) : (
                      <X className="text-red-500" size={20} />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => handleNavigation('previous')}
          disabled={currentQuestionIndex === 0}
          className={clsx(
            "flex items-center px-4 py-2 rounded-lg",
            currentQuestionIndex === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          )}
        >
          <ChevronLeft size={20} className="mr-2" />
          Previous
        </button>

        <button
          onClick={() => handleNavigation('next')}
          disabled={!selectedAnswer}
          className={clsx(
            "flex items-center px-4 py-2 rounded-lg",
            selectedAnswer
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          {isLastQuestion ? 'Complete Quiz' : 'Next'}
          <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};