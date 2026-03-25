import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Scores = () => {
  const { user } = useContext(AuthContext);

  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/scores", {
        headers: { Authorization: user?.token }
      });

      setScores(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/scores",
        { score, date },
        { headers: { Authorization: user?.token } }
      );

      setScore("");
      setDate("");
      fetchScores();

    } catch (err) {
      alert(err.response?.data || "Error adding score");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Scores</h1>

        {/* 🔒 Subscription Check */}
        {user?.user?.subscriptionStatus !== "Active" && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl mb-6">
            You need an active subscription to add scores.
          </div>
        )}

        {/* Add Score */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 rounded-2xl shadow mb-6"
        >
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Score (1-45)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="p-3 border rounded-lg w-full"
              required
              disabled={user?.user?.subscriptionStatus !== "Active"}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border rounded-lg w-full"
              required
              disabled={user?.user?.subscriptionStatus !== "Active"}
            />

            <button
              className="bg-black text-white px-6 rounded-lg hover:scale-105 transition"
              disabled={user?.user?.subscriptionStatus !== "Active"}
            >
              Add
            </button>
          </div>
        </form>

        {/* Scores List */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="mb-4 font-semibold">Your Scores</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : scores.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No scores yet. Add your first score to get started.
            </p>
          ) : (
            <ul className="space-y-2">
              {scores.map((s) => (
                <li
                  key={s._id}
                  className="flex justify-between border-b pb-2"
                >
                  <span className="font-medium">{s.score}</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(s.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;