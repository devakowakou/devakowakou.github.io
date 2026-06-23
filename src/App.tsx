import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { PageContainer } from './components/layout/PageContainer';
import { Navbar } from './components/layout/Navbar';

// Background colour for the fixed bg-layer, per route.
const ROUTE_BG: Record<string, string> = {
  '/': 'hsl(44, 87%, 94%)', // Beige
  '/about': '#ffffff',       // White
  '/work': '#FF00FF',        // Hot pink
  '/contact': '#000000',     // Black
};

function App() {
  const { pathname } = useLocation();

  // Drive the background layer and reset scroll on every route change.
  useEffect(() => {
    const bgLayer = document.getElementById('bg-layer');
    if (bgLayer) bgLayer.style.backgroundColor = ROUTE_BG[pathname] ?? ROUTE_BG['/'];
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <PageContainer>
        <Navbar />
        {/* No z-index here: a stacking context on <main> would trap the
            contact modal (z-[60]) below the fixed navbar (z-50). */}
        <main className="relative flex flex-col w-full">
          <Outlet />
        </main>
      </PageContainer>
    </MotionConfig>
  );
}

export default App;
