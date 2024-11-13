import { GraduationCap } from "lucide-react";
import { ClassDetail } from "@/hooks/useClassDetails";

interface CurrentClassProps {
  classInfo: ClassDetail;
}

const CurrentClass = ({ classInfo }: CurrentClassProps) => {
  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-xl shadow-lg p-6 border border-stone-800 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <GraduationCap className="mr-2 text-yellow-400" />
        Current Class
      </h2>
      <h3 className="font-medium text-yellow-500 text-3xl mb-2">{classInfo.course || "No class in session"}</h3>
      <p className="text-lg text-stone-400">
        {classInfo.time} - {classInfo.faculty}
      </p>
    </div>
  );
};

export default CurrentClass;
