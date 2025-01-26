import React from 'react';
import { CalendarIcon } from 'lucide-react';

const NoTimetable = () => {
  return (
    <div className="max-w-lg mx-auto bg-inherit rounded-lg p-8">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <CalendarIcon className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-stone-100">No Timetable Found</h2>
      </div>
      <p className="text-center text-stone-300">
        It seems like there is no timetable available for the selected year, course, and batch.
        Please try again later or check with the admin for the correct details.
      </p>
    </div>
  );
};

export default NoTimetable;
