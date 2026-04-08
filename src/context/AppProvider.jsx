import { createContext, useContext, useState } from 'react';
import datas from "../../public/foods.json";
import INITIAL_TABLES from "../../public/tables.json";

const AppContext = createContext();

// Helper to load from localStorage, falls back to default if nothing saved yet
function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to save to localStorage
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error("Failed to save to localStorage");
  }
}

export function AppProvider({ children }) {

  const [cart, setCart] = useState([]);

  // Load orders from localStorage on startup, empty array if nothing saved
  const [order, setOrderState] = useState(() => loadFromStorage("pos_orders", []));

  // Load tables from localStorage on startup, falls back to tables.json
  const [tables, setTablesState] = useState(() => loadFromStorage("pos_tables", INITIAL_TABLES));

  const addQuantityData = datas.map(data => {
    data.quantity = 1;
    return data;
  });

  const [salesRanking, setSalesRanking] = useState(addQuantityData);

  // Wrap setOrder to also save to localStorage
  const setOrder = (updater) => {
    setOrderState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage("pos_orders", next);
      return next;
    });
  };

  // Wrap setTables to also save to localStorage
  const setTables = (updater) => {
    setTablesState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage("pos_tables", next);
      return next;
    });
  };

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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};