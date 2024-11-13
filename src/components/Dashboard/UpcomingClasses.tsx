import { GraduationCap } from "lucide-react";
import { UpcomingClass } from "../Interfaces";

const UpcomingClasses = (upcomingClasses: UpcomingClass) => {
  const classes = [
    { id: 1, name: "Physics", time: "11:30 AM", instructor: "Prof. Johnson" },
    { id: 2, name: "Computer Science", time: "2:00 PM", instructor: "Ms. Davis" },
    { id: 3, name: "Biology", time: "3:30 PM", instructor: "Dr. Lee" },
  ];

  return (
    <div className="bg-stone-900 text-white rounded-lg shadow-lg p-6 border border-stone-950 hover:border-yellow-500/50 transition-colors">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <GraduationCap className="mr-2 text-yellow-500" />
        Upcoming Classes
      </h2>
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="border-b border-stone-700 pb-2">
            <h3 className="font-medium text-yellow-500">{cls.name}</h3>
            <p className="text-sm text-stone-400">
              {cls.time} - {cls.instructor}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingClasses;
