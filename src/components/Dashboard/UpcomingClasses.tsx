import { GraduationCap } from "lucide-react";
import { ClassDetail } from "@/hooks/useClassDetails";

interface UpcomingClassesProps {
  classes: ClassDetail[];
}

const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-900 text-white rounded-lg shadow-md p-6 border border-stone-700 hover:shadow-lg hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-4 space-x-3">
        <GraduationCap className="text-yellow-400 w-6 h-6" />
        <h2 className="text-xl font-semibold tracking-tight text-stone-100">Upcoming Classes</h2>
      </div>
      {classes.length === 0 ? (
        <p className="text-stone-400 text-base">No upcoming classes</p>
      ) : (
        <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {classes.map((cls, index) => (
            <li
              key={index}
              className="border-b border-stone-700 pb-3 last:border-none transition-colors hover:bg-stone-800/50 rounded-lg px-2"
            >
              <h3 className="text-lg font-bold text-yellow-400">{cls.course}</h3>
              <p className="text-sm text-stone-300">
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
