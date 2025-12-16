import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InventoryAlert from "./InventoryAlert";

const PendingOrders =  ({ }) =>{
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders/all");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    loadOrders();
  }, []);

  const navigationItems = [
    { name: "Pending Orders", path: "/orders", active: true },
    { name: "Order History", path: "/history", active: false },
    { name: "Sales Reports", path: "/reports", active: false },
    { name: "Menu", path: "/menu", active: false },
    { name: "Inventory", path: "/inventory", active: false },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <InventoryAlert category="lomi" threshold={15} />
      <InventoryAlert category="pancit guisado" threshold={15} />
      <InventoryAlert category="silog" threshold={15} />
      <InventoryAlert category="chami" threshold={15} />
      <InventoryAlert category="ala carte" threshold={15} />
      <InventoryAlert category="lumpia" threshold={15} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-72 bg-white p-6 flex flex-col gap-6 transition-transform duration-300 z-40 shadow-2xl`}
        >
          <div className="flex items-center gap-3 pb-6 border-b-2 border-gray-100">
            <div className="w-2 h-12 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          </div>

          <nav className="flex flex-col gap-3">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`${
                  item.active
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } rounded-xl py-3 px-5 text-left font-semibold transition-all transform hover:scale-105`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 mt-16 lg:mt-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                Pending Orders
              </h1>
              <p className="text-slate-400 text-lg">
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Current Orders
                  </h2>
                </div>
                <span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg font-medium">
                    No pending orders
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-emerald-500 rounded-2xl p-6 shadow-sm transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Order Date
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.order_date}
                          </p>
                        </div>
                        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                          Active
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Items Ordered
                          </p>
                          <p className="font-semibold text-gray-800">
                            {order.ordered_items}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                              Table
                            </p>
                            <p className="font-semibold text-gray-800">
                              {order.table_number}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                              Quantity
                            </p>
                            <p className="font-semibold text-gray-800">
                              {order.quantity} pcs
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t-2 border-gray-200">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Total Amount
                          </p>
                          <p className="text-2xl font-bold text-emerald-600">
                            ₱{order.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingOrders;