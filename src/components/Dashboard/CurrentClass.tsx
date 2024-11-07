import { GraduationCap } from "lucide-react";

const CurrentClass = () => {
  const currentClass = { name: "Mathematics", time: "10:00 AM - 11:00 AM", instructor: "Dr. Smith" };

  return (
    <div className="bg-stone-900 text-white rounded-lg shadow-lg p-6 border border-stone-950 hover:border-yellow-500/50 transition-colors">
      <h2 className="text-3xl font-semibold mb-4 flex items-center">
        <GraduationCap className="mr-2 text-yellow-500" />
        Current Class
      </h2>
      <h3 className="font-medium text-yellow-500 text-2xl mb-2">{currentClass.name}</h3>
      <p className="text-lg text-stone-400">
        {currentClass.time} - {currentClass.instructor}
      </p>
    </div>
  );
};

export default CurrentClass;
