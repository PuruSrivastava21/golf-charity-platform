import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Scores from "./pages/Scores";
import Subscription from "./pages/Subscription";
import Charity from "./pages/Charity";
import Draw from "./pages/Draw";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/scores" element={<ProtectedRoute><Scores /></ProtectedRoute>}/>

        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/charity"
          element={
            <ProtectedRoute>
              <Charity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/draw"
          element={
            <ProtectedRoute>
              <Draw />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;