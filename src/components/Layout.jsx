
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAd from '@/components/GoogleAd';
import CookieBanner from '@/components/CookieBanner';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <GoogleAd slot="0000000000" />
      <Header />
      <main className="flex-1 relative">
        {children}
        <CookieBanner />
      </main>
      <Footer />
      <GoogleAd slot="0000000001" />
    </div>
  );
};

export default Layout;
