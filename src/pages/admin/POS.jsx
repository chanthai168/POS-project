import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import ProductsGrid from "./components/pos/ProductsGrid";
import Ordersummary from "./components/pos/Ordersummary";
import POSConfirmModal from "./components/pos/POSConfirmModal";
import styles from "../css/pos.module.css";

function POS() {
  const { tables, setTables, order, setOrder, setSalesRanking } = useAppContext();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState("None");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showConfirm, setShowConfirm] = useState(false);

  // If navigated from Table's Edit button, pre-select that table
  useEffect(() => {
    if (location.state?.tableNumber) {
      handleSelectTable(String(location.state.tableNumber));
    }
  }, [location.state]);

  const handleSelectTable = (tableNumber) => {
    setSelectedTable(tableNumber);
    if (tableNumber === "None") return;

    // Load existing order for the table if any
    const table = tables.find(t => t.number === parseInt(tableNumber));
    if (table && table.order && table.order.length > 0) {
      setCartItems(table.order);
      if (table.paymentMethod) setPaymentMethod(table.paymentMethod);
    }
  };

  const addToCart = (food) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === food.id);
      if (existing) return prev.map(i => i.id === food.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...food, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateSalesRanking = (items) => {
    setSalesRanking(prev =>
      prev.map(item => {
        const cartItem = items.find(i => i.id === item.id);
        if (cartItem) return { ...item, quantity: item.quantity + (cartItem.qty ?? 1) };
        return item;
      })
    );
  };

  // Called when user clicks Order button — show confirmation modal first
  const handleRequestOrder = () => {
    if (cartItems.length === 0) return;
    setShowConfirm(true);
  };

  // Called after user confirms in the modal
  const handleConfirmOrder = () => {
    const subTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = 0;
    const total = subTotal - discount;

    const orderItem = {
      orderId: order.length,
      subTotal,
      discount,
      total,
      payMethod: paymentMethod,
      guest: "Unknown",
      tableNumber: selectedTable !== "None" ? parseInt(selectedTable) : null,
      status: "pending",
      orderDate: {
        time: new Date().toLocaleTimeString(),
        date: new Date().toDateString(),
      },
      items: cartItems,
    };

    setOrder(prev => [...prev, orderItem]);
    updateSalesRanking(cartItems);

    // Update the table: save order + mark as occupied (status = true)
    if (selectedTable !== "None") {
      setTables(prev =>
        prev.map(t =>
          t.number === parseInt(selectedTable)
            ? { ...t, order: cartItems, total, paymentMethod, paid: false, status: true }
            : t
        )
      );
    }

    setCartItems([]);
    setSelectedTable("None");
    setShowConfirm(false);
  };

  // Cancel — clears cart AND wipes the table's saved order, marks table free
  const handleCancelOrder = () => {
    if (selectedTable !== "None") {
      setTables(prev =>
        prev.map(t =>
          t.number === parseInt(selectedTable)
            ? { ...t, order: [], total: 0, status: false }
            : t
        )
      );
    }
    setCartItems([]);
    setSelectedTable("None");
  };

  // Mark table as paid — clears order and marks table as free
  const handleMarkPaid = () => {
    if (selectedTable === "None") return;
    setTables(prev =>
      prev.map(t =>
        t.number === parseInt(selectedTable)
          ? { ...t, paymentMethod, paid: true, order: [], total: 0, status: false }
          : t
      )
    );
    setCartItems([]);
    setSelectedTable("None");
  };

  const handleChangePayment = () => {
    if (selectedTable === "None") return;
    setTables(prev =>
      prev.map(t =>
        t.number === parseInt(selectedTable)
          ? { ...t, paymentMethod }
          : t
      )
    );
  };

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className={styles.container}>
      <ProductsGrid onAddToCart={addToCart} />
      <Ordersummary
        cartItems={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        tables={tables}
        selectedTable={selectedTable}
        onSelectTable={handleSelectTable}
        onPlaceOrder={handleRequestOrder}
        onCancelOrder={handleCancelOrder}
        onMarkPaid={handleMarkPaid}
        onChangePayment={handleChangePayment}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
      />

      {/* Confirmation + loading modal */}
      {showConfirm && (
        <POSConfirmModal
          cartItems={cartItems}
          total={total}
          selectedTable={selectedTable}
          paymentMethod={paymentMethod}
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default POS;
