export default function Cashier() {
  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <h1 className="text-center text-xl font-semibold mb-6">Cashier</h1>

      
      <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">

        
        <div className="flex flex-col items-center w-full">
          <p className="text-sm mb-1">Orders</p>
          <input
            type="text"
            placeholder="Orders"
            className="bg-white px-6 py-2 w-full rounded-full shadow text-center outline-none"
          />
        </div>

        
        <div className="flex flex-col items-center w-full">
          <p className="text-sm mb-1">Table Number</p>
          <input
            type="text"
            placeholder="Number"
            className="bg-white px-6 py-2 w-full rounded-full shadow text-center outline-none"
          />
        </div>

        
        <div className="flex flex-col items-center w-full">
          <p className="text-sm mb-1">Quantity</p>
          <input
            type="number"
            placeholder="Quantity"
            className="bg-white px-6 py-2 w-full rounded-full shadow text-center outline-none"
          />
        </div>

      
        <div className="flex flex-col items-center w-full">
          <p className="text-sm mb-1">Total</p>
          <input
            type="text"
            placeholder="Total"
            className="bg-white px-6 py-2 w-full rounded-full shadow text-center outline-none"
          />
        </div>
      </div>

      
      <div className="flex flex-col items-center mt-8 w-full">
        <p className="text-sm mb-1">Payment Method</p>

        <select
          className="
            bg-white px-6 py-2 w-64 rounded-full shadow text-center 
            outline-none cursor-pointer
          "
        >
          <option>Select Payment Method</option>
          <option>Gcash</option>
          <option>Cash</option>
        </select>
      </div>

      
      <div className="bg-white rounded-2xl shadow-lg mt-10 p-6 max-w-5xl mx-auto h-64">
        <p className="text-center font-medium mb-4">Pending Orders</p>
      </div>
    </div>
  );
}