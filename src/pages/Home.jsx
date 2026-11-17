
import React from 'react';
import Hero from '../components/Hero';
import DateSection from '../components/DateSection';
import CollectionSection from '../components/CollectionPage';
import FramingSection from '../components/FramingSection';
import ClosingCta from '../components/ClosingCta';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <DateSection />
      <CollectionSection />
      <FramingSection />
      <FAQ />
      <ClosingCta />      
      <Footer />
      {/* Put your existing homepage sections below Hero */}
    </main>
  );
}
