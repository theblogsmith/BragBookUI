import React from 'react';
import Layout from './components/Layout';

export function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
      <Layout>{children}</Layout>
    </>
  );
}