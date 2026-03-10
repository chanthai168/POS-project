import { Outlet } from "react-router-dom";

function User(){
    return(
        <>
            <div className="app-background"></div>
            <header>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
    )
}
export default User;