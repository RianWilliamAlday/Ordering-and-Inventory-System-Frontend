export default function OwnerSales() {
  return (
    <div className="min-h-screen bg-gray-300 p-6 flex">

    
      <div className="w-40 space-y-3">
        <div className="bg-white px-4 py-2 rounded-full shadow">Sales reports</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Inventory</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Pending orders</div>
        <div className="bg-white px-4 py-2 rounded-full shadow">Menu</div>
      </div>


      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-6">Owner sales report</h1>

        <div className="bg-white rounded-2xl p-10 shadow-xl w-3/4">


          <div className="flex justify-center mb-8">
            <input 
              type="date" 
              className="px-8 py-2 bg-gray-200 rounded-full text-center font-medium"
            />
          </div>

  
          <p className="text-center mb-10">
            You have served <b>{`{total completed orders}`}</b> that day and have
            earned <b>{`{total amount}`}</b>.
          </p>


          <div className="bg-gray-200 p-6 rounded-xl">
            <p className="text-center mb-4 font-medium">
              Mini dashboard of completed orders that day
            </p>

         
            <div className="space-y-3">
         
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}