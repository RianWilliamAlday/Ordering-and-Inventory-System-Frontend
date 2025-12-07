export default function MenuItems() {
  return (
    <div className="min-h-screen bg-gray-300 p-6 flex">

      
      <div className="w-40 space-y-3">
        <div className="bg-white px-4 py-2 rounded-full shadow">Sales reports</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Inventory</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Pending orders</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Menu</div>
      </div>

      
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-6">Menu Items</h1>

        <div className="bg-white w-3/4 rounded-2xl shadow-xl p-6">

          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-200 py-3 rounded-xl text-center">Lomi</div>
            <div className="bg-gray-200 py-3 rounded-xl text-center">Silog</div>
            <div className="bg-gray-200 py-3 rounded-xl text-center">Pancit Guisado</div>
          </div>

          
          <div className="bg-white h-96 rounded-xl border border-gray-200"></div>

        </div>
      </div>
    </div>
  );
}