
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';

function PlaceholderPage({ title, description }) {
  return (
    <main className="min-h-[65vh] bg-[#F5DABF] px-[7%] py-24 text-center">
      <p className="mb-5 text-[10px] tracking-[0.2em] text-[#6C151E]">
        VIBGYOR EQUATOR
      </p>

      <h1 className="mb-5 font-serif text-5xl text-[#0F3D3A]">
        {title}
      </h1>

      <p className="mx-auto max-w-lg text-sm leading-7 text-[#43534B]">
        {description}
      </p>
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/gems-jewellery"
          element={
            <PlaceholderPage
              title="Gems & Jewellery"
              description="Discover distinctive gems and jewellery selected with care."
            />
          }
        />

        <Route
          path="/antiques"
          element={
            <PlaceholderPage
              title="Antiques"
              description="Explore objects and artefacts with a story of their own."
            />
          }
        />

        <Route
          path="/contact"
          element={
            <PlaceholderPage
              title="Contact Us"
              description="Get in touch with Vibgyor Equator."
            />
          }
        />

        <Route
          path="*"
          element={
            <PlaceholderPage
              title="Page not found"
              description="The page you're looking for doesn't exist."
            />
          }
        />
      </Routes>
    </>
  );
}
