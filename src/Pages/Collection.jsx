import { useContext, useMemo } from "react";
import { Context } from "../Context/Context";
import Title from "../Components/Title";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, search } = useContext(Context);

  const filtered = useMemo(() => {
    let list = products || [];
    if (search) {
      list = list.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
    return list;
  }, [products, search]);

  if (!filtered.length)
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        No products found.
      </div>
    );

  return (
    
    <div className="pt-10 px-4 sm:px-[2vw] md:px-[5vw] lg:px-[8vw]">
      <div className="flex justify-between items-center mb-6 text-5xl">
        <Title text1="ALL" text2="FOODS" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="block border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
          >
            <div className="aspect-square w-full mb-2 bg-gray-100 rounded overflow-hidden">
              {p.image?.[0] ? (
                <img
                  src={p.image[0]}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{p.category}</p>
            <p className="text-sm text-gray-500 line-clamp-3">{p.description}</p>
          </Link>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Collection;
