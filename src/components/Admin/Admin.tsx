"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { 
    GraduationCap, 
    CalendarIcon, 
    BookOpenIcon, 
    UsersIcon, 
    SearchIcon 
} from 'lucide-react';
import BgImage from '../../../public/bg.png';
import useTimetable from '@/hooks/useTimetableParams';
import LoadingScreen from '../Dashboard/Loading';
import Timetable from './Table';

const yearOptions = ['2022', '2023', '2024', '2025'];
const courseOptions = ['BCS', 'BEC', 'BCD', 'BCY'];
const batchOptions = ['1', '2', '3', '4'];

const Admin = () => {
    const [year, setYear] = useState('');
    const [course, setCourse] = useState('');
    const [batch, setBatch] = useState('');
    const [query, setQuery] = useState<string | null>(null);

    const { timetables, isLoading, err } = useTimetable(query) as { timetables: any[], isLoading: boolean, err: string | null };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (year && course && batch) {
            setQuery(`${year}${course}${batch}`);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="relative min-h-screen bg-stone-950 text-white p-4 mt-12 md:p-8">
            <div className="absolute inset-0 z-0">
                <Image
                    src={BgImage}
                    alt="Background"
                    fill
                    quality={100}
                    className="filter blur-lg opacity-80 object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-transparent z-10"></div>
            
            <div className="relative z-20 max-w-7xl mx-auto">
                <div className="flex items-center justify-center mb-10 space-x-3">
                    <GraduationCap className="text-yellow-400 w-8 h-8" />
                    <h1 className="text-4xl font-extrabold text-stone-100">Timetable Explorer</h1>
                </div>

                {err && <div className="text-red-500 text-center mb-4">Error: {err}</div>}

                {timetables.length === 0 ? (
                    <div className="max-w-lg mx-auto bg-gradient-to-br from-stone-900 to-stone-900 text-white rounded-lg shadow-md p-6 border border-stone-700 hover:border-yellow-500 transition-all duration-300">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="year" className="flex items-center text-sm font-medium text-stone-300 mb-2">
                                        <CalendarIcon className="mr-2 text-yellow-400" size={18} />
                                        Academic Year
                                    </label>
                                    <select
                                        id="year"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full bg-stone-800 border border-stone-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                                    >
                                        <option value="">Select Year</option>
                                        {yearOptions.map(y => (
                                            <option key={y} value={y} className="bg-stone-800">{y}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="course" className="flex items-center text-sm font-medium text-stone-300 mb-2">
                                        <BookOpenIcon className="mr-2 text-yellow-400" size={18} />
                                        Course Code
                                    </label>
                                    <select
                                        id="course"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        className="w-full bg-stone-800 border border-stone-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                                    >
                                        <option value="">Select Course</option>
                                        {courseOptions.map(c => (
                                            <option key={c} value={c} className="bg-stone-800">{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="batch" className="flex items-center text-sm font-medium text-stone-300 mb-2">
                                    <UsersIcon className="mr-2 text-yellow-400" size={18} />
                                    Batch Section
                                </label>
                                <select
                                    id="batch"
                                    value={batch}
                                    onChange={(e) => setBatch(e.target.value)}
                                    className="w-full bg-stone-800 border border-stone-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                                >
                                    <option value="">Select Batch</option>
                                    {batchOptions.map(b => (
                                        <option key={b} value={b} className="bg-stone-800">{b}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={!year || !course || !batch}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SearchIcon className="mr-2" size={20} />
                                Generate Timetable
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="md:col-span-2">
                        <Timetable timetables={timetables} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;