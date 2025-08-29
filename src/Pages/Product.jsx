// src/Pages/Product.jsx
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/Context";

const Product = () => {
  const { productId } = useParams();
  const { products, fetchProductById } = useContext(Context);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const p = products?.find((p) => p._id === productId);
    if (p) {
      setProductData(p);
      return;
    }
    (async () => {
      const fetched = await fetchProductById(productId);
      if (fetched) setProductData(fetched);
    })();
  }, [productId, products, fetchProductById]);

  if (!productData) return <div className="min-h-[200px] flex items-center justify-center">Loading...</div>;

  const rating = productData.labelData?.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="pt-10 px-4 sm:px-[1vw] md:px-[5vw] lg:px-[10vw]">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1">
          <div className="w-full aspect-square bg-white rounded-xl overflow-hidden">
            {productData.image?.[0] ? (
              <img src={productData.image[0]} alt={productData.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-semibold text-3xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => {
              if (i < fullStars) return <span key={i}>★</span>;
              if (i === fullStars && hasHalfStar) return <span key={i}>☆</span>;
              return <span key={i}>✩</span>;
            })}
            <p className="pl-2">({rating})</p>
          </div>

          <div className="mt-8">
            <div className="flex">
              <b className="px-5 py-3 text-xl border">Description</b>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700">
              <p className="text-base">{productData.description}</p>
            </div>
          </div>

          <div className="mt-6 border rounded-xl p-6 shadow bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Label Analyzer</h2>
            <p className="text-gray-600 mb-4">Processing Level: {productData.labelData?.processing || "—"}</p>

            {productData.labelData?.nutrients?.length ? (
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 mb-2">Nutrients (per 100 g)</h3>
                <div className="space-y-1">
                  {productData.labelData.nutrients.map((n, i) => (
                    <div key={i} className="flex justify-between items-center text-sm bg-white border rounded px-3 py-2">
                      <span className="font-medium">{n.name}</span>
                      <span className="flex items-center gap-2">
                        <span>{n.value} {n.unit || ""}</span>
                        <span className={`w-3.5 h-3.5 rounded-full ${n.color === "red" ? "bg-red-500" : n.color === "green" ? "bg-green-500" : n.color === "orange" ? "bg-orange-500" : "bg-gray-400"}`} />
                        <span className="text-gray-400">{n.rda}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {productData.labelData?.ingredients?.length ? (
              <div className="mb-5">
                <h3 className="font-semibold text-gray-800 mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.labelData.ingredients.map((ing, i) => (
                    <span key={i} className={`px-2 py-1 rounded-full text-white text-xs ${ing.color === "red" ? "bg-red-500" : ing.color === "green" ? "bg-green-500" : ing.color === "orange" ? "bg-orange-500" : "bg-gray-400"}`}>
                      {ing.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {productData.labelData?.additives?.length ? (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Additives</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.labelData.additives.map((ad, i) => (
                    <span key={i} className={`px-2 py-1 rounded-full text-white text-xs ${ad.color === "red" ? "bg-red-500" : ad.color === "green" ? "bg-green-500" : ad.color === "orange" ? "bg-orange-500" : "bg-gray-400"}`}>
                      {ad.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
