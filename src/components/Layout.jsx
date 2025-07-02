
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdBanner position="top" />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AdBanner position="bottom" />
    </div>
  );
};

export default Layout;
