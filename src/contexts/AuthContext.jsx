import React, { createContext, useState, useContext, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function (using real API authentication)
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.log(error);

      setError(error.message || "Authentication failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  //Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        throw new Error(errorData.error ? errorData.error : "Register failed");
      }

      const data = await response.json();

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      setError(error.message || "Authentication failed");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Validate token function
  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const response = await fetch(`${BASE_URL}/api/validate-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token is invalid or expired
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      logout();
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Check for existing session on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);

        // Validate the token
        validateToken().then((isValid) => {
          if (!isValid) {
            alert("Your session has expired. Please login again.");
          }
        });
      } catch (e) {
        alert("Vui lòng đăng nhập lại");
        logout();
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    validateToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
