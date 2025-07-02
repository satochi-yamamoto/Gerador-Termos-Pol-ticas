
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Save, ArrowLeft, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { exportToPDF, exportToHTML } from '@/lib/exportUtils';
import { toast } from '@/components/ui/use-toast';

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateDocument } = useUser();
  const editorRef = useRef(null);
  
  const document = location.state?.document;
  const [content, setContent] = useState(document?.content || '');
  const [activeTab, setActiveTab] = useState('editor');

  if (!document) {
    navigate('/');
    return null;
  }

  const handleSave = () => {
    updateDocument(document.id, { content });
    toast({
      title: "✅ Documento salvo!",
      description: "Suas alterações foram salvas com sucesso."
    });
  };

  const handleExportPDF = async () => {
    try {
      await exportToPDF(content, document.siteName, user?.plan === 'premium');
      updateDocument(document.id, { downloaded: true });
      toast({
        title: "📄 PDF exportado!",
        description: "O arquivo foi baixado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao exportar PDF. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleExportHTML = () => {
    try {
      exportToHTML(content, document.siteName, user?.plan === 'premium');
      updateDocument(document.id, { downloaded: true });
      toast({
        title: "📄 HTML exportado!",
        description: "O arquivo foi baixado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao exportar HTML. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">{document.siteName}</h1>
              <p className="text-gray-400">{document.documentTypes.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button onClick={handleSave} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button onClick={handleExportHTML} variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              HTML
            </Button>
            <Button onClick={handleExportPDF} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="glass-effect rounded-xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-gray-800/50 border-b border-gray-700">
              <TabsTrigger value="editor" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Editor</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Pré-visualização</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="p-0">
              <div className="min-h-[600px]">
                <textarea
                  ref={editorRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[600px] p-6 bg-transparent text-white resize-none border-none outline-none font-mono text-sm leading-relaxed"
                  placeholder="Seu documento será gerado aqui..."
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="p-0">
              <div className="min-h-[600px] p-6">
                <div 
                  className="editor-content prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
                />
                {user?.plan === 'free' && (
                  <div className="watermark">
                    Gerado por LegalGen Pro - Versão Gratuita
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Info */}
        {user?.plan === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
          >
            <p className="text-yellow-400 text-sm">
              💡 <strong>Versão Gratuita:</strong> Os documentos exportados incluem marca d'água. 
              Faça upgrade para Premium para remover a marca d'água e ter acesso a recursos avançados.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Editor;
