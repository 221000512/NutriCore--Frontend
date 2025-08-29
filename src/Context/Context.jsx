import PropTypes from "prop-types";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const Context = createContext();

// Make sure VITE_API_URL is set in Vercel or fallback to local
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Persist user in localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // -------------------
  // Auth functions
  // -------------------
  const registerUser = async (name, email, password) => {
    try {
      console.log("Register request:", { name, email, password }); // Debug

      const res = await fetch(`${API}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("Register response:", data);

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Registration successful");
        return { success: true };
      } else {
        toast.error(data.message || "Registration failed");
        return { success: false };
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Registration failed");
      return { success: false };
    }
  };

  const loginUser = async (email, password) => {
    try {
      console.log("Login request:", { email, password }); // Debug

      const res = await fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("Login successful");
        return { success: true };
      } else {
        toast.error(data.message || "Login failed");
        return { success: false };
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed");
      return { success: false };
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out");
  };

  // -------------------
  // Products
  // -------------------
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/product/list`);
      const data = await res.json();
      if (data.success) setProducts(data.products || []);
      else setProducts([]);
    } catch (err) {
      console.error("Fetch products error:", err);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // -------------------
  // Context value
  // -------------------
  const value = {
    user,
    setUser,
    token,
    registerUser,
    loginUser,
    logoutUser,
    products,
    fetchProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
