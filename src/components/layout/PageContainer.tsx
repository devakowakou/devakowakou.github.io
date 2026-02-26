import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PageContainerProps {
  children: React.ReactNode;
  themeColor?: string;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  // We will manage background color via CSS variables updated by sections
  // Or simply animate the body background. 
  // Let's use a fixed background element that changes color.
  
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Background layer managed by sections or global state */}
      <div 
        id="bg-layer"
        className="fixed inset-0 -z-50 transition-colors duration-700 ease-in-out bg-background"
      />
      
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 -z-40 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <main className="relative z-10 flex flex-col w-full">
        {children}
      </main>
    </div>
  );
};
