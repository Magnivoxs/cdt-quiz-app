import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { Timer, ArrowLeft } from 'lucide-react';

const QUIZ_LENGTHS = [
  { value: 10, time: '2-5 min' },
  { value: 20, time: '10-15 min' },
  { value: 30, time: '20-30 min' },
  { value: 50, time: '45-60 min' }
];

export const QuizLengthSelection: React.FC = () => {
  const { setQuizLength, selectedUser, selectUser } = useQuizStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button
          onClick={() => selectUser(null)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to User Selection
        </button>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Timer className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Quiz Length</h1>
          <p className="text-lg text-gray-600">
            Welcome, {selectedUser?.name}! Select how many questions you'd like to practice
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {QUIZ_LENGTHS.map(({ value, time }) => (
            <button
              key={value}
              onClick={() => setQuizLength(value)}
              className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="absolute top-4 right-4 text-sm font-medium text-gray-500">
                ~{time}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {value} Questions
                </h3>
                <p className="text-gray-600">
                  {value === 50 ? 'Full practice exam' : 'Quick practice session'}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 w-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};