import { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";

const Draw = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDraw = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/draw/run");
      setResult(res.data);
    } catch (err) {
      alert("Error running draw");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Monthly Draw</h1>

        <button
          onClick={handleDraw}
          className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition mb-6"
        >
          {loading ? "Running..." : "Run Draw"}
        </button>

        {result && (
          <div className="bg-white p-6 rounded-2xl shadow">

            {/* Numbers */}
            <h2 className="font-semibold mb-4">Draw Numbers</h2>
            <div className="flex gap-3 mb-6">
              {result.drawNumbers.map((n, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full text-lg font-bold"
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Pool */}
            <p className="mb-2">Total Pool: ₹{result.totalPool}</p>
            <p className="mb-4 font-semibold">Jackpot: ₹{result.jackpot}</p>

            {/* Winners */}
            <h2 className="font-semibold mb-2">Winners</h2>

            {result.winners.length === 0 ? (
              <p>No winners</p>
            ) : (
              <ul className="space-y-2">
                {result.winners.map((w, i) => (
                  <li key={i} className="border-b pb-2">
                    <p>{w.user}</p>
                    <p className="text-sm text-gray-500">
                      {w.match} match | Win: ₹{w.winAmount} | Charity: ₹{w.charity} | Final: ₹{w.finalAmount}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Draw;