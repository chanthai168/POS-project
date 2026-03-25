
const totalCustomerIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 384h-128V256H475l768 768l-768 768h1189v-128h128v256H256v-91l805-805l-805-805v-91h1536z"></path></svg>;


function Box(){
    return(
        <>
        <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-10 rounded-3xl md:rounded-edge bg-soft-white w-[50%] md:w-76 border border-white">
            <div className=" flex gap-2 md:gap-4 items-center">
                <p className=" bg-soft-gray w-12 h-12 flex items-center justify-center rounded-3xl">{totalCustomerIcon}</p>
                <p className=" text-2xl md:text-3xl font-[Lato] ">32</p>
            </div>
            <p className="text-gray-600 text-sm md:text-md">Total-Customer</p>
        </div>
        </>
    )
}
export default Box;

