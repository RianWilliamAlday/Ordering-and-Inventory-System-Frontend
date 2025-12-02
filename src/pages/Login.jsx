export default function Login() {
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-6">
      
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">

        
        <h1 className="text-center text-2xl font-semibold mb-10">
          Login
        </h1>

        
        <div className="flex flex-col items-center mb-6 w-full">
          <p className="text-sm mb-1">User</p>

          <select
            className="bg-white px-6 py-3 w-full rounded-fullshadow text-center outline-none cursor-pointer"
          >
            <option>Select User</option>
            <option>Admin</option>
            <option>Cashier</option>
          </select>
        </div>

        
        <div className="flex flex-col items-center mb-10 w-full">
          <p className="text-sm mb-1">Password</p>

          <input
            type="password"
            placeholder="Password"
            className="bg-white px-6 py-3 w-full rounded-fullshadow text-center outline-none"
          />
        </div>

        
        <button
          className="w-full bg-gray-800 text-white py-3 rounded-full hover:bg-gray-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
