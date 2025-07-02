
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
    // Carregar dados do localStorage
    const savedUser = localStorage.getItem('user');
    const savedDocuments = localStorage.getItem('documents');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Usuário padrão (free)
      const defaultUser = {
        id: 'user_1',
        name: 'Usuário Demo',
        email: 'demo@exemplo.com',
        plan: 'free', // free ou premium
        createdAt: new Date().toISOString()
      };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }

    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
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
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    
    return newDocument;
  };

  const updateDocument = (documentId, updates) => {
    const updatedDocuments = documents.map(doc => 
      doc.id === documentId ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc
    );
    setDocuments(updatedDocuments);
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
  };

  const deleteDocument = (documentId) => {
    const updatedDocuments = documents.filter(doc => doc.id !== documentId);
    setDocuments(updatedDocuments);
    localStorage.setItem('documents', JSON.stringify(updatedDocuments));
  };

  const upgradeToPremium = () => {
    const updatedUser = { ...user, plan: 'premium' };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
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
