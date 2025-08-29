import PropTypes from "prop-types";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const Context = createContext();
const API = import.meta.env.VITE_API_URL;

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Persist user on refresh
  // Persist user whenever it changes
useEffect(() => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}, [user]);

  // -------------------
  // Auth functions
  // -------------------
  const registerUser = async (name, email, password) => {
    try {
      const res = await fetch(`${API}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Registration successful");
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false };
      }
    } catch (err) {
      toast.error("Registration failed");
      return { success: false };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await fetch(`${API}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful");
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false };
      }
    } catch (err) {
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
      const res = await fetch(`${API}/product/list`);
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
