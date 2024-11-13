import axios from 'axios';
import { useEffect, useState } from 'react';

const useTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.post("/api/timetable");
        setTimetables(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  return { timetables, isLoading, err };
};

export default useTimetable;