import { GraduationCap } from "lucide-react";
import { ClassDetail } from "@/hooks/useClassDetails";

interface CurrentClassProps {
  classInfo: ClassDetail;
}

const CurrentClass = ({ classInfo }: CurrentClassProps) => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-900 text-white rounded-lg shadow-md p-6 border border-stone-700 hover:shadow-xl hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-4 space-x-3">
        <GraduationCap className="text-yellow-400 w-6 h-6" />
        <h2 className="text-xl font-semibold text-stone-100 tracking-tight">Current Class</h2>
      </div>
      <h3 className="text-2xl font-bold text-yellow-400 mb-1">
        {classInfo.course || "No class in session"}
      </h3>
      <p className="text-base text-stone-300 leading-relaxed">
        {classInfo.time ? `${classInfo.time} - ${classInfo.faculty}` : "No scheduled time"}
      </p>
    </div>
  );
};

export default CurrentClass;
