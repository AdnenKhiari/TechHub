import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Tables } from '../types/supabase';

type Course = Tables<'courses'>;

export function useCourses(curriculumId: number | null) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!curriculumId) {
      setCourses([]);
      return;
    }

    async function fetchCourses() {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('curriculum_id', curriculumId)
          .order('order_index', { ascending: true });

        if (error) throw error;
        setCourses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [curriculumId]);

  return { courses, loading, error };
}