
import { createContext, useContext, useState } from 'react';
import datas from "../../public/foods.json";

const AppContext = createContext();

export function AppProvider({ children }) {

  const [cart,setCart] = useState([]);
  
  const [order,setOrder] = useState([]);

  const addQuantityData = datas.map(data=> {
    data.quantity=1;
    return data;
  });

  const [salesRanking,setSalesRanking] = useState(addQuantityData);

  const value = {
    cart,
    setCart,
    salesRanking,
    setSalesRanking,
    order,
    setOrder,
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