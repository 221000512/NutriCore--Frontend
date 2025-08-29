// Context.jsx
import PropTypes from "prop-types";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const Context = createContext();

const API = import.meta.env.VITE_API_URL || "https://nutricore-backend.onrender.com";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const registerUser = async (name, email, password) => { /* ... same as before ... */ };
  const loginUser = async (email, password) => { /* ... same as before ... */ };
  const logoutUser = () => { /* ... same as before ... */ };

  const fetchProducts = useCallback(async () => { /* ... same as before ... */ }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const value = { user, setUser, token, registerUser, loginUser, logoutUser, products, fetchProducts, search, setSearch, showSearch, setShowSearch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ContextProvider.propTypes = { children: PropTypes.node.isRequired };

export default ContextProvider;
