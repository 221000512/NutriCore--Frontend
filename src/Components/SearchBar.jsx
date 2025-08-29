import { useContext } from "react";
import { Context } from "../Context/Context";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { search, setSearch } = useContext(Context);

  return (
    <div className="flex justify-center w-full my-8">
      <div className="w-full max-w-3xl flex items-center border border-gray-400 rounded-full px-4 py-3 bg-gray-50 shadow-md">
        <input
          type="text"
          placeholder="Search for food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm sm:text-base md:text-lg"
        />
        <img src={assets.search_icon} alt="Search" className="w-6 h-6 ml-2" />
      </div>
    </div>
  );
};

export default SearchBar;
