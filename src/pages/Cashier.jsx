import { useState, useEffect } from "react";
import axios from "axios";
import QRCode from './Images/QR Code.png';

const Cashier =  ({ }) =>{
  const [orders, setOrders] = useState([]);
  const [orderedItems, setOrderedItems] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showGcashModal, setShowGcashModal] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders/all");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu/all");
      setMenuItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("MENU FETCH ERROR:", err);
      setMenuItems([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleSelect = (id, name, price) => {
    try {
      setSelectedItems((prev) => {
        const updated = { ...prev };
        if (updated[id]) {
          delete updated[id];
        } else {
          const numericPrice = Number(price || 0);
          updated[id] = { name: String(name ?? "Item"), price: isNaN(numericPrice) ? 0 : numericPrice, qty: 1 };
        }
        return updated;
      });
    } catch (e) {
      console.error("toggleSelect error:", e);
    }
  };

  const updateQty = (id, qtyValue) => {
    try {
      const qtyNum = Number(qtyValue);
      if (!Number.isFinite(qtyNum) || qtyNum <= 0) return;

      setSelectedItems((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: { ...prev[id], qty: Math.floor(qtyNum) }
        };
      });
    } catch (e) {
      console.error("updateQty error:", e);
    }
  };

  const confirmMenuSelection = () => {
    try {
      const items = Object.values(selectedItems);
      if (items.length === 0) {
        setShowMenuModal(false);
        return;
      }

      const formatted = items.map((i) => `${i.name} x${i.qty}`).join(", ");
      setOrderedItems(formatted);

      const totalQty = items.reduce((sum, i) => sum + Number(i.qty || 0), 0);
      setQuantity(String(totalQty));

      const totalPrice = items.reduce((sum, i) => sum + (Number(i.price || 0) * Number(i.qty || 0)), 0);
      setTotal(String(totalPrice.toFixed(2)));

      setShowMenuModal(false);
    } catch (e) {
      console.error("confirmMenuSelection error:", e);
    }
  };

  const handleSubmit = async () => {
    if (!orderedItems || !tableNumber || !quantity || !total || !paymentMethod) {
      alert("Please fill in all fields");
      return;
    }

    if (paymentMethod === "gcash") {
      setPendingOrderData({
        order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        ordered_items: orderedItems,
        table_number: tableNumber,
        quantity,
        total,
        payment_method: paymentMethod,
      });
      setShowGcashModal(true);
      return;
    }

    try {
      await axios.post("http://localhost:3000/orders/new", {
        order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        ordered_items: orderedItems,
        table_number: tableNumber,
        quantity,
        total,
        payment_method: paymentMethod,
      });

      fetchOrders();

      setOrderedItems("");
      setTableNumber("");
      setQuantity("");
      setTotal("");
      setPaymentMethod("");
      setSelectedItems({});
    } catch (error) {
      console.error("CREATE ERROR:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/orders/complete/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("COMPLETE ERROR:", error);
    }
  };

  const confirmGcashOrder = async () => {
    if (!pendingOrderData) return;

    try {
      await axios.post("http://localhost:3000/orders/new", pendingOrderData);

      fetchOrders();

      setOrderedItems("");
      setTableNumber("");
      setQuantity("");
      setTotal("");
      setPaymentMethod("");
      setSelectedItems({});
      setPendingOrderData(null);
      setShowGcashModal(false);
    } catch (error) {
      console.error("CREATE ERROR:", error);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10">
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <h2 className="text-2xl font-bold text-center">Select Menu Items</h2>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {menuItems.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No menu items available</p>
              ) : (
                <div className="space-y-3">
                  {menuItems.map((dish) => {
                    const id = dish.id ?? dish.ID ?? dish.menu_id;
                    const name = dish.item ?? dish.dish_name ?? "Unnamed";
                    const price = Number(dish.price ?? 0);
                    const isSelected = !!selectedItems[id];

                    return (
                      <div key={String(id)} className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(id, name, price)}
                            className="w-5 h-5 accent-emerald-600 cursor-pointer"
                          />
                          <div className="flex-1">
                            <span className="font-semibold text-gray-800 block">{name}</span>
                            <span className="text-emerald-600 font-medium">₱{isNaN(price) ? "0.00" : Number(price).toFixed(2)}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <input
                            type="number"
                            min="1"
                            value={selectedItems[id]?.qty ?? 1}
                            onChange={(e) => updateQty(id, e.target.value)}
                            className="w-20 border-2 border-emerald-500 rounded-lg px-3 py-2 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                onClick={() => setShowMenuModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmMenuSelection}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showGcashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
              <h2 className="text-2xl font-bold text-center">GCash Payment</h2>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <div className="text-center mb-4">
                <p className="text-gray-700 font-semibold mb-2">Scan QR Code to Pay</p>
                <p className="text-emerald-600 text-2xl font-bold">₱{total}</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="border-4 border-gray-200 rounded-xl p-4 bg-gray-50">
                  <img 
                    src={QRCode}
                    alt="GCash QR Code" 
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 text-center">
                  Please scan the QR code above using your GCash app to complete the payment.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                onClick={() => {
                  setShowGcashModal(false);
                  setPendingOrderData(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmGcashOrder}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Add Order
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Cashier Panel</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Order</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Orders</label>
              <input
                type="text"
                value={orderedItems}
                placeholder="Click to select dishes..."
                onClick={() => {
                  fetchMenu();
                  setShowMenuModal(true);
                }}
                readOnly
                className="px-4 py-3 rounded-xl border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:border-emerald-500 transition-colors shadow-sm font-medium text-gray-700"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Table No.</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 12"
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-emerald-500 focus:outline-none transition-colors shadow-sm font-medium"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Quantity</label>
              <input
                type="text"
                value={quantity}
                readOnly
                placeholder="Auto"
                className="px-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-100 cursor-not-allowed shadow-sm font-medium text-gray-600"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Total</label>
              <input
                type="text"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="₱0.00"
                className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-emerald-500 focus:outline-none transition-colors shadow-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 border-t-2 border-gray-100">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="px-6 py-3 w-full md:w-80 rounded-xl border-2 border-gray-300 focus:border-emerald-500 focus:outline-none transition-colors shadow-sm font-medium text-gray-700"
            >
              <option value="">Select Payment Method</option>
              <option value="gcash">GCash</option>
              <option value="cash">Cash</option>
            </select>

            <button
              onClick={handleSubmit}
              className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-12 rounded-xl shadow-xl transition-all transform hover:scale-105"
            >
              Add Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Pending Orders</h2>
            <span className="ml-auto bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg font-medium">No pending orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 rounded-2xl border-2 border-gray-200 hover:border-emerald-500 transition-all shadow-sm gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-lg text-gray-800 mb-2">{order.ordered_items}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-semibold">Table:</span> {order.table_number}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-semibold">Qty:</span> {order.quantity} pcs
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        ₱{order.total}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleComplete(order.id)} 
                    className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
                  >
                    Complete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Cashier;

