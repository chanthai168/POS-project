import Nav from "../pages/admin/components/Nav";

import { Routes,Route, Outlet } from "react-router-dom"
function Admin(){
    return(
    <>
        <div className="app-background"></div>
        <header>
            <Nav/>
        </header>

        <main>
            <Outlet/>
        </main>
    </>
    )
}
export default Admin;