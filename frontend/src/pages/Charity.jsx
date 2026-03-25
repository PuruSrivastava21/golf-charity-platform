import Sidebar from "../components/Sidebar";

const Charity = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6">Charity</h1>

        <div className="card hover:-translate-y-1 hover:shadow-xl transition duration-300">
          <h2 className="font-semibold mb-2">Save The Children</h2>
          <p className="text-gray-500 mb-4">
            Support underprivileged children through your subscription.
          </p>

          <button className="bg-black text-white px-6 py-2 rounded-lg">
            Select Charity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Charity;