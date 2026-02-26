import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Bug, Zap } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';
import { personalInfo } from '../../config/personal';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const stickers = [
    { id: 'react', icon: <Code2 size={isMobile ? 24 : 32} />, label: "CODE", color: "bg-cyan-400", x: isMobile ? -210 : -380, y: isMobile ? -20 : -180, rotate: -5 },
    { id: 'bash', icon: <Terminal size={isMobile ? 24 : 32} />, label: "BASH", color: "bg-green-400", x: isMobile ? 210 : 400, y: isMobile ? 160 : 220, rotate: 5 },
    { id: 'sys', icon: <Cpu size={isMobile ? 24 : 32} />, label: "SYS", color: "bg-yellow-400", x: isMobile ? -210 : -420, y: isMobile ? 220 : 300, rotate: -10 },
    { id: 'fix', icon: <Bug size={isMobile ? 24 : 32} />, label: "FIX ME", color: "bg-red-400", x: isMobile ? 200 : 200, y: isMobile ? -140 : -250, rotate: 10 },
    { id: 'fast', icon: <Zap size={isMobile ? 24 : 32} />, label: "FAST", color: "bg-purple-400", x: isMobile ? 100 : 50, y: isMobile ? -200 : -350, rotate: 15 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
      // Default background (Beige)
      data-bgcolor="hsl(44, 87%, 94%)" 
    >
      {/* Central Content - Using pointer-events-none on container to let stickers through, 
          but pointer-events-auto on interactive bits */}
      <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center pointer-events-none">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="relative z-20 pointer-events-auto"
        >
          <div className="border-4 border-black bg-white p-4 mb-6 shadow-neubrutalism rotate-[-2deg] inline-block">
             <span className="font-mono font-bold text-lg tracking-widest">EST. 2024</span>
          </div>
          
          {/* Profile Photo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 border-6 border-black bg-white shadow-neubrutalism-xl overflow-hidden relative group">
              <img 
                src="/profile.png" 
                alt={personalInfo.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-20 transition-opacity mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-accent text-black px-3 py-1 border-2 border-black font-mono text-xs font-bold shadow-neubrutalism-sm">
              ONLINE
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black font-sans tracking-tighter mb-4 leading-[0.9]">
            {personalInfo.name.split(' ')[0]}<br/>
            <span className="text-transparent bg-clip-text bg-black text-stroke-2 md:text-stroke-2 stroke-white">{personalInfo.name.split(' ')[1]}</span>
          </h1>

          <div className="bg-black text-white p-4 inline-block transform rotate-1 shadow-neubrutalism-lg border-2 border-white md:border-transparent">
             <h2 className="text-xl md:text-3xl font-mono">{personalInfo.role}</h2>
          </div>
        </motion.div>

        <p className="mt-8 font-mono text-lg max-w-md mx-auto bg-white/80 p-2 border-2 border-black shadow-neubrutalism-sm backdrop-blur-sm pointer-events-auto">
          "{personalInfo.tagline}"
        </p>

      </div>

      {/* Draggable Playground Layer - Moved to higher z-index to ensure interactivity */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="w-full h-full relative flex items-center justify-center">
            {stickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                whileHover={{ scale: 1.1, cursor: "grab" }}
                whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                animate={{ x: sticker.x, y: sticker.y, rotate: sticker.rotate, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  delay: 1.0 + (stickers.indexOf(sticker) * 0.1)
                }}
                className={`absolute pointer-events-auto flex flex-col items-center justify-center p-2 md:p-4 border-4 border-black shadow-neubrutalism ${sticker.color} w-24 h-24 md:w-32 md:h-32 rounded-none cursor-grab active:cursor-grabbing select-none`}
              >
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  {sticker.icon}
                  <span className="font-mono font-bold mt-1 md:mt-2 text-xs md:text-base">{sticker.label}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

    </section>
  );
};
