import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Nav from "./components/sementic/Nav";
import Setting from "./pages/setting/Setting";
import Table from "./pages/Table";

function App() {
  return (
    <>
      <div className="app-background"></div>
      <Nav/>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
          <Route path="/setting" element={<Setting/>}></Route>
          <Route path="/table" element={<Table/>}></Route>
        </Routes>
      </main>
    </>
  );
}
export default App;