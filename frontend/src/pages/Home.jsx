import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-800 text-white text-center px-6">

      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Play. Win. <span className="text-green-400">Give Back.</span>
      </h1>

      <p className="max-w-xl text-gray-300 mb-8">
        Enter your golf scores, win rewards through monthly draws,
        and contribute to meaningful charities — all in one platform.
      </p>

      <button
        onClick={() => navigate("/register")}
        className="bg-green-500 px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
      >
        Get Started
      </button>

      <p className="mt-4 text-sm text-gray-400">
        Already a member?{" "}
        <span
          onClick={() => navigate("/login")}
          className="underline cursor-pointer"
        >
          Login
        </span>
      </p>

    </div>
  );
};

export default Home;