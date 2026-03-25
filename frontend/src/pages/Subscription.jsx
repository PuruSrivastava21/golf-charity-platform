import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Subscription = () => {
  const { user } = useContext(AuthContext);

  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        "/subscription/create",
        {},
        { headers: { Authorization: user?.token } }
      );

      window.location.href = res.data.url;

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Subscription</h1>

        <div className="bg-white p-6 rounded-2xl shadow w-96">
          <h2 className="text-lg font-semibold mb-2">Premium Plan</h2>
          <p className="text-gray-500 mb-4">₹500 / month</p>

          <button onClick={() => handleSubscribe("monthly")}>
            Monthly ₹500
          </button>

          <button onClick={() => handleSubscribe("yearly")}>
            Yearly ₹5000
          </button>

          <button
            onClick={handleSubscribe}
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;