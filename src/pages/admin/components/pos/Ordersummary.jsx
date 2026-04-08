import { useState, useEffect } from "react";
import styles from "../../../css/pos.module.css";

const CancelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const OrderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)
const PaidIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const ChangePaymentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
    <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
  </svg>
)
const CashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
  </svg>
)
const CardIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)
const QRIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/>
    <line x1="19" y1="14" x2="19" y2="14"/><line x1="19" y1="19" x2="21" y2="19"/>
    <line x1="21" y1="14" x2="21" y2="17"/>
  </svg>
)

export default function Ordersummary({
  cartItems, onRemove, onUpdateQty,
  tables, selectedTable, onSelectTable,
  onPlaceOrder, onCancelOrder,
  onMarkPaid, onChangePayment,
  paymentMethod, onPaymentMethodChange,
}) {
  const [isNarrow, setIsNarrow] = useState(false);

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  // Order button only requires items in cart — table is optional
  const canOrder = cartItems.length > 0;

  const selectedTableData = tables.find(t => t.number === parseInt(selectedTable));
  const hasOrder = selectedTableData?.order?.length > 0;

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 920);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const payments = [
    { label: "Cash", icon: <CashIcon /> },
    { label: "Card", icon: <CardIcon /> },
    { label: "QR",   icon: <QRIcon /> },
  ];

  return (
    <div className={styles.summaryContainer}>

      {/* Cart Items */}
      <div className={styles.cartList}>
        <div className={styles.cartHeader}>
          <span>Food</span><span>Quantity</span><span>Price</span><span>Del</span>
        </div>
        {cartItems.length === 0 && <p className={styles.emptyCart}>No items yet</p>}
        {cartItems.map(item => (
          <div key={item.id} className={styles.cartRow}>
            <img src={item.image} alt={item.name} className={styles.cartItemImage} />
            <div className={styles.qtyControl}>
              <button onClick={() => onUpdateQty(item.id, -1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => onUpdateQty(item.id, 1)}>+</button>
            </div>
            <span>$ {(item.price * item.qty).toFixed(2)}</span>
            <button onClick={() => onRemove(item.id)} className={styles.removeBtn}>✕</button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className={styles.totalBox}>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span>$ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Table Number — optional, shows occupied status */}
      <div className={styles.paymentBox}>
        <p className={styles.paymentLabel}>
          Table number <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
        </p>
        <select
          className={styles.tableSelect}
          value={selectedTable}
          onChange={e => onSelectTable(e.target.value)}
        >
          <option value="None">None (Takeaway)</option>
          {tables.map(t => (
            <option key={t.id} value={t.number}>
              Table {t.number} {t.type === "VIP" ? "♥ VIP" : ""} {t.status ? "· Occupied" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Method */}
      <div className={styles.paymentBox}>
        <p className={styles.paymentLabel}>Paid by</p>
        <div className={styles.paymentOptions}>
          {payments.map(({ label, icon }) => (
            <button
              key={label}
              className={`${styles.paymentBtn} ${paymentMethod === label ? styles.paymentBtnActive : ""}`}
              onClick={() => onPaymentMethodChange(label)}
              title={label}
            >
              {icon}
              {!isNarrow && <span className={styles.btnText}>{label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Order + Cancel — Order only needs items, table is optional */}
      <div className={styles.actionButtons}>
        <button className={styles.cancelBtn} onClick={onCancelOrder} title="Cancel">
          {!isNarrow && <span className={styles.btnText}>Cancel</span>}
          <CancelIcon />
        </button>
        <button
          className={styles.placeBtn}
          onClick={onPlaceOrder}
          disabled={!canOrder}
          style={{ opacity: canOrder ? 1 : 0.5 }}
          title="Order"
        >
          {!isNarrow && <span className={styles.btnText}>Order</span>}
          <OrderIcon />
        </button>
      </div>

      {/* Mark Paid + Change Payment — only shown when selected table has an existing order */}
      {hasOrder && (
        <div className={styles.actionButtons}>
          <button className={styles.changePaymentBtn} onClick={onChangePayment} title="Change Payment">
            {!isNarrow && <span className={styles.btnText}>Change</span>}
            <ChangePaymentIcon />
          </button>
          <button className={styles.paidBtn} onClick={onMarkPaid} title="Mark as Paid">
            {!isNarrow && <span className={styles.btnText}>Paid</span>}
            <PaidIcon />
          </button>
        </div>
      )}

    </div>
  );
}
