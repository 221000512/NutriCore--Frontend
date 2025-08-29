// src/Components/ProductItem.jsx
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name }) => {
  const cover = Array.isArray(image) ? image[0] : image;
  return (
    <Link to={`/product/${id}`} className="group block border rounded-xl overflow-hidden bg-white hover:shadow-lg transition">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        {cover ? (
          <img src={cover} alt={name} className="h-full w-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2">{name}</h3>
      </div>
    </Link>
  );
};

export default ProductItem;
