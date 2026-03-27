
const tableIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><ellipse cx={12} cy={6.5} rx={10} ry={3}></ellipse><path strokeLinejoin="round" d="M12 20.5a3.9 3.9 0 0 0 2.19-.654a.73.73 0 0 0 .229-.93C14.073 18.258 13.33 17.5 12 17.5s-2.073.76-2.419 1.415a.73.73 0 0 0 .229.93c.6.41 1.362.655 2.19.655Z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5v-8"></path></g></svg>;
import { useAppContext } from "../../../../context/AppProvider";
function TableBox(){
    const {tables} = useAppContext();
    let numberOfActive = 0;
    tables.forEach(e=>{
        if(e.status){
            numberOfActive ++;
        }
    })
    return(
        <>
        <div className=" p-4 md:p-6 flex flex-col gap-4 md:gap-10 rounded-3xl md:rounded-edge bg-soft-white w-[50%] md:w-76 border border-white">
            <div className=" flex gap-2 md:gap-4 items-center">
                <p className=" bg-soft-gray w-12 h-12 flex items-center justify-center rounded-3xl">{tableIcon}</p>
                <p className="text-2xl md:text-3xl font-[Lato] ">{numberOfActive}<span className=" text-gray-500 relative top-1">/{tables.length}</span></p>
            </div>
            <p className="text-gray-600 text-sm md:text-md">Total-Table</p>
        </div>
        </>
    )
}
export default TableBox;