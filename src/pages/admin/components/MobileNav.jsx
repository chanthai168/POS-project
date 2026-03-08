import { Link,NavLink } from "react-router-dom";

const dashboardIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M20 11h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1m-1 8h-4v-6h4zm-9-4H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 4H5v-2h4zM20 3h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 4h-4V5h4zm-9-4H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 8H5V5h4z"></path></svg>;
const orderIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth={2} d="M11 4h11m-11 8h11m-11 8h11M2 3h1c.552 0 1 .451 1 1.004V10m0 0H2m2 0h2m-4 4h3a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1H3a1 1 0 0 0-1 1V21h4"></path></svg>;
const tableIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M22 7.5C22 5.57 17.52 4 12 4S2 5.57 2 7.5c0 1.81 3.95 3.31 9 3.48V15H9.35c-.82 0-1.55.5-1.86 1.26L6 20h2l1.2-3h5.6l1.2 3h2l-1.5-3.74c-.3-.76-1.04-1.26-1.85-1.26H13v-4.02c5.05-.17 9-1.67 9-3.48M12 6c4.05 0 6.74.86 7.72 1.5C18.74 8.14 16.05 9 12 9s-6.74-.86-7.72-1.5C5.26 6.86 7.95 6 12 6"></path></svg>;
const posIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M17 9H8V7h9zM7 7H5v2h2zm0-3H5v2h2zm3 0H8v2h2zm3 13v2h1c.55 0 1 .45 1 1h7v2h-7c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1H2v-2h7c0-.55.45-1 1-1h1v-2H4c-1.11 0-2-.89-2-2V3a2 2 0 0 1 2-2h16c1.11 0 2 .89 2 2v12c0 1.11-.89 2-2 2zm7-2V3H4v12zm-9-9h8V4h-8zm-6 6h6v-2H5zm8 2h6v-2h-6z"></path></svg>;

function MobileNav(){
    return(
        <div className="mobile-nav">
            <NavLink to="/admin/dashboard">
                {dashboardIcon}
            </NavLink  >
            <NavLink to="/admin/order">   
                {orderIcon}
            </NavLink>
            <NavLink to="/admin/table">
                {tableIcon}
            </NavLink>
            <NavLink to="/admin/pos">
                {posIcon}
            </NavLink>
        </div>
    )
}
export default MobileNav;