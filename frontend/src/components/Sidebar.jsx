import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaMoneyBill, FaHeart } from "react-icons/fa";

const Sidebar = () => {
  const linkClass =
    "flex items-center gap-3 p-3 rounded-xl transition-all duration-200";

  return (
    <div className="w-64 h-screen bg-black text-white p-6 shadow-xl">
      <h1 className="text-2xl font-semibold mb-10 tracking-wide">
        Golf Platform
      </h1>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          <FaHome /> Dashboard
        </NavLink>

        <NavLink
          to="/scores"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          <FaChartBar /> Scores
        </NavLink>

        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          <FaMoneyBill /> Subscription
        </NavLink>

        <NavLink
          to="/charity"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}`
          }
        >
          <FaHeart /> Charity
        </NavLink>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="mt-10 w-full bg-red-500 p-3 rounded-lg"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;