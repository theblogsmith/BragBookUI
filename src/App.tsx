import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import ViewEntry from './pages/ViewEntry';
import Settings from './pages/Settings';
import Timeline from './pages/Timeline';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
export function App() {
  return <>
      {/* Global Font Import */}
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/new" element={<NewEntry />} />
            <Route path="/dashboard/entry/:id" element={<ViewEntry />} />
            <Route path="/dashboard/timeline" element={<Timeline />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>;
}