import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useTimetable = (detail: string | null) => {
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState<unknown>(null);
  const router = useRouter();

  useEffect(() => {
    if (!detail) return;

    const fetchTimetable = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post('/api/timetable/admin', {
          userDetails: detail,
        });
        if (response.data.timetables?.length == 0) {
          router.push('/admin/upload');
        }
        else {
          setTimetables(response.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetable();
  }, [detail, router]);

  return { timetables, isLoading, err };
};

export default useTimetable;
