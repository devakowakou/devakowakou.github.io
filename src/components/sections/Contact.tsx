import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Linkedin, Github, Headset} from 'lucide-react';
import { personalInfo } from '../../config/personal';

export const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section 
      className="min-h-[50vh] flex flex-col justify-center items-center border-t-4 border-white py-20 overflow-hidden relative"
      data-bgcolor="#000000"
    >
      {/* Background Noise/Grid */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-mono">
          Ready to break the internet?
        </h2>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-secondary transition-colors"
          >
            <Mail size={32} />
          </motion.a>
          <motion.a
            href={`tel:${personalInfo.phone}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-secondary transition-colors"
          >
            <Headset size={32} />
          </motion.a>
          <motion.a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-accent transition-colors"
          >
            <Linkedin size={32} />
          </motion.a>
          <motion.a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="bg-white text-black p-4 border-4 border-white shadow-neubrutalism hover:bg-cyan-400 transition-colors"
          >
            <Github size={32} />
          </motion.a>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#39FF14", color: "#000" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="w-full md:w-3/4 mx-auto text-5xl md:text-8xl font-black py-12 md:py-20 border-4 border-white bg-transparent text-white shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(57,255,20,1)] hover:border-black transition-all duration-300 uppercase font-sans tracking-tighter"
        >
          Let's Talk
        </motion.button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
              className="relative w-full max-w-2xl bg-secondary border-4 border-black shadow-[16px_16px_0px_0px_#000000] p-0 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-black text-white p-3 flex justify-between items-center border-b-4 border-black">
                <span className="font-mono font-bold text-lg blinking-cursor">user@devakowakou:~/contact-form</span>
                <button 
                  title='open modal'
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-red-500 hover:text-black transition-colors rounded-sm p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Raw Form */}
              <div className="p-8 font-mono">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="block font-bold text-lg uppercase border-b-2 border-black w-max">Identity</label>
                    <input 
                      type="text" 
                      placeholder="Who are you?" 
                      className="w-full bg-white border-2 border-black p-4 text-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold text-lg uppercase border-b-2 border-black w-max">Coordinates</label>
                    <input 
                      type="email" 
                      placeholder="email@address.com" 
                      className="w-full bg-white border-2 border-black p-4 text-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold text-lg uppercase border-b-2 border-black w-max">Payload</label>
                    <textarea 
                      rows={4}
                      placeholder="What's the mission?" 
                      className="w-full bg-white border-2 border-black p-4 text-lg focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <button className="w-full bg-black text-white text-xl font-bold py-4 border-2 border-black hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_0px_#000] transition-all flex items-center justify-center gap-2 uppercase">
                    <Send size={24} />
                    Transmit Data
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
