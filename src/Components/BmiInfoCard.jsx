import React from "react";

const bmiCategories = [
  { label: "Underweight", range: "< 18.5", color: "bg-yellow-500" },
  { label: "Normal weight", range: "18.5 - 24.9", color: "bg-green-500" },
  { label: "Overweight", range: "25 - 29.9", color: "bg-orange-500" },
  { label: "Obese", range: "≥ 30", color: "bg-red-500" },
];

const BmiInfoCard = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">BMI Categories</h2>
      <div className="flex flex-col gap-4">
        {bmiCategories.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-3 border border-gray-200 rounded hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <span className={`w-4 h-4 rounded-full ${item.color}`}></span>
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-gray-600">{item.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BmiInfoCard;
