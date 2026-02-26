import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';

export const Work = () => {
  return (
    <section 
      className="min-h-screen py-20 relative border-t-4 border-black"
      data-bgcolor="#FF00FF" /* Hot Pink accent */
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="mb-20 text-right"
        >
          <h2 className="text-6xl md:text-9xl font-black font-sans text-white text-stroke-2 stroke-black mb-4">
            SELECTED<br/>WORKS
          </h2>
          <div className="h-4 w-full md:w-1/2 ml-auto bg-black shadow-neubrutalism-dark"></div>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Image Card */}
              <div className="w-full md:w-1/2">
                <div className="border-4 border-black p-2 bg-white shadow-neubrutalism-xl hover:shadow-neubrutalism-sm transition-all duration-300 group cursor-pointer relative overflow-hidden">
                  <div className={`absolute inset-0 opacity-20 ${project.color} mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity`}></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-[300px] md:h-[400px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white p-3 hover:bg-white hover:text-black border-2 border-black transition-colors"
                        title="GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary text-black p-3 border-2 border-black hover:bg-black hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Card */}
              <div className="w-full md:w-1/2 relative">
                <div className={`absolute -top-10 ${idx % 2 === 0 ? '-left-10' : '-right-10'} text-9xl font-black text-black/10 select-none z-0 font-mono`}>
                  0{idx + 1}
                </div>
                
                <div className="relative z-10 bg-white border-4 border-black p-8 shadow-neubrutalism-lg">
                  <span className="bg-black text-white px-3 py-1 font-mono text-sm uppercase mb-4 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-4xl font-black mb-4 uppercase">{project.title}</h3>
                  <p className="text-lg font-medium mb-6">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="font-mono text-sm border-2 border-black px-2 py-1 bg-gray-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
