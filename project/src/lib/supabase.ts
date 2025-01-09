import { createClient } from '@supabase/supabase-js';
import type { Question } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from('questions')
    .select('*');

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
}

export async function saveQuizResult(score: number, incorrectAnswers: any[]) {
  const { error } = await supabase
    .from('quiz_results')
    .insert([
      {
        score,
        incorrect_answers: incorrectAnswers,
        created_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error saving quiz result:', error);
  }
}