
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Home, Settings, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const location = useLocation();
  const { user, upgradeToPremium } = useUser();

  const handleUpgrade = () => {
    upgradeToPremium();
    toast({
      title: "🎉 Upgrade realizado!",
      description: "Agora você tem acesso premium com documentos sem marca d'água!"
    });
  };

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
              LegalGen Pro
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

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user?.plan === 'premium' ? (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Premium</span>
                </div>
              ) : (
                <Button
                  onClick={handleUpgrade}
                  variant="outline"
                  size="sm"
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-sm text-gray-300 hidden sm:block">
                {user?.name || 'Usuário'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
