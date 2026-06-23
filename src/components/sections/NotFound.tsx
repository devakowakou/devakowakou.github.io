import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
      <p className="font-mono text-2xl mb-4 uppercase">404 — page not found</p>
      <h1 className="text-7xl md:text-9xl font-black font-sans tracking-tighter mb-8 uppercase">
        Lost in<br />the void
      </h1>
      <Link
        to="/"
        className="bg-black text-white text-xl font-bold px-8 py-4 border-4 border-black shadow-neubrutalism hover:bg-white hover:text-black hover:shadow-neubrutalism-sm hover:translate-y-[2px] transition-all uppercase font-mono focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent"
      >
        Back home
      </Link>
    </section>
  );
};
