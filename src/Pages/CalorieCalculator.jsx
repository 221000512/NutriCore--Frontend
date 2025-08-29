import { useState } from "react";

const CalorieCalculator = () => {
  const [foods,setFoods] = useState([]);
  const [foodName,setFoodName] = useState("");
  const [cal,setCal] = useState("");

  const addFood = ()=>{
    if(foodName && cal){
      setFoods([...foods,{name:foodName,calories:Number(cal)}]);
      setFoodName(""); setCal("");
    }
  }

  const totalCalories = foods.reduce((s,f)=>s+f.calories,0);

  return (
    <div className="min-h-screen p-5 max-w-md mx-auto">
      <h2 className="pt-20 text-2xl font-bold mb-3">Calorie Calculator</h2>
      <input placeholder="Food name" value={foodName} onChange={e=>setFoodName(e.target.value)} className="p-2 border rounded w-full mb-2"/>
      <input placeholder="Calories" value={cal} onChange={e=>setCal(e.target.value)} className="p-2 border rounded w-full mb-2"/>
      <button onClick={addFood} className="bg-green-600 text-white p-2 rounded mb-3 w-full">Add Food</button>
      <ul className="mb-2">
        {foods.map((f,i)=><li key={i}>{f.name} - {f.calories} kcal</li>)}
      </ul>
      <p className="text-lg font-bold">Total Calories: {totalCalories}</p>
    </div>
  )
}

export default CalorieCalculator;
