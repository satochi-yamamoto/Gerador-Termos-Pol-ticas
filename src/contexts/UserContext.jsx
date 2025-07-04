
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Limpa qualquer dado persistente anterior e cria usuário padrão apenas em memória
    localStorage.removeItem('user');
    localStorage.removeItem('documents');

    const defaultUser = {
      id: 'user_1',
      name: 'Usuário',
      email: 'demo@exemplo.com',
      plan: 'free',
      createdAt: new Date().toISOString()
    };

    setUser(defaultUser);

    const handleUnload = () => {
      setDocuments([]);
      setUser(null);
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const saveDocument = (document) => {
    const newDocument = {
      ...document,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: user.id
    };
    
    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);

    return newDocument;
  };

  const updateDocument = (documentId, updates) => {
    const updatedDocuments = documents.map(doc =>
      doc.id === documentId ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc
    );
    setDocuments(updatedDocuments);
  };

  const deleteDocument = (documentId) => {
    const updatedDocuments = documents.filter(doc => doc.id !== documentId);
    setDocuments(updatedDocuments);
  };

  const upgradeToPremium = () => {
    const updatedUser = { ...user, plan: 'premium' };
    setUser(updatedUser);
  };

  const value = {
    user,
    documents,
    saveDocument,
    updateDocument,
    deleteDocument,
    upgradeToPremium
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
