import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentTime } from '@/utils/helpers/today';

export type ClassDetail = {
  course: string;
  faculty: string;
  time: string;
};

export interface ClassDetails {
  currentClass: ClassDetail;
  nextClasses: ClassDetail[];
}

const useClassDetails = () => {
  const [classDetails, setClassDetails] = useState<ClassDetails>({
    currentClass: { course: "", faculty: "", time: "" },
    nextClasses: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/getclasses");
      const timetables = response.data.timetables;

      if (timetables && timetables.length > 0) {
        const currentTime = getCurrentTime();
        const currentClass = timetables.find((classInfo: any) => {
          if (!classInfo.timings) return false;
          const [startTime, endTime] = classInfo.timings.split("-");
          return currentTime >= startTime && currentTime <= endTime;
        });

        const nextClasses = timetables
          .filter((classInfo: { timings: any }) => {
            const [startTime] = classInfo.timings.split("-");
            return currentTime < startTime;
          })
          .map((classInfo: { course_id: string; course_lecturer_name: string; timings: string }) => {
            const [startTime, endTime] = classInfo.timings.split("-");
            return {
              course: classInfo.course_id,
              faculty: classInfo.course_lecturer_name,
              time: `${startTime} - ${endTime}`,
            };
          });

        setClassDetails({
          currentClass: currentClass
            ? {
                course: currentClass.course_id,
                faculty: currentClass.course_lecturer_name,
                time: currentClass.timings,
              }
            : { course: "No scheduled class", faculty: "---", time: "---" },
          nextClasses,
        });
      } else {
        setClassDetails({
          currentClass: { course: "Enjoy your break!", faculty: "---", time: "---" },
          nextClasses: [],
        });
      }
    } catch (err) {
      setError("Failed to fetch timetable. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return { classDetails, error, loading }; 
};

export default useClassDetails;
