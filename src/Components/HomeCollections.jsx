import { useContext } from "react";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import Title from "../Components/Title"; 

const HomeCollections = () => {
  const { products } = useContext(Context);

  return (
    <div className="pt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="flex justify-between items-center mb-6 text-2xl sm:text-3xl md:text-4xl">
        <Title text1="Featured" text2="FOODS" />
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products?.slice(0, 6).map((p) => (
          <Link key={p._id} to={`/product/${p._id}`}>
            <div className="border p-2 rounded shadow hover:scale-105 transition transform w-full">
              <div className="overflow-hidden rounded flex items-center justify-center">
                {p.image?.[0] ? (
                  <img
                    src={p.image[0]}
                    alt={p.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold mt-2 truncate text-center">
                {p.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default HomeCollections;
