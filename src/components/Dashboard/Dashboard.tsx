"use client";
import Image from 'next/image';
import BgImage from '../../../public/bg.png';
import CurrentClass from "./CurrentClass";
import UpcomingClasses from "./UpcomingClasses";
import Timetable from './TimeTable';
import Error from './Error';
import useClassDetails from '@/hooks/useClassDetails';
import useTimetable from '@/hooks/useTimetable';
import LoadingScreen from './Loading';

const Dashboard = () => {
  const { classDetails, error: classError, loading: classLoading } = useClassDetails();
  const { timetables, isLoading: timetableLoading, err: timetableError } = useTimetable();

  const isLoading = classLoading || timetableLoading;
  const error: string | null = (classError as string) || (timetableError as string);

  if (isLoading) {
    return <LoadingScreen />; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative min-h-screen bg-stone-950 text-white p-4 md:p-8" id="dashboard">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BgImage}
          alt="Background"
          fill
          quality={100}
          className="filter blur-lg opacity-80 object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-transparent z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto"> 
        <h1 className="text-4xl font-extrabold mb-10 text-center md:text-left">Student Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-10">
          <CurrentClass classInfo={classDetails.currentClass} />
          <UpcomingClasses classes={classDetails.nextClasses} />
          <div className="md:col-span-2">
            <Timetable timetables={timetables} />
          </div>
        </div>
        {error && <Error message={error} />}
      </div>
    </div>
  );
};

export default Dashboard;
