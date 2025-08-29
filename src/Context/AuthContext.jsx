import React, { createContext, useState, useEffect } from "react";

/**
 * Simple AuthContext that stores:
 * - user: { name, email, role }  // role: "user" | "admin"
 * - products: array of product objects for demo
 *
 * Replace fetch logic with real API calls as needed.
 */
 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // demo user (toggle role to "admin" to test admin flows)
  const [user, setUser] = useState({
    name: "Enter You Username",
    email: "email@example.com",
    role: "user" | "admin", // change to "admin" to test admin dashboard
  });

  // demo product list (each product has calories field)
  const [products, setProducts] = useState([
    { _id: "p1", name: "Apple (100g)", calories: 52, image: "/images/apple.jpg" },
    { _id: "p2", name: "Banana (100g)", calories: 96, image: "/images/banana.jpg" },
    { _id: "p3", name: "Bread Slice", calories: 80, image: "/images/bread.jpg" },
    { _id: "p4", name: "Fried Chicken (100g)", calories: 260, image: "/images/chicken.jpg" },
    { _id: "p5", name: "Chocolate Bar", calories: 230, image: "/images/chocolate.jpg" },
  ]);

  // demo: user selected collection IDs
  const [myCollectionIds, setMyCollectionIds] = useState(["p1", "p3"]);

  // Basic helpers
  const addProduct = (product) => {
    setProducts((prev) => [{ ...product, _id: `p${Date.now()}` }, ...prev]);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
    // Also remove from collections/selections
    setMyCollectionIds((prev) => prev.filter((pid) => pid !== id));
  };

  const toggleCollectForUser = (id) => {
    setMyCollectionIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Demo effect: you can load from API here
  useEffect(() => {
    // simulate initial load etc.
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        products,
        addProduct,
        removeProduct,
        myCollectionIds,
        toggleCollectForUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
