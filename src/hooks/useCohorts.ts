import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Tables } from '../types/supabase';

export type Cohort = Tables<'curriculums'> & {
  curriculum: string[];
};

export function useCohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCohorts() {
      try {
        setLoading(true);
        
        // Fetch curriculums with their courses
        const { data: curriculumsData, error: curriculumsError } = await supabase
          .from('curriculums')
          .select(`
            *,
            courses (
              title,
              subject,
              order_index
            )
          `)
          .order('id');

        if (curriculumsError) throw curriculumsError;

        // Transform the data to match the expected format
        const transformedCohorts: Cohort[] = (curriculumsData || []).map(curriculum => {
          // Get top 5 course titles as curriculum highlights
          const courseHighlights = curriculum.courses
            ?.sort((a, b) => a.order_index - b.order_index)
            .slice(0, 5)
            .map(course => course.title) || [];

          return {
            ...curriculum,
            curriculum: courseHighlights,
          };
        });

        setCohorts(transformedCohorts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cohorts');
      } finally {
        setLoading(false);
      }
    }

    fetchCohorts();
  }, []);

  return { cohorts, loading, error };
}