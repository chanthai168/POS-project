
import Card from "./Card";

const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h7m7 0h-7m0 0V5m0 7v7"></path></svg>;
const availableIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M11.707 6.707a1 1 0 0 0-1.414-1.414L7 8.586L5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2"/></svg>;
const starIcon = <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"></path></svg>;

import { useNavigate } from "react-router-dom";
function PopUpCard({Data,handleClick,setCart}){

    const navigate = useNavigate();

    function handlePaymentGateway(){
        addItemToCart();
        handleClick(prev=>!prev);
        navigate("/user/cart");
    }

    function addItemToCart(){

        setCart(prev=>{

            const target = prev.find(e => e.id === Data.data.id);

            if(target){
                return prev.map(e=>{
                    if(e.id == Data.data.id){
                    return {...e,quantity:e.quantity + 1};
                    }
                    return e;
                })
            }

            Data.data.quantity = 1;

            return [...prev,Data.data];
        })

        handleClick(prev=>!prev);  
    }

    return(
        <>
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',backdropFilter:"blur(2px)", display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}
            
        >
            <div className=" flex flex-col p-6 md:flex-row bg-soft-white md:p-12 gap-6 md:gap-12 rounded-edge relative">
                {/* <button className=" absolute right-8 top-8 text-red-400 rotate-45 rounded-4xl" onClick={e=>{handleClick(prev=>!prev)}}>{plusIcon}</button> */}
                <img src={Data.data.image} alt="" className=" w-70 md:w-96 rounded-edge"/>
                <div className=" flex flex-col justify-between w-70 md:w-96">
                    
                    <div className=" flex flex-col mb-8">
                        <div className="flex justify-between">
                            <p className="text-xl">{Data.data.name}</p>
                            <p className=" font-[Lato] font-light text-2xl">${Data.data.price}</p>
                        </div>

                        <div>
                            <p className=" text-sm text-gray-700">{Data.data.description}</p>
                        </div>

                        <div>
                            <p className="text-md mt-4">Allergen</p>
                            
                            {Data.data.allergen.length > 0 ? (
                                <div className=" flex gap-4">
                                    {Data.data.allergen.map((e,index)=>{
                                    return <p key={index} className="text-sm text-gray-700">{e}</p>
                                    })}
                                </div>
                            ):(<p className="text-sm text-gray-700">None</p>)}

                            
                        </div>
                        
                        <div className=" flex justify-between mt-4 items-center">
                            {Data.data.avilable ? (
                                <p className="flex items-center gap-2"><span className=" text-green-500">{availableIcon}</span>Available</p>
                            ):(
                                <p>Not available at the moment!</p>
                            )}

                            <p className="font-[Lato] font-light text-xl text-red-500 flex">{starIcon} {starIcon} {starIcon} {starIcon} {starIcon}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col justify-end gap-2">
                        <button onClick={e=>{handleClick(prev=>!prev)}}
                        className="bg-gray-300 text-red-600 rounded-4xl px-8 py-2  active:scale-95">Cancel</button>
                        <button onClick={addItemToCart}
                        className="bg-gray-300 rounded-4xl px-8 py-2   active:scale-95">Add to Cart</button>
                        <button onClick={handlePaymentGateway}
                        className="bg-blue-500 text-gray-200 rounded-4xl px-8 py-2 hover:bg-blue-600 active:scale-95">Order Now</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}
export default PopUpCard;