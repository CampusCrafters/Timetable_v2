"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

import GoogleSignOut from '@/utils/auth/signout';
import { supabase } from '@/utils/auth/connect';
import signInWithGoogle from '@/utils/auth/signin';

export const Logo = () => (
  <span className="font-bold">
    <span className="text-yellow-400">Time</span>
    <span className="text-white">Table</span>
  </span>
);

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(!!data.session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(!!session);
      if (session) {
        router.push("/dashboard");
      }
    });
   
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    await signInWithGoogle();
  }
  const handleSignOut = async () => {
    await GoogleSignOut();
    router.push("/"); // Redirect to the home page after sign-out
  };

  return (
    <nav className="fixed w-full z-50 bg-transparent bg-opacity-40 backdrop-blur-md px-6 py-3">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between h-14">
          {/* Logo Section */}
          <Link href="/">
            <motion.div className="text-3xl mr-3" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center font-medium space-x-12">
            {["About", "Dashboard", "Contact"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/${item.toLowerCase()}`} className="text-lg text-white hover:text-yellow-400 transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Google Sign-In Button (Desktop Only) */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={session ? handleSignOut : handleSignIn}
              className="flex items-center px-4 py-2 rounded-lg bg-white text-black font-medium transition-colors text-lg shadow-md hover:shadow-lg"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              {session ? "Sign out with Google" : "Sign in with Google"}
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-400 transition-colors">
              {isOpen ? <X size={24} className="text-yellow-400" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Subtle Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 150 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            className="fixed top-0 right-0 w-full h-screen bg-black bg-opacity-100 px-6 py-10 flex flex-col items-center space-y-6 z-50"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white focus:outline-none">
              <X size={28} className="text-yellow-400" />
            </button>
            <Logo />
            {["About", "Dashboard", "Contact"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/${item.toLowerCase()}`} className="text-lg text-white hover:text-yellow-400 transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={session ? handleSignOut : handleSignIn}
              className="flex items-center max-w-full px-5 py-3 rounded-lg bg-white text-black font-medium transition-colors text-lg shadow-md hover:shadow-lg"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              {session ? "Sign out" : "Sign in with Google"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
