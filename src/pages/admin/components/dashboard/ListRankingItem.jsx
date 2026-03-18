
function ListRankingItem({item}){
    return(
        <>
        <div className=" flex gap-2 md:gap-8 items-center border-b border-gray-200 my-4">
            <img src={item.image} alt="ranking food" className="w-14 md:w-20 rounded-md"  />
            <p className="text-sm w-24 truncate text-gray-600">{item.name}</p>
            <p className="w-8 truncate text-gray-600">{item.quantity}</p>
            <p className=" w-12 text-red-400 text-sm">{item.rating}/5</p>
            <p className=" text-gray-800 text-sm">${item.price}</p>
        </div>
        </>
    )
}
export default ListRankingItem;