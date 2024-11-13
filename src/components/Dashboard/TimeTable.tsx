import { Calendar } from "lucide-react";
import { useState } from "react";

const Timetable = ({ timetables }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const timetable = timetables.timetables;

  const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        className="sm:hidden bg-yellow-500 text-stone-900 p-3 rounded-lg shadow-md flex items-center"
        onClick={togglePopup}
      >
        <Calendar className="mr-2" />
        Open Timetable
      </button>

      {/* Popup for mobile */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-stone-900 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-4">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Calendar className="mr-2 text-yellow-500" />
              Weekly Timetable
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse table-auto">
                <thead>
                  <tr className="bg-stone-800 text-yellow-500">
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">Day</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">9-9:55</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">10-10:55</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">11:05-12</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">12:05-1</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">2-2:55</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">3-3:55</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">4-4:55</th>
                    <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">5-7</th>
                  </tr>
                </thead>
                <tbody>
                  {orderedDays.map((day) => {
                    const daySchedule = timetable.find((d: any) => d.day === day);

                    return (
                      <tr key={day} className="text-center">
                        <td className="py-3 px-4 font-bold text-yellow-400 border border-stone-700 text-xs sm:text-base">
                          {day}
                        </td>
                        {(daySchedule?.timetables || []).map((entry: any, index: number) => (
                          <td key={index} className="py-3 px-4 border border-stone-700 text-stone-300 text-xs sm:text-base">
                            {entry.course_id || "-"}
                          </td>
                        ))}
                        {Array(8 - (daySchedule?.timetables.length || 0)).fill(null).map((_, i) => (
                          <td key={`empty-${i}`} className="py-3 px-4 border border-stone-700 text-xs sm:text-base">
                            -
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={togglePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Full timetable for larger screens */}
      <div className="hidden sm:block bg-stone-900 text-white rounded-lg shadow-lg p-6 border border-stone-950 hover:border-yellow-500/50 transition-colors max-w-6xl mx-auto max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Calendar className="mr-2 text-yellow-500" />
          Weekly Timetable
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-stone-800 text-yellow-500">
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">Day</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">9-9:55</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">10-10:55</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">11:05-12</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">12:05-1</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">2-2:55</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">3-3:55</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">4-4:55</th>
                <th className="py-3 px-4 border border-stone-700 text-xs sm:text-base">5-7</th>
              </tr>
            </thead>
            <tbody>
              {orderedDays.map((day) => {
                const daySchedule = timetable.find((d: any) => d.day === day);

                return (
                  <tr key={day} className="text-center">
                    <td className="py-3 px-4 font-bold text-yellow-400 border border-stone-700 text-xs sm:text-base">
                      {day}
                    </td>
                    {(daySchedule?.timetables || []).map((entry: any, index: number) => (
                      <td key={index} className="py-3 px-4 border border-stone-700 text-stone-300 text-xs sm:text-base">
                        {entry.course_id || "-"}
                      </td>
                    ))}
                    {Array(8 - (daySchedule?.timetables.length || 0)).fill(null).map((_, i) => (
                      <td key={`empty-${i}`} className="py-3 px-4 border border-stone-700 text-xs sm:text-base">
                        -
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
