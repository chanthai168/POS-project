
import { createContext, useContext, useState } from 'react';
import datas from "../../public/foods.json";

const AppContext = createContext();

const INITIAL_TABLES = [
  { id: 1, number: 1, capacity: 4, status: true,  type: 'VIP',    color: 'circleRed'    },
  { id: 2, number: 2, capacity: 4, status: true,  type: 'VIP',    color: 'circlePink'   },
  { id: 3, number: 3, capacity: 4, status: true,  type: 'VIP',    color: 'circleYellow' },
  { id: 4, number: 4, capacity: 4, status: false, type: 'VIP',    color: 'circleBlue'   },
  { id: 5, number: 5, capacity: 4, status: false, type: 'Normal', color: 'circleNavy'   },
  { id: 6, number: 6, capacity: 6, status: true,  type: 'Normal', color: 'circleGreen'  },
  { id: 7, number: 7, capacity: 2, status: false, type: 'Normal', color: 'circlePurple' },
]

export function AppProvider({ children }) {

  const [cart,setCart] = useState([]);
  
  const [order,setOrder] = useState([]);

  const [tables,setTables] = useState(INITIAL_TABLES);

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
    tables,
    setTables,
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