import React, { useState } from 'react';
import { useQuizStore } from '../store/quizStore';
import { User } from '../types/database';
import { UserCircle, UserPlus, GraduationCap } from 'lucide-react';

export const UserSelection: React.FC = () => {
  const { users, addUser, selectUser } = useQuizStore();
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      setIsAddingUser(false);
    }
  };

  const handleUserSelect = (user: User) => {
    selectUser(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CDT Exam Preparation</h1>
          <p className="text-lg text-gray-600">Select your profile to begin the quiz</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <UserCircle className="h-12 w-12 text-blue-500 mr-4" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">Continue your preparation</p>
              </div>
            </button>
          ))}
        </div>

        {isAddingUser ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Enter name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                onClick={handleAddUser}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingUser(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingUser(true)}
            className="w-full flex items-center justify-center p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 hover:bg-gray-100 transition-colors duration-200"
          >
            <UserPlus className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Add New User</span>
          </button>
        )}
      </div>
    </div>
  );
};