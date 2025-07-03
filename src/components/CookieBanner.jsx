import React from 'react';

const CookieBanner = () => {
  const [visible, setVisible] = React.useState(() => !sessionStorage.getItem('cookieBannerAccepted'));

  const handleAccept = () => {
    sessionStorage.setItem('cookieBannerAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 p-6 rounded-lg max-w-md text-center space-y-4">
        <h2 className="text-lg font-semibold">Política de Cookies</h2>
        <p className="text-sm">
          Utilizamos cookies apenas para garantir o funcionamento do site. Nenhum dado informado é armazenado e todo conteúdo é descartado após o uso.
        </p>
        <button onClick={handleAccept} className="bg-blue-600 text-white px-4 py-2 rounded">Entendi</button>
      </div>
    </div>
  );
};

export default CookieBanner;
