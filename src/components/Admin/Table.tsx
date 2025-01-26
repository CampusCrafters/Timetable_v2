import React from "react";
import Class from './Class';
import { Calendar } from "lucide-react";

const Timetable = ({ timetables }: any) => {
  const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["9-9:55", "10-10:55", "11:05-12", "12:05-1", "2-2:55", "3-3:55", "4-4:55", "5-7"];

  return (
    <div className="bg-stone-900 text-white p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
        <Calendar className="mr-2 text-yellow-500 h-5 w-5 sm:h-6 sm:w-6" />
        Weekly Timetable
      </h2>
      
      {/* Desktop view - Regular table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-stone-900 text-yellow-500 border-b border-stone-700">
              <th className="py-2 px-2 sm:py-3 sm:px-3">Day</th>
              {timeSlots.map((time) => (
                <th key={time} className="py-2 px-2 sm:py-3 sm:px-3 text-sm sm:text-base">{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderedDays.map((day, idx) => {
              const daySchedule = timetables.timetables.find((d: any) => d.day === day);
              return (
                <tr key={day} className={`text-center transition-colors
                  ${idx % 2 === 0 ? 'bg-stone-900/50' : 'bg-stone-900'}`}>
                  <td className="py-2 px-2 sm:py-3 sm:px-3 font-bold text-yellow-400 text-left">{day}</td>
                  {(daySchedule?.timetables || []).map((entry: any, index: number) => (
                    <td key={index} className="p-1 sm:p-2">
                      <Class className={entry.course_id} timings={entry.timings} />
                    </td>
                  ))}
                  {Array(Math.max(0, 8 - (daySchedule?.timetables.length || 0))).fill(null).map((_, i) => (
                    <td key={`empty-${i}`} className="p-1 sm:p-2 text-stone-600">-</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view - Stacked cards */}
      <div className="md:hidden space-y-4">
        {orderedDays.map((day) => {
          const daySchedule = timetables.timetables.find((d: any) => d.day === day);
          return (
            <div key={day} className="bg-stone-900 rounded-lg p-4">
              <h3 className="text-yellow-400 font-bold text-lg mb-3">{day}</h3>
              <div className="space-y-2">
                {timeSlots.map((time, timeIndex) => {
                  const classForTime = daySchedule?.timetables[timeIndex];
                  return (
                    <div key={time} className="flex justify-between items-center py-2 border-b border-stone-700/50 last:border-0">
                      <span className="text-stone-400 text-sm">{time}</span>
                      <div className="flex-grow text-right">
                        {classForTime ? (
                          <Class className={classForTime.course_id} timings={classForTime.timings} />
                        ) : (
                          <span className="text-stone-600">-</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll indicator for desktop view */}
      <div className="hidden md:block text-center mt-4 text-stone-400 text-sm">
        <span>← Scroll horizontally if needed →</span>
      </div>
    </div>
  );
};

export default Timetable;