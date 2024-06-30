// File: src/context/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import OpenBookService from '../services/openbookService';

interface AppContextType {
  openbookService: OpenBookService | null;
  setRpcEndpoint: (endpoint: string, programId: string) => void;
  theme: {
    primaryColor: string;
    fontFamily: string;
    logo: string;
  };
  updateTheme: (theme: Partial<AppContextType['theme']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openbookService, setOpenbookService] = useState<OpenBookService | null>(null);
  const [theme, setTheme] = useState({
    primaryColor: '#E54033',
    fontFamily: 'Inter',
    logo: '',
  });

  const setRpcEndpoint = (endpoint: string, programId: string) => {
    setOpenbookService(new OpenBookService(endpoint, programId));
  };

  const updateTheme = (newTheme: Partial<AppContextType['theme']>) => {
    setTheme(prevTheme => ({ ...prevTheme, ...newTheme }));
  };

  return (
    <AppContext.Provider value={{ openbookService, setRpcEndpoint, theme, updateTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};