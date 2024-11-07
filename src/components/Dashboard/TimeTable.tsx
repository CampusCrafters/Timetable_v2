import { Calendar } from "lucide-react";

const Timetable = () => {
  const schedule = [
    { day: "Monday", classes: ["Math", "Physics", "English", "History", "Geography"] },
    { day: "Tuesday", classes: ["Chemistry", "Biology", "History", "Math", "Literature"] },
    { day: "Wednesday", classes: ["Computer Science", "Art", "Physical Education", "Music", "Economics"] },
    { day: "Thursday", classes: ["Literature", "Geography", "Music", "Math", "Physics"] },
    { day: "Friday", classes: ["Economics", "Foreign Language", "Social Studies", "Art", "Physical Education"] },
  ];

  return (
    <div className="bg-stone-900 text-white rounded-lg shadow-lg p-6 border border-stone-950 hover:border-yellow-500/50 transition-colors max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2 text-yellow-500" />
        Weekly Timetable
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-800 text-yellow-500">
              <th className="py-2 px-4 text-left">Day</th>
              <th className="py-2 px-4 text-left">Classes</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((day) => (
              <tr key={day.day} className="border-b border-stone-700">
                <td className="py-2 px-4 font-medium">{day.day}</td>
                <td className="py-2 px-4 whitespace-normal">{day.classes.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
