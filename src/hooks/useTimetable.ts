import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setError] = useState<unknown>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.post("/api/timetable");
        if(response.data.timetables.length == 0){
          router.push('/dashboard/not_found')
        }
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