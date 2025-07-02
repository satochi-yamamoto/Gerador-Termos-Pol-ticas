
// Templates locais para geração de documentos
// IMPORTANTE: Estes templates podem ser facilmente atualizados para novas regras de LGPD/CCPA

const templates = {
  privacy: {
    lgpd: `
# POLÍTICA DE PRIVACIDADE

**Última atualização:** {{currentDate}}

## 1. INFORMAÇÕES GERAIS

A {{siteName}} ({{siteUrl}}) está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).

## 2. DADOS COLETADOS

Coletamos os seguintes tipos de dados:
{{dataTypes}}

## 3. FINALIDADE DO TRATAMENTO

Os dados pessoais são coletados e tratados para:
- Prestação dos serviços oferecidos
- Comunicação com o usuário
- Cumprimento de obrigações legais
- Melhoria dos nossos serviços

## 4. BASE LEGAL

O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais:
- Consentimento do titular
- Execução de contrato
- Cumprimento de obrigação legal
- Legítimo interesse

## 5. COMPARTILHAMENTO DE DADOS

Não compartilhamos dados pessoais com terceiros, exceto:
- Quando necessário para prestação do serviço
- Por determinação legal ou judicial
- Com consentimento expresso do titular

## 6. DIREITOS DO TITULAR

Você tem direito a:
- Confirmação da existência de tratamento
- Acesso aos dados
- Correção de dados incompletos ou inexatos
- Anonimização, bloqueio ou eliminação
- Portabilidade dos dados
- Eliminação dos dados tratados com consentimento
- Revogação do consentimento

## 7. SEGURANÇA

Implementamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, alteração, divulgação ou destruição.

## 8. RETENÇÃO DE DADOS

Os dados pessoais serão mantidos pelo período necessário para as finalidades informadas, respeitando os prazos legais aplicáveis.

## 9. CONTATO

Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
- Email: {{contactEmail}}
- Endereço: {{companyAddress}}

## 10. ALTERAÇÕES

Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular desta página.
    `,
    ccpa: `
# PRIVACY POLICY (CCPA)

**Last updated:** {{currentDate}}

## 1. GENERAL INFORMATION

{{siteName}} ({{siteUrl}}) is committed to protecting the privacy and personal information of California residents in accordance with the California Consumer Privacy Act (CCPA).

## 2. INFORMATION WE COLLECT

We collect the following categories of personal information:
{{dataTypes}}

## 3. USE OF PERSONAL INFORMATION

We use personal information for:
- Providing our services
- Communication with users
- Legal compliance
- Service improvement

## 4. SHARING PERSONAL INFORMATION

We do not sell personal information. We may share information:
- For service provision
- As required by law
- With your consent

## 5. YOUR RIGHTS UNDER CCPA

California residents have the right to:
- Know what personal information is collected
- Know whether personal information is sold or disclosed
- Say no to the sale of personal information
- Access personal information
- Equal service and price

## 6. HOW TO EXERCISE YOUR RIGHTS

To exercise your rights, contact us at:
- Email: {{contactEmail}}
- Address: {{companyAddress}}

## 7. CHANGES TO THIS POLICY

We may update this policy from time to time. Please review this page regularly.
    `
  },
  
  terms: `
# TERMOS DE USO

**Última atualização:** {{currentDate}}

## 1. ACEITAÇÃO DOS TERMOS

Ao acessar e usar o {{siteName}} ({{siteUrl}}), você concorda com estes Termos de Uso.

## 2. DESCRIÇÃO DO SERVIÇO

{{serviceDescription}}

## 3. CADASTRO E CONTA

Para utilizar determinados recursos, pode ser necessário criar uma conta. Você é responsável por:
- Manter a confidencialidade de suas credenciais
- Todas as atividades realizadas em sua conta
- Notificar sobre uso não autorizado

## 4. USO ACEITÁVEL

É proibido:
- Usar o serviço para fins ilegais
- Interferir no funcionamento do sistema
- Tentar acessar dados de outros usuários
- Enviar conteúdo ofensivo ou inadequado

## 5. PROPRIEDADE INTELECTUAL

Todo o conteúdo do site é protegido por direitos autorais e outras leis de propriedade intelectual.

## 6. LIMITAÇÃO DE RESPONSABILIDADE

O {{siteName}} não se responsabiliza por:
- Danos indiretos ou consequenciais
- Perda de dados ou lucros
- Interrupções do serviço

## 7. MODIFICAÇÕES

Reservamo-nos o direito de modificar estes termos a qualquer momento.

## 8. CONTATO

Para dúvidas sobre estes termos:
- Email: {{contactEmail}}
- Endereço: {{companyAddress}}
  `,
  
  cookies: `
# POLÍTICA DE COOKIES

**Última atualização:** {{currentDate}}

## 1. O QUE SÃO COOKIES

Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site.

## 2. TIPOS DE COOKIES UTILIZADOS

### Cookies Essenciais
Necessários para o funcionamento básico do site.

### Cookies de Desempenho
Coletam informações sobre como você usa nosso site.

### Cookies de Funcionalidade
Permitem que o site lembre suas preferências.

### Cookies de Marketing
Utilizados para exibir anúncios relevantes.

## 3. GERENCIAMENTO DE COOKIES

Você pode controlar e/ou excluir cookies conforme desejar através das configurações do seu navegador.

## 4. COOKIES DE TERCEIROS

Nosso site pode conter cookies de parceiros e fornecedores de serviços.

## 5. CONTATO

Para dúvidas sobre nossa política de cookies:
- Email: {{contactEmail}}
  `,
  
  confidentiality: `
# TERMOS DE CONFIDENCIALIDADE

**Última atualização:** {{currentDate}}

## 1. DEFINIÇÕES

Informações Confidenciais incluem todos os dados, documentos e informações fornecidos pelo {{siteName}}.

## 2. OBRIGAÇÕES DE CONFIDENCIALIDADE

O usuário compromete-se a:
- Manter sigilo absoluto sobre as informações
- Não divulgar a terceiros
- Usar apenas para os fins autorizados

## 3. EXCEÇÕES

Não são consideradas confidenciais informações que:
- Sejam de domínio público
- Sejam desenvolvidas independentemente
- Sejam divulgadas por determinação legal

## 4. DURAÇÃO

As obrigações de confidencialidade permanecem válidas mesmo após o término do uso dos serviços.

## 5. VIOLAÇÃO

A violação destes termos pode resultar em medidas legais cabíveis.

## 6. CONTATO

Para questões sobre confidencialidade:
- Email: {{contactEmail}}
- Endereço: {{companyAddress}}
  `
};

// Função principal para gerar documentos
export const generateDocument = (config) => {
  const {
    documentTypes,
    siteName,
    siteUrl,
    businessSegment,
    serviceDescription,
    dataTypes,
    legislation,
    contactEmail,
    companyAddress
  } = config;

  let generatedContent = '';
  const currentDate = new Date().toLocaleDateString('pt-BR');

  // Processar tipos de dados para exibição
  const dataTypesText = dataTypes.length > 0 
    ? dataTypes.map(type => `- ${type}`).join('\n')
    : '- Dados básicos de identificação\n- Dados de navegação';

  // Variáveis para substituição nos templates
  const variables = {
    siteName: siteName || 'Seu Site',
    siteUrl: siteUrl || 'https://seusite.com',
    businessSegment: businessSegment || 'Geral',
    serviceDescription: serviceDescription || 'Prestação de serviços digitais',
    dataTypes: dataTypesText,
    contactEmail: contactEmail || 'contato@seusite.com',
    companyAddress: companyAddress || 'Endereço da empresa',
    currentDate
  };

  // Gerar cada tipo de documento selecionado
  documentTypes.forEach((docType, index) => {
    if (index > 0) {
      generatedContent += '\n\n---\n\n';
    }

    switch (docType) {
      case 'privacy':
        // Escolher template baseado na legislação selecionada
        if (legislation.includes('lgpd')) {
          generatedContent += replaceVariables(templates.privacy.lgpd, variables);
        }
        if (legislation.includes('ccpa')) {
          if (legislation.includes('lgpd')) {
            generatedContent += '\n\n---\n\n';
          }
          generatedContent += replaceVariables(templates.privacy.ccpa, variables);
        }
        if (!legislation.includes('lgpd') && !legislation.includes('ccpa')) {
          generatedContent += replaceVariables(templates.privacy.lgpd, variables);
        }
        break;
        
      case 'terms':
        generatedContent += replaceVariables(templates.terms, variables);
        break;
        
      case 'cookies':
        generatedContent += replaceVariables(templates.cookies, variables);
        break;
        
      case 'confidentiality':
        generatedContent += replaceVariables(templates.confidentiality, variables);
        break;
        
      default:
        generatedContent += `# DOCUMENTO: ${docType.toUpperCase()}\n\nConteúdo em desenvolvimento...`;
    }
  });

  return generatedContent;
};

// Função auxiliar para substituir variáveis nos templates
const replaceVariables = (template, variables) => {
  let result = template;
  
  Object.keys(variables).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, variables[key]);
  });
  
  return result;
};

// Função para atualizar templates (facilita manutenção futura)
export const updateTemplate = (documentType, legislation, newTemplate) => {
  if (documentType === 'privacy' && legislation) {
    templates.privacy[legislation] = newTemplate;
  } else if (templates[documentType]) {
    templates[documentType] = newTemplate;
  }
};

// Função para adicionar novo template
export const addTemplate = (documentType, template, legislation = null) => {
  if (documentType === 'privacy' && legislation) {
    if (!templates.privacy) templates.privacy = {};
    templates.privacy[legislation] = template;
  } else {
    templates[documentType] = template;
  }
};
