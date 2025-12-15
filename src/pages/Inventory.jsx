
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InventoryAlert from "./Inventory";

const Inventory =  ({ }) =>{
  const [stocks, setStocks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({ category: "", stock: "" });
  const [editId, setEditId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const getStocks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/inventory/all");
      console.log("API Response:", res.data);
      setStocks(res.data);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3000/inventory/new", {
        category: formData.category,
        stocks: formData.stock,
      });
      setShowAdd(false);
      setFormData({ category: "", stock: "" });
      getStocks();
    } catch (err) {
      console.error("Error adding stock:", err);
    }
  };

  // Edit Stock
  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/inventory/edit/${editId}`,
        {
          category: formData.category,
          stocks: formData.stock,
        }
      );
      setShowEdit(false);
      setFormData({ category: "", stock: "" });
      getStocks();
    } catch (err) {
      console.error("Error editing stock:", err);
    }
  };

  const navigationItems = [
    { name: "Pending Orders", path: "/orders", active: false },
    { name: "Order History", path: "/history", active: false },
    { name: "Sales Reports", path: "/reports", active: false },
    { name: "Menu", path: "/menu", active: false },
    { name: "Inventory", path: "/inventory", active: true },
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
                Inventory
              </h1>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Stock Management</h2>
                </div>

                <button
                  onClick={() => setShowAdd(true)}
                  className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all transform hover:scale-105"
                >
                  + Add Stock
                </button>
              </div>

              {stocks.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg font-medium">No stock items</p>
                  <p className="text-gray-300 text-sm mt-2">Add stock items to manage inventory</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stocks.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-cyan-500 rounded-2xl p-6 shadow-sm transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Category
                          </p>
                          <p className="font-bold text-xl text-gray-800 capitalize">
                            {item.category}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setEditId(item.id);
                            setFormData({ category: item.category, stock: item.stocks });
                            setShowEdit(true);
                          }}
                          className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 px-5 py-2 rounded-lg font-semibold text-gray-800 transition-all transform hover:scale-105 shadow"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="pt-3 border-t-2 border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Current Stock
                        </p>
                        <p className="text-3xl font-bold text-cyan-600">
                          {item.stocks}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {showAdd && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                <h2 className="text-2xl font-bold text-center">Add Stock</h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>

                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Stock Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAdd(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAdd}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all shadow-lg"
                  >
                    Add Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                <h2 className="text-2xl font-bold text-center">Edit Stock</h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>

                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Stock Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEdit(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleEdit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-800 rounded-xl font-semibold transition-all shadow-lg"
                  >
                    Update Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Inventory;