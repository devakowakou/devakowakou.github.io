import React, { useEffect } from 'react';
import { PageContainer } from './components/layout/PageContainer';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Work } from './components/sections/Work';
import { Contact } from './components/sections/Contact';

function App() {
  
  // Logic to handle background color shift based on active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-bgcolor]');
    const bgLayer = document.getElementById('bg-layer');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && bgLayer) {
          const color = entry.target.getAttribute('data-bgcolor');
          if (color) {
            bgLayer.style.backgroundColor = color;
          }
        }
      });
    }, {
      root: null,
      threshold: 0.5, // Trigger when 50% visible
    });

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <PageContainer>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="work"><Work /></div>
      <div id="contact"><Contact /></div>
    </PageContainer>
  );
}

export default App;
