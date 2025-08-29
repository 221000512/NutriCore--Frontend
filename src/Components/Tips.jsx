// frontend/src/Components/Tips.jsx
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import { useContext } from "react";
import { Context } from "../Context/Context";

const Tips = () => {
  const { user } = useContext(Context);

  return (
    <div className="flex flex-col items-center w-full py-32 px-4 sm:px-8 lg:px-16">
      <div className="flex justify-center mb-12 w-full max-w-7xl text-4xl">
        <Title text1="Daily Health" text2="Tips" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-40 text-center w-full max-w-7xl">
        <div className="flex flex-col items-center">
          <img src={assets.nutri_icon} alt="" className="w-24 sm:w-28 mb-6" />
          <p className="font-semibold text-xl sm:text-2xl mb-2">Nutrition Tips</p>
          <p className="text-gray-400 text-base sm:text-lg">
            Get science-backed advice on how to <br />
            eat better and live healthier every day.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src={assets.brain_icon} alt="" className="w-24 sm:w-28 mb-6" />
          <p className="font-semibold text-xl sm:text-2xl mb-2">Brain Boosters</p>
          <p className="text-gray-400 text-base sm:text-lg">
            Fuel your mind with foods that <br /> support memory, focus, and mental clarity.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src={assets.water_icon} alt="" className="w-24 sm:w-28 mb-6" />
          <p className="font-semibold text-xl sm:text-2xl mb-2">Wellness Guides</p>
          <p className="text-gray-400 text-base sm:text-lg">
            Learn how to hydrate, detox, <br />and balance your meals for total wellness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tips;
