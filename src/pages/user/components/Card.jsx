const starIcon = <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"></path></svg>;
const availableIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M11.707 6.707a1 1 0 0 0-1.414-1.414L7 8.586L5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2"/></svg>;
import { useState } from "react";
import PopUpCard from "./PopUpCard";
import PaymentLoadingModal from "./PaymentLoadingModel";
function Card(Data){
    const [isClick,setIsClick] = useState(false);

    function handleClick(){
       setIsClick(prev=> !prev);
    }

    return(
        <>
        <div onClick={ handleClick}  className="w-96  flex flex-col bg-white items-center rounded-edge">
            <div className="bg-[#FBEFEF] w-full rounded-edge flex justify-center px-8 md:px-12 py-6">
                <img src={Data.data.image} alt="food" className=" w-80 rounded-3xl" />
            </div>

            <div className=" flex flex-col  p-6">
                <div className="flex justify-between">
                    <p className="text-xl">{Data.data.name}</p>
                    <p className=" font-[Lato] font-light text-2xl">${Data.data.price}</p>
                </div>

                <div className="h-10">
                    <p className=" text-sm text-gray-700">{Data.data.description}</p>
                </div>

                <div>
                    <p className="text-md mt-4">Allergen</p>
                    <div className=" flex gap-4">
                        {Data.data.allergen.map((e,index)=>{
                            return <p key={index} className="text-sm text-gray-700">{e}</p>
                        })}
                    </div>
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
        </div>

        {isClick &&(
            <PopUpCard Data={Data}  handleClick={handleClick}  setCart={Data.setCart} cart={Data.cart}/>
        )}

        </>
    )
}
export default Card;