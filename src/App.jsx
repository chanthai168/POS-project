
import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/Order";
import Nav from "./components/sementic/Nav";

function App() {
  return (
    <>
    <div className="app-background"></div>
    <Nav/>

    <main>
      <h1>Hello, This is App component</h1>

      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/order" element={<Order/>}></Route>
      </Routes>
    </main>

    </>
  );
}

export default App;
