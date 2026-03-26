
function Box({icon,number,text}){
    return(
        <>
        <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-10 rounded-3xl md:rounded-edge bg-soft-white w-[50%] md:w-76 border border-white">
            <div className=" flex gap-2 md:gap-4 items-center">
                <p className=" bg-soft-gray w-12 h-12 flex items-center justify-center rounded-3xl">{icon}</p>
                <p className=" text-2xl md:text-3xl font-[Lato] ">{number}</p>
            </div>
            <p className="text-gray-600 text-sm md:text-md">{text}</p>
        </div>
        </>
    )
}
export default Box;

