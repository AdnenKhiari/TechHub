import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Course {
  id: number;
  curriculum_id: number;
  title: string;
  subject: string;
  description: string;
  hours: number;
  order_index: number;
  details?: string[];
}

export interface Curriculum {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  start_date: string;
  description: string;
  total_hours: number;
  outcomes?: string[];
  prerequisites?: string[];
  video_url?: string;
  courses?: Course[];
}

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
