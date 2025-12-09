import { useState } from "react";
import Login from "../src/pages/Login.jsx"
import Cashier from "../src/pages/Cashier.jsx";
import PendingOrders from "../src/pages/PendingOrders.jsx";



function App() {
  return (
    <>
  <Login/>
  <Cashier/>
  <PendingOrders/>
    </> 
  );
}

export default App;
