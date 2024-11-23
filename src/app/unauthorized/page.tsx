import React from 'react'
import Image from 'next/image'
import { Lock } from 'lucide-react'
import BgImage from '../../../public/bg.png'

const Unauthorized = () => {
  return (
    <div className="relative min-h-screen bg-stone-950 text-white p-4 md:p-8">
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
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto bg-stone-900/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-stone-700">
          <div className="mb-8 flex justify-center">
            <Lock 
              size={80} 
              className="text-yellow-400 stroke-[1.5] animate-pulse"
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-100">
            Unauthorized Access
          </h1>
          
          <div className="text-stone-300 mb-6 text-lg space-y-4">
            <p>Access to this page is restricted based on the following rules:</p>
            <ul className="list-disc list-inside text-left">
              <li>Dashboard routes require you to be a IIIT Student</li>
              <li>Only Admins have admin privileges</li>
            </ul>
            <p>Please ensure you are using an authorized institutional email.</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="/" 
              className="px-6 py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized