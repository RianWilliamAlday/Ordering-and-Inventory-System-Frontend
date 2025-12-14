export default function OrderHistory() {
  return (
    <div className="min-h-screen bg-gray-300 p-6 flex">

    
  <div className="w-40 space-y-3">
        <div className="bg-white px-4 py-2 rounded-full shadow">Sales reports</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Inventory</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Pending orders</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Order History</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Menu</div>
      </div>

 
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-6">
            Order History
        </h1>

        <div className="bg-white rounded-2xl p-10 shadow-xl w-3/4">
          <p className="text-center mb-8 font-medium">Orders History</p>

          
          <div className="space-y-4">
        
          </div>
        </div>
      </div>
    </div>
  );
}