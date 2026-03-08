import { Routes,Route } from "react-router-dom";

import Login from "../pages/public/Login";

import Admin from "../layouts/Admin";
import User from "../layouts/User";

import Dashboard from "../pages/admin/Dashboard";
import Order from "../pages/admin/Order";
import Table from "../pages/admin/Table";
import POS from "../pages/admin/POS";
import Setting from "../pages/admin/Setting";

import Menu from "../pages/user/Menu";

function AppRoutes(){
    return(
        <>
        <Routes>
            <Route path="/admin" element={<Admin/>}>
                <Route path="dashboard" element={<Dashboard/>}></Route>
                <Route path="order" element={<Order/>}></Route>
                <Route path="table" element={<Table/>}></Route>
                <Route path="pos" element={<POS/>}></Route>
                <Route path="setting" element={<Setting/>}></Route>
            </Route>

            <Route path="/user" element={<User/>}>
                <Route path="menu" element={<Menu/>}></Route>
            </Route>

            <Route path="/" element={<Login/>}></Route>
            <Route path="*" element={<><h1 className=" text-red-600 font-medium text-3xl">Global, 404 page not Found!</h1></>}></Route>
        </Routes>
        </>
    )
}

export default AppRoutes;