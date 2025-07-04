
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Shield, Cookie, FileCheck, Lock, Globe, Building, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import { generateDocument } from '@/lib/documentGenerator';
import { toast } from '@/components/ui/use-toast';
import { canGenerate, recordGeneration, MAX_DOCS_PER_DAY } from '@/lib/rateLimiter';

const Generator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveDocument } = useUser();
  
  const [selectedTypes, setSelectedTypes] = useState(
    location.state?.selectedType ? [location.state.selectedType] : []
  );
  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: '',
    businessSegment: '',
    serviceDescription: '',
    dataTypes: [],
    legislation: [],
    contactEmail: '',
    companyAddress: ''
  });

  const documentTypes = [
    {
      id: 'privacy',
      icon: Shield,
      title: 'Política de Privacidade',
      description: 'Conforme LGPD e CCPA',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'terms',
      icon: FileCheck,
      title: 'Termos de Uso',
      description: 'Condições de utilização',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Política de Cookies',
      description: 'Gestão de cookies',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'confidentiality',
      icon: Lock,
      title: 'Termos de Confidencialidade',
      description: 'Proteção de informações',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const businessSegments = [
    'E-commerce',
    'SaaS/Software',
    'Educação',
    'Saúde',
    'Financeiro',
    'Marketing Digital',
    'Consultoria',
    'Blog/Mídia',
    'Outro'
  ];

  const dataTypesOptions = [
    'Dados pessoais básicos (nome, email)',
    'Dados de navegação (cookies, IP)',
    'Dados de localização',
    'Dados financeiros',
    'Dados de saúde',
    'Dados de menores de idade',
    'Dados biométricos',
    'Dados de redes sociais'
  ];

  const legislationOptions = [
    { id: 'lgpd', label: 'LGPD (Brasil)' },
    { id: 'ccpa', label: 'CCPA (Califórnia)' },
    { id: 'gdpr', label: 'GDPR (Europa)' }
  ];

  const handleTypeToggle = (typeId) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleDataTypeToggle = (dataType) => {
    setFormData(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(dataType)
        ? prev.dataTypes.filter(type => type !== dataType)
        : [...prev.dataTypes, dataType]
    }));
  };

  const handleLegislationToggle = (legislation) => {
    setFormData(prev => ({
      ...prev,
      legislation: prev.legislation.includes(legislation)
        ? prev.legislation.filter(leg => leg !== legislation)
        : [...prev.legislation, legislation]
    }));
  };

  const handleGenerate = async () => {
    const allowed = await canGenerate();
    if (!allowed) {
      toast({
        title: "Limite diário atingido",
        description: `Você pode gerar até ${MAX_DOCS_PER_DAY} documentos em 24h.`,
        variant: "destructive"
      });
      return;
    }
    if (selectedTypes.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um tipo de documento.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.siteName || !formData.siteUrl) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      const generatedContent = generateDocument({
        documentTypes: selectedTypes,
        ...formData
      });

      const document = saveDocument({
        documentTypes: selectedTypes,
        content: generatedContent,
        ...formData
      });

      await recordGeneration();

      toast({
        title: "✅ Documento gerado!",
        description: "Redirecionando para o editor..."
      });

      setTimeout(() => {
        navigate('/editor', { state: { document } });
      }, 1000);

    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar documento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Gerador de Documentos</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Configure as informações do seu site e gere documentos legais personalizados
          </p>
        </div>

        <div className="space-y-8">
          {/* Seleção de Documentos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              1. Selecione os Documentos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentTypes.map((docType) => {
                const Icon = docType.icon;
                const isSelected = selectedTypes.includes(docType.id);
                
                return (
                  <motion.div
                    key={docType.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleTypeToggle(docType.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox checked={isSelected} />
                      <div className={`w-10 h-10 bg-gradient-to-r ${docType.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{docType.title}</h3>
                        <p className="text-gray-400 text-sm">{docType.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Informações Básicas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              2. Informações Básicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="siteName">Nome do Site/App *</Label>
                <Input
                  id="siteName"
                  value={formData.siteName}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                  placeholder="Ex: Minha Empresa"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">URL do Site *</Label>
                <Input
                  id="siteUrl"
                  value={formData.siteUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteUrl: e.target.value }))}
                  placeholder="Ex: https://minhaempresa.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="businessSegment">Segmento de Atuação</Label>
                <Select
                  value={formData.businessSegment}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, businessSegment: value }))}
                >
                  <option value="">Selecione um segmento</option>
                  {businessSegments.map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="contactEmail">Email de Contato</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  placeholder="contato@minhaempresa.com"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="mt-6">
              <Label htmlFor="serviceDescription">Descrição do Serviço</Label>
              <Textarea
                id="serviceDescription"
                value={formData.serviceDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, serviceDescription: e.target.value }))}
                placeholder="Descreva brevemente o que seu site/app faz..."
                className="mt-2"
                rows={3}
              />
            </div>
          </motion.div>

          {/* Tipos de Dados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              3. Tipos de Dados Coletados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dataTypesOptions.map((dataType) => (
                <div key={dataType} className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.dataTypes.includes(dataType)}
                    onCheckedChange={() => handleDataTypeToggle(dataType)}
                  />
                  <Label className="text-sm">{dataType}</Label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Legislação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              4. Legislação Aplicável
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {legislationOptions.map((legislation) => (
                <div key={legislation.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData.legislation.includes(legislation.id)}
                    onCheckedChange={() => handleLegislationToggle(legislation.id)}
                  />
                  <Label>{legislation.label}</Label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Botão Gerar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Button
              onClick={handleGenerate}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Gerar Documentos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Generator;
