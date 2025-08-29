// src/Pages/UserDashBoard.jsx
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../Context/Context";
import BmiInfoCard from "../Components/BmiInfoCard";
import axios from "axios";

const UserDashBoard = () => {
  const { user, setUser } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    weight: "",
    height: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const [bmiData, setBmiData] = useState({
    bmi: null,
    category: "",
    color: "",
    tips: "",
    calories: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const userData = res.data.user;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));

          const nameParts = (userData.name || "").split(" ");
          setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts[1] || "",
            email: userData.email || "",
            age: userData.age || "",
            weight: userData.weight || "",
            height: userData.height || "",
          });
          setProfilePic(userData.profilePic || null);

          if (userData.weight && userData.height) {
            calculateBMI(userData.weight, userData.height);
          }
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const calculateBMI = (weightValue = formData.weight, heightValue = formData.height) => {
    if (!weightValue || !heightValue) return;

    const heightInMeters = heightValue / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);
    let category = "", color = "", tips = "", calories = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      color = "bg-yellow-400";
      tips =
        "Eat more nutrient-dense meals with healthy fats & proteins. Strength training can help gain muscle mass.";
      calories = "2500-2800 kcal/day";
    } else if (bmiValue < 24.9) {
      category = "Normal weight";
      color = "bg-green-500";
      tips =
        "Maintain a balanced diet and regular exercise. Monitor weight & BMI for long-term health.";
      calories = "2000-2500 kcal/day";
    } else if (bmiValue < 29.9) {
      category = "Overweight";
      color = "bg-orange-500";
      tips =
        "Include more cardio & strength exercises. Reduce sugary & processed foods; increase veggies & lean protein.";
      calories = "1800-2200 kcal/day";
    } else {
      category = "Obese";
      color = "bg-red-500";
      tips =
        "Focus on structured diet, increase physical activity, and consult a healthcare professional.";
      calories = "1500-2000 kcal/day";
    }

    setBmiData({ bmi: bmiValue.toFixed(1), category, color, tips, calories });
  };

  const handleSave = async () => {
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const updateData = {};
      if (formData.firstName) updateData.firstName = formData.firstName;
      if (formData.lastName) updateData.lastName = formData.lastName;
      if (fullName) updateData.name = fullName;
      if (formData.email) updateData.email = formData.email;
      if (formData.age) updateData.age = formData.age;
      if (formData.weight) updateData.weight = formData.weight;
      if (formData.height) updateData.height = formData.height;
      if (profilePic) updateData.profilePic = profilePic;

      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Profile updated successfully!");
        if (res.data.user.weight && res.data.user.height) {
          calculateBMI(res.data.user.weight, res.data.user.height);
        }
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-green-600">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-green-700">
              {formData.firstName} {formData.lastName}
            </p>
            <p className="text-sm text-gray-600">{formData.email}</p>
          </div>

          <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center">
            Choose Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </aside>

        {/* User info & BMI */}
        <div className="flex-1 flex flex-col md:flex-row gap-6">
          {/* User info card */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/2">
            <h1 className="text-2xl font-bold text-green-700 mb-4">User Profile</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="px-3 py-2 rounded-lg outline-none bg-gray-100 w-full"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="px-3 py-2 rounded-lg outline-none bg-gray-100 w-full"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="px-3 py-2 rounded-lg outline-none bg-gray-100 w-full"
              />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="px-3 py-2 rounded-lg outline-none bg-gray-100 w-full"
              />
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height (cm)"
                className="px-3 py-2 rounded-lg outline-none bg-gray-100 w-full"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-6 w-full sm:w-28 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>

          {/* BMI Card full height */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-4">BMI Calculator</h2>
              <p className="text-gray-600 mb-2">Weight: {formData.weight || "0"} kg</p>
              <p className="text-gray-600 mb-4">Height: {formData.height || "0"} cm</p>

              {bmiData.bmi && (
                <div>
                  <p className="text-xl font-semibold">Your BMI: {bmiData.bmi}</p>
                  <p className="flex items-center gap-2 mt-2">
                    <span className={`w-5 h-5 rounded-full ${bmiData.color}`}></span>
                    {bmiData.category}
                  </p>

                  <div className="mt-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-400 shadow-inner">
                    <h3 className="font-semibold text-green-700 mb-1">Lifestyle Tips:</h3>
                    <p className="text-gray-700 text-sm">{bmiData.tips}</p>
                  </div>

                  <div className="mt-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-400 shadow-inner">
                    <h3 className="font-semibold text-green-700 mb-1">Recommended Calories:</h3>
                    <p className="text-gray-700 text-sm">{bmiData.calories}</p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => calculateBMI()}
              className="mt-6 w-full sm:w-28 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Calculate
            </button>

            <BmiInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
