import React from 'react'
import Image from 'next/image';
import BgImage from '../../../public/bg.png';
import useClassDetails from '@/hooks/useClassDetails';
import useTimetable from '@/hooks/useTimetable';
import LoadingScreen from '../Dashboard/Loading';
import Table from './Table'; // Assuming you have a custom Table component


const Admin= () => {
    const { timetables, isLoading: timetableLoading, err: timetableError } = useTimetable();

    const isLoading =  timetableLoading;
    const error: string | null =  (timetableError as string);

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
        <div className='mt-10 relative z-20 max-w-screen mx-auto'>
            <Table timetables={timetables} />
        </div>
        
      </div>
    );
};

export default Admin;