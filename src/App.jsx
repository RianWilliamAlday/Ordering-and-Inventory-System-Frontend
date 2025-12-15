import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../src/pages/Login.jsx'
import Cashier from './pages/Cashier.jsx'
import SalesReport from './pages/SalesReport.jsx'
import Orders from './pages/PendingOrders.jsx'
import History from './pages/History.jsx'
import Menu from './pages/Menu.jsx'
import Inventory from './pages/Inventory.jsx'

function App() {

  return (
    <>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cashier" element={<Cashier />} />
        <Route path="/reports" element={<SalesReport />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/history" element={<History />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>   
    </BrowserRouter>
    </>
  )
}

export default App
