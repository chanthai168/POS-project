
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {

  const [cart,setCart] = useState([]);

  const value = {
    cart,
    setCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook (very convenient)
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};