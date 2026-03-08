import { Outlet } from "react-router-dom";

function User(){
    return(
        <>
            <header>
                <h1>Hello the is User mode pages</h1>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
    )
}
export default User;