/*
  # CDT Quiz Database Schema

  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `number` (integer)
      - `question` (text)
      - `options` (text array)
      - `correct_answer` (text)
      - `created_at` (timestamp)
    
    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `score` (integer)
      - `incorrect_answers` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Questions table
CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer NOT NULL,
  question text NOT NULL,
  options text[] NOT NULL,
  correct_answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Quiz results table
CREATE TABLE quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  score integer NOT NULL,
  incorrect_answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Policies for questions
CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for quiz results
CREATE POLICY "Users can insert their own results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);