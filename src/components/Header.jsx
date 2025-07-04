
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  // Simplified header without user context or upgrade actions

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/generator', icon: FileText, label: 'Gerador' }
  ];

  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              YD Software
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Intentionally left blank to remove upgrade and user info */}
        </div>
      </div>
    </header>
  );
};

export default Header;
