// src/Pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("adminToken");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    images: [], // local files
    imageUrls: [], // already uploaded URLs
    labelData: {
      rating: 0,
      processing: "",
      nutrients: [],
      ingredients: [],
      additives: [],
    },
  });

  useEffect(() => {
    if (!token) navigate("/api/admin/login");
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Fetch products failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // File input handler
  const handleFileChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setForm({ ...form, images: files });
  };

  // Upload local files to Cloudinary
  const uploadImagesToCloudinary = async (files) => {
    if (!files || files.length === 0) return [];
    const urls = [];
    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "dww2cgsrt");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dww2cgsrt/image/upload",
          data
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        alert("Cloudinary upload failed for one or more files.");
      }
    }
    return urls;
  };

  // Add or update product
  const handleSubmit = async () => {
    if (!form.name || !form.category)
      return alert("Please fill all required fields");

    const uploadedUrls = await uploadImagesToCloudinary(form.images);
    const finalImageUrls = [...form.imageUrls, ...uploadedUrls];

    const productData = {
      name: form.name,
      description: form.description,
      category: form.category,
      subCategory: form.subCategory,
      image: finalImageUrls,
      labelData: form.labelData,
    };

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/products/${editingId}`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/products`,
          productData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Reset form
      setForm({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        images: [],
        imageUrls: [],
        labelData: {
          rating: 0,
          processing: "",
          nutrients: [],
          ingredients: [],
          additives: [],
        },
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Save product failed:", err);
      alert(`Failed to ${editingId ? "update" : "add"} product`);
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      subCategory: product.subCategory || "",
      images: [],
      imageUrls: product.image || [],
      labelData: product.labelData || {
        rating: 0,
        processing: "",
        nutrients: [],
        ingredients: [],
        additives: [],
      },
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/api/admin/login");
  };

  // Helper to update labelData fields dynamically
  const updateLabelData = (key, value, index = null, subKey = null) => {
    const ld = { ...form.labelData };
    if (["nutrients", "ingredients", "additives"].includes(key)) {
      ld[key][index][subKey] = value;
    } else {
      ld[key] = value;
    }
    setForm({ ...form, labelData: ld });
  };

  const addBadge = (key) => {
    setForm({
      ...form,
      labelData: {
        ...form.labelData,
        [key]: [...form.labelData[key], { name: "", color: "gray" }],
      },
    });
  };

  const addNutrient = () => {
    setForm({
      ...form,
      labelData: {
        ...form.labelData,
        nutrients: [
          ...form.labelData.nutrients,
          { name: "", value: "", unit: "", color: "gray", rda: "" },
        ],
      },
    });
  };

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold text-green-700">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      {/* Product Form */}
      <div className="flex flex-col gap-3 mb-5 bg-white p-4 rounded shadow">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          placeholder="SubCategory"
          value={form.subCategory}
          onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
          className="p-2 border rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
        {form.imageUrls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="uploaded"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {/* Label Analyzer */}
        <div className="border p-3 rounded mt-3">
          <h3 className="font-semibold mb-2">Label Analyzer</h3>
          <input
            type="number"
            placeholder="Rating"
            value={form.labelData.rating}
            onChange={(e) =>
              updateLabelData("rating", parseFloat(e.target.value))
            }
            className="p-2 border rounded w-24 mb-2"
          />
          <input
            placeholder="Processing Level"
            value={form.labelData.processing}
            onChange={(e) => updateLabelData("processing", e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />

          {/* Nutrients */}
          <h4 className="font-semibold mt-2">Nutrients</h4>
          {form.labelData.nutrients.map((n, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                placeholder="Name"
                value={n.name}
                onChange={(e) =>
                  updateLabelData("nutrients", e.target.value, idx, "name")
                }
                className="p-1 border rounded"
              />
              <input
                placeholder="Value"
                value={n.value}
                onChange={(e) =>
                  updateLabelData("nutrients", e.target.value, idx, "value")
                }
                className="p-1 border rounded"
              />
              <input
                placeholder="Unit"
                value={n.unit || ""}
                onChange={(e) =>
                  updateLabelData("nutrients", e.target.value, idx, "unit")
                }
                className="p-1 border rounded"
              />
              <select
                value={n.color}
                onChange={(e) =>
                  updateLabelData("nutrients", e.target.value, idx, "color")
                }
                className="p-1 border rounded"
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="gray">Gray</option>
              </select>
              <input
                placeholder="RDA"
                value={n.rda}
                onChange={(e) =>
                  updateLabelData("nutrients", e.target.value, idx, "rda")
                }
                className="p-1 border rounded"
              />
            </div>
          ))}
          <button
            onClick={addNutrient}
            className="bg-blue-600 text-white px-2 py-1 rounded mb-2"
          >
            Add Nutrient
          </button>

          {/* Ingredients */}
          <h4 className="font-semibold mt-2">Ingredients</h4>
          {form.labelData.ingredients.map((i, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                placeholder="Name"
                value={i.name}
                onChange={(e) =>
                  updateLabelData("ingredients", e.target.value, idx, "name")
                }
                className="p-1 border rounded"
              />
              <select
                value={i.color}
                onChange={(e) =>
                  updateLabelData("ingredients", e.target.value, idx, "color")
                }
                className="p-1 border rounded"
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="gray">Gray</option>
              </select>
            </div>
          ))}
          <button
            onClick={() => addBadge("ingredients")}
            className="bg-blue-600 text-white px-2 py-1 rounded mb-2"
          >
            Add Ingredient
          </button>

          {/* Additives */}
          <h4 className="font-semibold mt-2">Additives</h4>
          {form.labelData.additives.map((a, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                placeholder="Name"
                value={a.name}
                onChange={(e) =>
                  updateLabelData("additives", e.target.value, idx, "name")
                }
                className="p-1 border rounded"
              />
              <select
                value={a.color}
                onChange={(e) =>
                  updateLabelData("additives", e.target.value, idx, "color")
                }
                className="p-1 border rounded"
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="gray">Gray</option>
              </select>
            </div>
          ))}
          <button
            onClick={() => addBadge("additives")}
            className="bg-blue-600 text-white px-2 py-1 rounded mb-2"
          >
            Add Additive
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded ${
            editingId ? "bg-blue-600 text-white" : "bg-green-600 text-white"
          }`}
        >
          {editingId ? "Update" : "Add"} Product
        </button>
      </div>

      {/* Product List */}
      <h3 className="text-2xl font-semibold mb-3">Products</h3>
      <ul className="space-y-2 mb-10">
        {products.map((p) => (
          <li
            key={p._id}
            className="flex justify-between border p-2 rounded items-center bg-white"
          >
            <div className="flex-1">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.category}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditProduct(p)}
                className="bg-yellow-400 px-2 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 px-2 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
