import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { personalInfo } from '../../config/personal';

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="container mx-auto flex justify-between items-start">

        {/* Logo */}
        <Link to="/" aria-label="Home" className="bg-white border-4 border-black p-2 shadow-neubrutalism pointer-events-auto cursor-pointer hover:translate-y-1 hover:shadow-none transition-all block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent">
          <span className="font-black text-xl tracking-tighter">{personalInfo.name.split(' ')[0].toLowerCase()}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 pointer-events-auto">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `border-4 border-black px-6 py-2 font-mono font-bold shadow-neubrutalism hover:bg-accent hover:text-black hover:translate-y-[2px] hover:shadow-neubrutalism-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent ${
                  isActive ? 'bg-black text-white' : 'bg-white text-black'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden pointer-events-auto bg-black text-white border-4 border-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center shadow-neubrutalism-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-3/4 bg-accent border-l-4 border-black pointer-events-auto shadow-neubrutalism-xl p-8 flex flex-col justify-center gap-8"
          >
            {/* Close button */}
            <button
              aria-label="Close navigation menu"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 bg-black text-white border-4 border-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black"
            >
              <X size={24} aria-hidden="true" />
            </button>

            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-left text-6xl font-black text-stroke-2 stroke-black hover:text-black hover:text-stroke-0 transition-colors uppercase focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black ${
                    isActive ? 'text-black text-stroke-0' : 'text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
