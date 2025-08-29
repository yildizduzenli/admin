import React, { createContext, useContext, useState, useEffect } from "react";

// Context oluştur
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  });

  // Component mount olduğunda auth durumunu kontrol et
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      // localStorage'dan token kontrol et
      const token = localStorage.getItem("auth_token");
      const userData = localStorage.getItem("user_data");

      if (token && userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setAuthState({
        user: null,
        isAuthenticated: false,
      });
    }
  };

  const login = async (email, password) => {
    try {
      // Environment variables veya default değerler
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (email === adminEmail && password === adminPassword) {
        const user = {
          id: "1",
          email: email,
          name: "Yıldız Düzenli Admin",
        };

        const token = "mock_jwt_token_" + Date.now();

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));

        setAuthState({
          user,
          isAuthenticated: true,
        });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    // localStorage'ı temizle
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  const contextValue = {
    ...authState,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
