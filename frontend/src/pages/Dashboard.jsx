import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-10 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

        <h1 className="text-3xl font-semibold mb-10">Dashboard</h1>

        <h1 className="text-3xl font-semibold mb-2">
          Welcome back, {user?.user?.name}
        </h1>

        <p className="text-gray-500 mb-6">
          Track your scores, participate in draws, and make an impact.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-8 mb-10">

          <div className="card hover:-translate-y-1 hover:shadow-xl transition duration-300">
            <p className="text-gray-500 text-sm">Subscription</p>
            <h2 className="text-2xl font-bold mt-2 text-green-600">Active</h2>
          </div>

          <div className="card hover:-translate-y-1 hover:shadow-xl transition duration-300">
            <p className="text-gray-500 text-sm">Total Winnings</p>
            <h2 className="text-2xl font-bold mt-2">₹0</h2>
          </div>

          <div className="card hover:-translate-y-1 hover:shadow-xl transition duration-300">
            <p className="text-gray-500 text-sm">Charity Contribution</p>
            <h2 className="text-2xl font-bold mt-2">10%</h2>
          </div>

        </div>

        {/* Info Section */}
        <div className="card hover:-translate-y-1 hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-semibold mb-3">How it works</h2>
          <p className="text-gray-500">
            Enter your latest golf scores. Every month, a draw is conducted.
            Match 3, 4 or 5 numbers to win rewards while contributing to charity.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;