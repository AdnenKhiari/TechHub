import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Tables } from '../types/supabase';

export type Course = Tables<'courses'>;
export type Curriculum = Tables<'curriculums'> & {
  courses?: Course[];
};

export function useCurriculums() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurriculums() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('curriculums')
          .select('*')
          .order('id');

        if (error) throw error;
        setCurriculums(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch curriculums');
      } finally {
        setLoading(false);
      }
    }

    fetchCurriculums();
  }, []);

  return { curriculums, loading, error };
}

export function useCurriculum(id: number) {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurriculum() {
      try {
        setLoading(true);
        
        // Fetch curriculum
        const { data: curriculumData, error: curriculumError } = await supabase
          .from('curriculums')
          .select('*')
          .eq('id', id)
          .single();

        if (curriculumError) throw curriculumError;

        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('curriculum_id', id)
          .order('order_index');

        if (coursesError) throw coursesError;

        setCurriculum(curriculumData);
        setCourses(coursesData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch curriculum');
      } finally {
        setLoading(false);
      }
    }

    fetchCurriculum();
  }, [id]);

  return { curriculum, courses, loading, error };
}
