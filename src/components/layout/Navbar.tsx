import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../config/personal';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="container mx-auto flex justify-between items-start">
        
        {/* Logo */}
        <div className="bg-white border-4 border-black p-2 shadow-neubrutalism pointer-events-auto cursor-pointer hover:translate-y-1 hover:shadow-none transition-all">
          <span className="font-black text-xl tracking-tighter">{personalInfo.name.split(' ')[0].toLowerCase()}</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 pointer-events-auto">
          {['About', 'Work', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border-4 border-black px-6 py-2 font-mono font-bold shadow-neubrutalism hover:bg-accent hover:text-white hover:translate-y-[2px] hover:shadow-neubrutalism-sm transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden pointer-events-auto bg-black text-white border-4 border-white p-2 shadow-neubrutalism-dark"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-3/4 bg-accent border-l-4 border-black pointer-events-auto shadow-neubrutalism-xl p-8 flex flex-col justify-center gap-8"
          >
             {['About', 'Work', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-6xl font-black text-white text-stroke-2 stroke-black hover:text-black hover:text-stroke-0 transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
