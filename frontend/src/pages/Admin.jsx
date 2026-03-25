import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const usersRes = await axios.get("/admin/users", {
        headers: { Authorization: user?.token }
      });

      const scoresRes = await axios.get("/admin/scores", {
        headers: { Authorization: user?.token }
      });

      setUsers(usersRes.data);
      setScores(scoresRes.data);

      // 📊 Stats
      const totalUsers = usersRes.data.length;
      const activeUsers = usersRes.data.filter(
        u => u.subscriptionStatus === "Active"
      ).length;

      const totalPool = activeUsers * 500;

      const totalCharity = Math.floor(totalPool * 0.10);

      setStats({
        totalUsers,
        activeUsers,
        totalPool,
        totalCharity
      });

    } catch (err) {
      console.log(err);
      alert("Admin access error");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 Admin protection
  if (user?.user?.role !== "admin") {
    return (
      <div className="p-10 text-center text-red-500">
        Access Denied — Admin Only
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

        <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* 📊 STATS */}
            <div className="grid grid-cols-4 gap-6 mb-8">

              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">Total Users</p>
                <h2 className="text-xl font-bold">{stats.totalUsers}</h2>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">Active Subscribers</p>
                <h2 className="text-xl font-bold">{stats.activeUsers}</h2>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">Prize Pool</p>
                <h2 className="text-xl font-bold">₹{stats.totalPool}</h2>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">Charity Fund</p>
                <h2 className="text-xl font-bold">₹{stats.totalCharity}</h2>
              </div>

            </div>

            {/* 👥 USERS */}
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <h2 className="font-semibold mb-4 text-lg">User Management</h2>

              {users.map(u => (
                <div key={u._id} className="flex justify-between border-b py-2">
                  <span>{u.email}</span>
                  <span className="text-sm">
                    {u.subscriptionStatus} | {u.role}
                  </span>
                </div>
              ))}
            </div>

            {/* 🏌️ SCORES */}
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <h2 className="font-semibold mb-4 text-lg">Score Management</h2>

              {scores.map(s => (
                <div key={s._id} className="flex justify-between border-b py-2">
                  <span>{s.userId?.email}</span>
                  <span>{s.score}</span>
                </div>
              ))}
            </div>

            {/* 🎯 DRAW CONTROLS */}
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <h2 className="font-semibold mb-4 text-lg">Draw Management</h2>

              <button
                onClick={() => (window.location.href = "/draw")}
                className="bg-black text-white px-6 py-2 rounded-lg mr-3"
              >
                Run Draw
              </button>

              <button className="bg-gray-700 text-white px-6 py-2 rounded-lg">
                Simulation Mode (Demo)
              </button>
            </div>

            {/* ❤️ CHARITY */}
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <h2 className="font-semibold mb-4 text-lg">Charity Management</h2>

              <p className="text-gray-500">
                Charity contributions are automatically calculated (10% of pool)
              </p>
            </div>

            {/* 🏆 WINNERS */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-4 text-lg">Winner Management</h2>

              <p className="text-gray-500">
                Winners are generated from draw system. Verification & payout can be added.
              </p>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default Admin;