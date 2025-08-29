// frontend/src/Components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";

const Navbar = () => {
  const { user } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between relative z-50">
      {/* Logo */}
      <Link to="/" className="text-4xl font-bold text-green-600">
        NutriTech
      </Link>

      {/* Desktop Menu (hidden on sm) */}
      <div className="hidden lg:flex gap-6 text-x items-center font-bold">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/collection" className="hover:text-green-600">Foods</Link>
        <Link to="/calorieCalculator" className="hover:text-green-600">Calorie Calculator</Link>
        <Link to="/doctorsTips" className="hover:text-green-600">Doctor’s Tips</Link>
        <Link to="/mythBuster" className="hover:text-green-600">Myth Buster</Link>
        <Link to="/about" className="hover:text-green-600">AboutUs</Link>

        {user?.role === "admin" ? (
          <Link to="/adminDashBoard" className="hover:text-green-600">Admin Dashboard</Link>
        ) : user ? (
          <Link to="/userDashBoard" className="hover:text-green-600">User Dashboard</Link>
        ) : null}

        {!user ? (
          <Link to="/login" className="hover:text-green-600">Login</Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-600 font-medium hover:underline"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile / Tablet Menu Button (sm & md) */}
      <button
        className="lg:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Sliding Menu */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sliding sidebar (small + medium screens) */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
              ${menuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
          >
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <nav className="flex flex-col items-start mt-16 p-4 gap-4">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/collection" onClick={() => setMenuOpen(false)}>Foods</Link>
              <Link to="/calorieCalculator" onClick={() => setMenuOpen(false)}>Calorie Calculator</Link>
              <Link to="/doctorsTips" onClick={() => setMenuOpen(false)}>Doctor’s Tips</Link>            
              <Link to="/mythBuster" onClick={() => setMenuOpen(false)}>Myth Buster</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

              {user?.role === "admin" ? (
                <Link to="/adminDashBoard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              ) : user ? (
                <Link to="/userDashBoard" onClick={() => setMenuOpen(false)}>User Dashboard</Link>
              ) : null}

              {!user ? (
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-600 font-medium mt-2"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
