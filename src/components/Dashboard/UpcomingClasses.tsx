import { GraduationCap } from "lucide-react";
import { ClassDetail } from "@/hooks/useClassDetails";

interface UpcomingClassesProps {
  classes: ClassDetail[];
}

const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-xl shadow-lg p-6 border border-stone-800 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <GraduationCap className="mr-2 text-yellow-400" />
        Upcoming Classes
      </h2>
      {classes.length === 0 ? (
        <p className="text-gray-400">No upcoming classes</p>
      ) : (
        <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {classes.map((cls, index) => (
            <li key={index} className="border-b border-stone-700 pb-3 last:border-none">
              <h3 className="font-medium text-yellow-500 text-xl">{cls.course}</h3>
              <p className="text-sm text-stone-400">
                {cls.time} - {cls.faculty}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingClasses;
