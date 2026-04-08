import { useState } from "react";

const POSConfirmModal = ({ cartItems, total, selectedTable, paymentMethod, onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    // Simulate a brief processing moment
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  const handleDone = () => {
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.35)" }}
    >
      <div className="bg-soft-white font-[Manrope] rounded-edge p-10 flex flex-col items-center max-w-sm w-full mx-4 border border-white">

        {/* Loading state */}
        {loading && (
          <>
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse scale-150 opacity-30"></div>
              <svg
                className="animate-spin text-blue-600 w-24 h-24 relative z-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 animate-pulse mb-2">Processing Order...</h2>
            <p className="text-slate-500 text-sm">Please wait</p>
          </>
        )}

        {/* Success state */}
        {done && (
          <>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Order Placed!</h2>
            <p className="text-slate-500 text-sm mb-6">
              {selectedTable !== "None" ? `Table ${selectedTable}` : "Takeaway"} · ${total.toFixed(2)} · {paymentMethod}
            </p>
            <button
              onClick={handleDone}
              className="w-full py-2 px-6 bg-blue-500 text-white rounded-4xl hover:bg-blue-600 transition-colors"
            >
              Done
            </button>
          </>
        )}

        {/* Confirmation state */}
        {!loading && !done && (
          <>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Confirm Order</h2>
            <p className="text-slate-500 text-sm mb-5">
              {selectedTable !== "None" ? `Table ${selectedTable}` : "Takeaway"} · {paymentMethod}
            </p>

            {/* Order summary */}
            <div className="w-full bg-gray-100 rounded-2xl p-4 mb-5 max-h-40 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-1 border-b border-gray-200 last:border-0">
                  <span>{item.name} × {item.qty}</span>
                  <span className="font-medium">$ {(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between w-full font-bold text-base mb-6 px-1">
              <span>Total</span>
              <span>$ {total.toFixed(2)}</span>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={onCancel}
                className="flex-1 py-2 rounded-4xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2 rounded-4xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default POSConfirmModal;
