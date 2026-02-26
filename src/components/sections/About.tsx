import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Globe, Layers } from 'lucide-react';
import { personalInfo } from '../../config/personal';

const skills = [
  { icon: <Globe size={40} />, title: "Frontend", desc: "React, Tailwind, NextJS, TypeScript", color: "bg-cyan-300" },
  { icon: <Database size={40} />, title: "Backend", desc: "Node, Postgres, Redis, Python", color: "bg-pink-300" },
  { icon: <Layers size={40} />, title: "Design", desc: "Figma, System UI, Brutalism", color: "bg-yellow-300" },
  { icon: <Terminal size={40} />, title: "DevOps", desc: "Docker, CI/CD, Linux", color: "bg-green-300" },
];

export const About = () => {
  return (
    <section 
      className="min-h-screen py-20 flex flex-col justify-center relative border-t-4 border-black"
      data-bgcolor="#ffffff"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="mb-16"
        >
          <h2 className="text-6xl md:text-8xl font-black font-sans mb-4 uppercase">
            About<br/>
            <span className="text-transparent text-stroke-2 text-black">The Dev</span>
          </h2>
          <div className="h-4 w-32 bg-accent shadow-neubrutalism"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="text-xl md:text-2xl font-mono leading-relaxed border-l-4 border-black pl-6 space-y-6">
            <p>
              {personalInfo.bio}
            </p>
            <p className="bg-black text-white p-2 inline-block shadow-neubrutalism transform -rotate-1">
              Currently building the web of tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translate: "4px 4px", boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
                className={`border-4 border-black p-6 shadow-neubrutalism ${skill.color} flex flex-col items-center text-center transition-all`}
              >
                <div className="bg-white border-2 border-black p-3 mb-4 shadow-neubrutalism-sm rounded-full">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold font-mono mb-2">{skill.title}</h3>
                <p className="font-sans text-sm font-medium">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
