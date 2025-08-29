import { useState, useContext } from "react";
import { Context } from "../Context/Context";

const AdminAddProduct = () => {
  const { createProduct } = useContext(Context);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    images: [], // selected image files
    labelDataJson: "" // optional JSON string for labelData
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!form.name || form.images.length === 0) {
      alert("Please provide product name and at least one image.");
      return;
    }

    // Parse labelData JSON
    let labelData = {};
    if (form.labelDataJson.trim()) {
      try {
        labelData = JSON.parse(form.labelDataJson);
      } catch (err) {
        alert("Invalid labelData JSON: " + err.message);
        return;
      }
    } else {
      labelData = { rating: 0, processing: "", nutrients: [], ingredients: [], additives: [] };
    }

    // Prepare FormData for multipart upload
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("subCategory", form.subCategory);
    formData.append("labelData", JSON.stringify(labelData));

    form.images.forEach((file) => formData.append("images", file));

    // Call backend API via Context
    try {
      const res = await createProduct(formData, true); // true → multipart/form-data
      if (res.success) {
        alert("Product added successfully!");
        // Reset form
        setForm({ name: "", description: "", category: "", subCategory: "", images: [], labelDataJson: "" });
      } else {
        alert("Error: " + res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add product. See console for details.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="subCategory"
          placeholder="Sub Category"
          value={form.subCategory}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        {/* File input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />

        {/* Optional labelData JSON */}
        <label className="text-sm text-gray-600">
          labelData JSON (optional). Example structure:
          <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
          </pre>
        </label>
        <textarea
          name="labelDataJson"
          placeholder="Paste labelData JSON here"
          value={form.labelDataJson}
          onChange={handleChange}
          className="p-2 border rounded min-h-[120px]"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
