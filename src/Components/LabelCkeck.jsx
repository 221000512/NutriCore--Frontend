// frontend/src/Components/LabelCkeck.jsx
import React, { useState, useContext } from "react";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import LabelAnalyzer from "../Pages/labelAnalyzer"; // import your analyzer

const LabelCkeck = () => {
  const { user } = useContext(Context);
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  return (
    <div className="flex justify-center my-12 px-4">
      <div className="bg-blue-50 p-8 rounded-lg shadow-md flex flex-col items-center gap-4 w-full max-w-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          {user ? "Analyze Your Food Label" : "Check Your Food Labels!"}
        </h2>
        <p className="text-gray-700 max-w-md">
          {user
            ? "Use our Label Analyzer to see which ingredients are good or bad for you."
            : "Login or Register to analyze your food labels and get detailed insights."}
        </p>

        <button
          onClick={() => setShowAnalyzer(true)}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            user ? "bg-gray-700 hover:bg-gray-900 text-white" : "bg-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          {user ? "Analyze Now" : "Login / Register"}
        </button>

        {showAnalyzer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
              <button
                className="absolute top-3 right-3 text-xl font-bold"
                onClick={() => setShowAnalyzer(false)}
              >
                ✕
              </button>

              {user ? (
                <LabelAnalyzer />
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold mb-4">
                    Login/Register to analyze your food label
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link
                      to="/login"
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login"
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelCkeck;
