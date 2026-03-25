
import { NavLink } from "react-router-dom";
function Login(){
    return(
        <>
        <h1 className=" m-10">Hello happy login</h1>
        <NavLink to={"/admin/dashboard"} className=" bg-amber-500 rounded-3xl px-8 py-2 text-white m-10">Dashboard</NavLink>
        </>
    )
}
export default Login;