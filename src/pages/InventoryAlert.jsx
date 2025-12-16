import { useEffect, useState } from "react";
import axios from "axios";

const InventoryAlert = ({
  category,
  threshold = 15,
}) => {
  const [alerts, setAlerts] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/menu/orders/count/${category}`
        );

        if (res.data.total_orders >= threshold) {
  setAlerts(res.data.dishes);
  setVisible(true);
} else {
  setVisible(false);
}

      } catch (err) {
        console.error("Failed to fetch order counts:", err);
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, [category, threshold]);

  if (!visible || alerts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 w-80 bg-red-50 border border-red-300 rounded-xl shadow-lg p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-red-600">
          Inventory Alert ⚠️
        </h3>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-gray-700 mt-2">
        The following dishes from <b>{category}</b> have reached high order volume:
      </p>

      <ul className="mt-2 space-y-1 text-sm">
        {alerts.map((dish) => (
          <li key={dish.item} className="flex justify-between">
            <span>{dish.item}</span>
            <span className="font-semibold text-red-600">
              {dish.order_count}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-red-700 mt-3">
        Please check inventory levels.
      </p>
    </div>
  );
}

export default InventoryAlert;