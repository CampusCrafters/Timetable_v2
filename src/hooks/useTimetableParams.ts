import axios from 'axios';
import { useEffect, useState } from 'react';

const useTimetable = (detail: string | null) => {
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!detail) return;

    const fetchTimetable = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post("/api/timetable/admin", {
          userDetails: detail,
        });
        setTimetables(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetable();
  }, [detail]);

  return { timetables, isLoading, err };
};

export default useTimetable;
