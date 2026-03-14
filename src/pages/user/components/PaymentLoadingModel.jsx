import React,{useState} from 'react';
import { Navigate,useNavigate } from 'react-router-dom';

const PaymentLoadingModal = ({isPurchase,setIsPurchase}) => {
  
  if (!isPurchase) return null;

  const navigate = useNavigate();

  function handleClick(){
    navigate("/user/menu")
    setIsPurchase(!isPurchase);
    
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/60 backdrop-blur-sm transition-all" style={{background:'rgba(0,0,0,0.35)'}}>
      {/* Modal Card */}
      <div className="bg-soft-white font-[Manrope] rounded-edge p-16 flex flex-col items-center max-w-sm w-full mx-4 border border-white relative">
        
        {/* Large Animated Spinner */}
        <div className="relative mb-10">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse scale-150 opacity-30"></div>
          
          <svg
            className="animate-spin text-blue-600 w-32 h-32 relative z-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-10"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        {/* Content Section */}
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight animate-pulse">
            Payment Gateway Processing
          </h2>
          <p className="text-slate-500 text-sm ">
            Verifying your credentials with the bank...
          </p>
        </div>

        {/* Test/Cancel Button */}
        <button
          onClick={handleClick}
          className="w-full py-2 px-6 bg-blue-500 text-white    hover:bg-blue-600 rounded-4xl transition-colors duration-200 "
        >
          Confirm Payment
        </button>

        {/* Security Footer */}
        <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure 256-bit Encryption
        </div>
      </div>
    </div>
  );
};

export default PaymentLoadingModal;