import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InventoryAlert from "./InventoryAlert";

const Menu =  ({ }) =>{
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({ item: "", category: "", price: "" });
  const [editId, setEditId] = useState(null);

  const loadDishes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu/category");
      setDishes(res.data.data);

      const keys = Object.keys(res.data.data);
      setCategories(keys);
      if (!selectedCategory) setSelectedCategory(keys[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const openAddModal = () => {
    setIsOpen(true);
    setIsEdit(false);
    setForm({ item: "", category: selectedCategory, price: "" });
  };

  const openEditModal = (dish) => {
    setIsOpen(true);
    setIsEdit(true);
    setEditId(dish.id);
    setForm({
      item: dish.item,
      category: dish.category,
      price: dish.price
    });
  };

  const submitDish = async () => {
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:3000/menu/edit/${editId}`,
          form
        );
      } else {
        await axios.post("http://localhost:3000/menu/new", form);
      }

      setIsOpen(false);
      loadDishes();
    } catch (e) {
      console.log(e);
    }
  };

  const navigationItems = [
    { name: "Pending Orders", path: "/orders", active: false },
    { name: "Order History", path: "/history", active: false },
    { name: "Sales Reports", path: "/reports", active: false },
    { name: "Menu", path: "/menu", active: true },
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
                Menu Items
              </h1>
              <p className="text-slate-400 text-lg">
                Manage your restaurant menu
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
              </div>

              <div className="overflow-x-auto mb-6 pb-2">
                <div className="inline-flex space-x-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`px-6 py-3 rounded-xl min-w-[140px] text-center font-semibold transition-all transform hover:scale-105 ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mb-6">
                <button
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all transform hover:scale-105"
                >
                  + Add Dish
                </button>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 p-6 min-h-[400px]">
                {selectedCategory && dishes[selectedCategory] && dishes[selectedCategory].length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dishes[selectedCategory].map((dish) => (
                      <div
                        key={dish.id}
                        className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-5 shadow-sm transition-all flex justify-between items-center"
                      >
                        <div>
                          <p className="font-bold text-lg text-gray-800">{dish.item}</p>
                          <p className="text-xl font-bold text-blue-600 mt-1">₱{dish.price}</p>
                        </div>

                        <button
                          className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 px-5 py-2 rounded-lg font-semibold text-gray-800 transition-all transform hover:scale-105 shadow"
                          onClick={() => openEditModal(dish)}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg font-medium">No items found</p>
                    <p className="text-gray-300 text-sm mt-2">Add dishes to this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                <h2 className="text-2xl font-bold text-center">
                  {isEdit ? "Edit Dish" : "Add New Dish"}
                </h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter item name"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    value={form.item}
                    onChange={(e) => setForm({ ...form, item: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>

                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    className="w-full border-2 border-gray-300 p-3 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all shadow-lg"
                    onClick={submitDish}
                  >
                    {isEdit ? "Save Changes" : "Add Dish"}
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

export default Menu;
localhost