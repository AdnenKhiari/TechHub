import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useCurriculumTitles() {
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurriculumTitles() {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('curriculums')
          .select('title')
          .order('title');

        if (error) {
          throw error;
        }

        const curriculumTitles = data?.map(curriculum => curriculum.title) || [];
        // Add "Other / General Inquiry" as the last option
        setTitles([...curriculumTitles, "Other / General Inquiry"]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch curriculum titles');
        // Fallback to static data if there's an error
        setTitles([
          "Full-Stack Web Development Bootcamp",
          "AI & Machine Learning Engineer", 
          "Mobile App Development with React Native",
          "Data Science & Analytics",
          "Cloud Architecture & DevOps",
          "Cybersecurity Specialist",
          "Other / General Inquiry"
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchCurriculumTitles();
  }, []);

  return { titles, loading, error };
}