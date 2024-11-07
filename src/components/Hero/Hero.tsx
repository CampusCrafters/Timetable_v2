'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import BgImage from '../../../public/bg.png';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-stone-950 flex items-center justify-center" id="about">
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
      <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-yellow-500">Time</span>
          <span className="text-white">Table</span>
        </h1>
        
        {/* Subheading with highlighted terms */}
        <p className="text-2xl md:text-3xl text-white mb-16">
          An intelligent Scheduling Platform that helps you{' '}
          <span className="text-yellow-500 font-semibold">manage time</span> and{' '}
          <span className="text-yellow-500 font-semibold">stay productive</span>.
        </p>

         {/* Feature Cards */}
         <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-stone-900 p-8 rounded-xl border border-stone-800 hover:border-yellow-500/50 transition-colors">
            <div className="flex justify-center mb-4">
              <Calendar className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Smart Schedule Analysis
            </h3>
            <p className="text-stone-400">
              Automatically processes and manages your daily schedules
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-stone-900 p-8 rounded-xl border border-stone-800 hover:border-yellow-500/50 transition-colors">
            <div className="flex justify-center mb-4">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Save Time
            </h3>
            <p className="text-stone-400">
              Get quick access to your schedule and upcoming events
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-stone-900 p-8 rounded-xl border border-stone-800 hover:border-yellow-500/50 transition-colors">
            <div className="flex justify-center mb-4">
              <Users className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Stay Organized
            </h3>
            <p className="text-stone-400">
              Keep track of important appointments effortlessly
            </p>
          </div>
        </div>


        {/* CTA Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/#dashboard'}
          className="w-auto md:w-auto bg-yellow-400 hover:bg-yellow-500 text-stone-950 font-medium px-6 py-4 rounded-lg inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Get Started with Dashboard
          <span className="ml-2">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </span>
        </motion.button>

        {/* Secondary Link */}
        <p className="mt-4 text-gray-400 text-sm hover:text-yellow-500 transition-colors cursor-pointer">
          Continue to your dashboard
        </p>
      </div>
    </div>
  );
};

export default Hero;