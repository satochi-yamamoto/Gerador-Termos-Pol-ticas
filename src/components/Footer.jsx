
import React from 'react';
import { FileText, Mail, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">LegalGen Pro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Gerador de documentos legais em conformidade com LGPD e CCPA. 
              Crie políticas de privacidade e termos de uso profissionais.
            </p>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">Recursos</span>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Política de Privacidade LGPD</li>
              <li>• Termos de Uso</li>
              <li>• Política de Cookies</li>
              <li>• Conformidade CCPA</li>
              <li>• Editor WYSIWYG</li>
              <li>• Exportação PDF/HTML</li>
            </ul>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">Contato</span>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@legalgen.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Conformidade Legal Garantida</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 LegalGen Pro. Todos os direitos reservados. 
            Sistema 100% local e seguro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
