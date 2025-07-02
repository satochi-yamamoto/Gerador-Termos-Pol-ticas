
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/UserContext';
import Dashboard from '@/pages/Dashboard';
import Generator from '@/pages/Generator';
import Editor from '@/pages/Editor';
import Layout from '@/components/Layout';

function App() {
  return (
    <UserProvider>
      <Router>
        <Helmet>
          <title>Gerador de Termos e Políticas - Crie documentos legais facilmente</title>
          <meta name="description" content="Sistema completo para gerar Políticas de Privacidade, Termos de Uso e documentos legais em conformidade com LGPD e CCPA." />
        </Helmet>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </UserProvider>
  );
}

export default App;
