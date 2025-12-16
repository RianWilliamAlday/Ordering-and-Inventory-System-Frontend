import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InventoryAlert from "./InventoryAlert";
import axios from "axios";

const SalesReport =  ({ }) =>{
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const getToday = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getToday());
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!date) return;

    fetchDailySummary();
    fetchOrdersByDate();
  }, [date]);

  const fetchDailySummary = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/reports/daily-summary/${date}`
      );
      setSummary(res.data);
    } catch (err) {
      console.log("Summary fetch error:", err);
    }
  };

  const fetchOrdersByDate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/reports/by-date/${date}`
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log("Orders fetch error:", err);
    }
  };

  const navigationItems = [
    { name: "Pending Orders", path: "/orders", active: false },
    { name: "Order History", path: "/history", active: false },
    { name: "Sales Reports", path: "/reports", active: true },
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
                Sales Report
              </h1>
              <p className="text-slate-400 text-lg">
                Track your daily revenue and performance
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Daily Summary</h2>
              </div>

              <div className="flex justify-center mb-8">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-8 py-3 border-2 border-gray-300 rounded-xl text-center font-semibold cursor-pointer hover:border-purple-500 transition-colors shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Total Orders
                  </p>
                  <p className="text-5xl font-bold text-emerald-600">
                    {summary?.totalOrders ?? 0}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Total Revenue
                  </p>
                  <p className="text-5xl font-bold text-purple-600">
                    ₱{summary?.totalRevenue ?? 0}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-gray-800">
                    Completed Orders for {date}
                  </p>
                  <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold">
                    {orders.length} {orders.length === 1 ? "Order" : "Orders"}
                  </span>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-lg font-medium">
                        No completed orders
                      </p>
                      <p className="text-gray-300 text-sm mt-2">
                        Orders for this date will appear here
                      </p>
                    </div>
                  ) : (
                    orders.map((o) => {
                      const itemsArray = o.ordered_items
                        .split(",")
                        .map((i) => i.trim());

                      const displayedItems =
                        itemsArray.length > 3
                          ? `${itemsArray.slice(0, 3).join(", ")}...`
                          : itemsArray.join(", ");

                      return (
                        <div
                          key={o.order_id}
                          className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200 hover:border-purple-500 transition-all flex flex-col md:flex-row justify-between gap-3"
                        >
                          <div className="flex-1">
                            <p className="font-bold text-gray-800 mb-1">
                              {displayedItems}
                            </p>
                            <p className="text-sm text-gray-500">
                              Table {o.table_number}
                            </p>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-2xl font-bold text-purple-600">
                              ₱{o.total}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesReport;
