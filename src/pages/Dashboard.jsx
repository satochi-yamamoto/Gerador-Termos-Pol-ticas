
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Plus, Download, Edit, Trash2, Shield, Cookie, FileCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, documents, deleteDocument } = useUser();

  const handleDelete = (documentId) => {
    deleteDocument(documentId);
    toast({
      title: "Documento excluído",
      description: "O documento foi removido com sucesso."
    });
  };

  const documentTypes = [
    {
      type: 'privacy',
      icon: Shield,
      title: 'Política de Privacidade',
      description: 'Conforme LGPD e CCPA',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'terms',
      icon: FileCheck,
      title: 'Termos de Uso',
      description: 'Condições de utilização',
      color: 'from-purple-500 to-pink-500'
    },
    {
      type: 'cookies',
      icon: Cookie,
      title: 'Política de Cookies',
      description: 'Gestão de cookies',
      color: 'from-orange-500 to-red-500'
    },
    {
      type: 'confidentiality',
      icon: Lock,
      title: 'Termos de Confidencialidade',
      description: 'Proteção de informações',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { label: 'Documentos Criados', value: documents.length, icon: FileText },
    { label: 'Plano Atual', value: user?.plan === 'premium' ? 'Premium' : 'Gratuito', icon: Shield },
    { label: 'Downloads', value: documents.filter(doc => doc.downloaded).length, icon: Download }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Gerador de <span className="gradient-text">Documentos Legais</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Crie políticas de privacidade, termos de uso e documentos legais em conformidade 
          com LGPD e CCPA de forma rápida e profissional.
        </p>
        <Link to="/generator">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Plus className="w-5 h-5 mr-2" />
            Criar Novo Documento
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-effect rounded-xl p-6 text-center">
              <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Document Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Tipos de Documentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentTypes.map((docType, index) => {
            const Icon = docType.icon;
            return (
              <Link key={index} to="/generator" state={{ selectedType: docType.type }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-6 cursor-pointer group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${docType.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{docType.title}</h3>
                  <p className="text-gray-400 text-sm">{docType.description}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Documents */}
      {documents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Documentos Recentes</h2>
          <div className="space-y-4">
            {documents.slice(-5).reverse().map((document) => (
              <div key={document.id} className="glass-effect rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{document.siteName}</h3>
                      <p className="text-gray-400 text-sm">
                        {document.documentTypes.join(', ')} • {new Date(document.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to="/editor" state={{ document }}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(document.id)}
                      className="text-red-400 border-red-400/50 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
