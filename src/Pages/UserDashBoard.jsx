// frontend/src/Components/UserDashBoard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../Context/Context";

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
  const [bmi, setBmi] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
      });
      setProfilePic(user.profilePic || null);
      if (user.weight && user.height) {
        calculateBMI(user.weight, user.height);
      }
    } else {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file); // store File for FormData
    }
  };

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      const data = new FormData();
      if (formData.firstName) data.append("firstName", formData.firstName);
      if (formData.lastName) data.append("lastName", formData.lastName);
      if (fullName) data.append("name", fullName);
      if (formData.email) data.append("email", formData.email);
      if (formData.age) data.append("age", formData.age);
      if (formData.weight) data.append("weight", formData.weight);
      if (formData.height) data.append("height", formData.height);
      if (profilePic instanceof File) {
        data.append("profilePic", profilePic); // upload actual file
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative w-28 h-28">
            <img
              src={
                profilePic instanceof File
                  ? URL.createObjectURL(profilePic)
                  : profilePic || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4 border-indigo-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute bottom-0 right-0 bg-indigo-500 text-white text-sm px-2 py-1 rounded cursor-pointer"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Weight (kg)"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="Height (cm)"
            className="border p-2 rounded"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded shadow hover:bg-indigo-600"
        >
          Save Changes
        </button>

        {/* BMI Display */}
        {bmi && (
          <div className="mt-6 bg-indigo-100 text-indigo-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Your BMI: {bmi}</h3>
            <p>
              {bmi < 18.5
                ? "Underweight"
                : bmi >= 18.5 && bmi < 24.9
                ? "Normal weight"
                : bmi >= 25 && bmi < 29.9
                ? "Overweight"
                : "Obesity"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashBoard;
