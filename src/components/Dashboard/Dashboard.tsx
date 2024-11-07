"use client"
import { useState } from "react";
import { Calendar } from "lucide-react";
import Image from 'next/image';
import BgImage from '../../../public/bg.png';
import CurrentClass from "./CurrentClass";
import UpcomingClasses from "./UpcomingClasses";
import Timetable from "./TimeTable";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-stone-950 text-white p-4 md:p-8" id="dashboard">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BgImage}
          alt="Background"
          fill
          quality={100}
          className="filter blur-sm opacity-100 object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/95 to-transparent z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto"> {/* Increased container width for larger screens */}
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Student Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <CurrentClass />
          <UpcomingClasses />
          <div className="md:col-span-2"> {/* Make Timetable span the full width on larger screens */}
            <Timetable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
