
function CalculatePay({subTotal,discount,total}){
    return(
        <>
        <div className="flex flex-col w-full lg:w-[40vw] bg-soft-white rounded-3xl md:rounded-edge p-4 md:p-8 border border-white">
            <div className=" flex justify-between border-b border-gray-300 py-2">
                <p>Sub-total</p>
                <p className=" font-[Lato]">{subTotal.toFixed(2)}</p>
            </div>

            <div className=" flex justify-between border-b border-gray-300 py-2">
                <p>Discount</p>
                <p className=" font-[Lato]">${discount.toFixed(2)}</p>
            </div>

            <div className=" flex justify-between  py-2">
            <p>Total</p>
                <p className=" font-[Lato] text-lg font-bold">${total.toFixed(2)}</p>
            </div>
        </div>
        </>
    )
}
export default CalculatePay;