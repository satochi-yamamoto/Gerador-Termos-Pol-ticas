# Gerador de Termos e Políticas

Este projeto é um gerador de documentos legais como Política de Privacidade, Termos de Uso, Política de Cookies e Termos de Confidencialidade. É construído com React e Tailwind CSS e contém exemplos de integração com o Google AdSense.

## Funcionalidades

- Cria documentos legais em conformidade com a LGPD e outras legislações.
- Armazena dados apenas temporariamente em memória e no `localStorage` para controle de uso. Nenhuma informação de documentos é mantida após o término da sessão.
- Limita a geração a 5 documentos por endereço IP a cada período de 24 horas.
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

## Docker

Para construir a imagem de produção e executá-la localmente:

```bash
docker build -t gerador-termos .
docker run -p 8080:80 gerador-termos
```

A aplicação ficará disponível em `http://localhost:8080`.
## Licença

Este projeto é distribuído sem garantia de suporte ou manutenção. Utilize-o conforme sua necessidade.

