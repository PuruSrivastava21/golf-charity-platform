import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);

      // store token
      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:opacity-90"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;