import { useState } from "react";
import axios from "axios";

const Login =  ({ }) =>{
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!role || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        role,
        password,
      });

      if (res.data.success) {
        setSuccess("Login successful!");

        const userRole = res.data.message.role.toLowerCase();

        if (userRole === "admin") {
          window.location.href = "/orders";
        } else {
          window.location.href = "/cashier";
        }
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
     <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen max-w-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Welcome</h1>
          <p className="text-slate-400 text-lg">Sign in to continue</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          </div>

          <div className="mb-6 w-full">
            <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">User</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 shadow-sm outline-none focus:border-emerald-500 transition-colors text-gray-700 font-medium"
            >
              <option value="">Select User</option>
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>

          <div className="mb-6 w-full">
            <label className="text-sm font-semibold text-gray-700 mb-2 block uppercase tracking-wide">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 shadow-sm outline-none focus:border-emerald-500 transition-colors font-medium"
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-600 text-center font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
              <p className="text-emerald-600 text-center font-medium">{success}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 rounded-xl shadow-xl transition-all transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;