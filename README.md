# Gerador de Termos e Políticas

Este projeto é um gerador de documentos legais como Política de Privacidade, Termos de Uso, Política de Cookies e Termos de Confidencialidade. É construído com React e Tailwind CSS e contém exemplos de integração com o Google AdSense.

## Funcionalidades

- Cria documentos legais em conformidade com a LGPD e outras legislações.
- Armazena dados somente em memória: nenhuma informação fornecida é gravada de forma permanente no navegador.
- Banner de cookies exibido na primeira visita informando que os dados são descartados após o uso.
- Espaços reservados para banners do Google AdSense no topo e no rodapé.

## Instalação e uso

1. Certifique-se de ter o Node.js na versão indicada em `.nvmrc`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Para iniciar em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Para gerar a versão de produção:
   ```bash
   npm run build
   ```
5. Para visualizar o build gerado:
   ```bash
   npm run preview
   ```

Os valores de `data-ad-client` e `data-ad-slot` nos componentes de anúncio podem ser ajustados no arquivo `src/components/GoogleAd.jsx`.

## Estrutura do projeto

- `src/components`: componentes reutilizáveis, incluindo os banners do AdSense e o banner de cookies.
- `src/contexts`: contexto de usuário que controla os documentos em memória.
- `src/pages`: páginas principais do aplicativo.
- `public` e `index.html`: arquivos estáticos e ponto de entrada da aplicação.

## Licença

Este projeto é distribuído sem garantia de suporte ou manutenção. Utilize-o conforme sua necessidade.

