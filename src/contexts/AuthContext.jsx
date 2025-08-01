import React, { createContext, useState, useEffect } from "react";

// 1. Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // Load current user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  // Get all users object from localStorage
  const getUsers = () => JSON.parse(localStorage.getItem("users")) || {};

  // Save all users back to localStorage
  const saveUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

  // Signup logic
//   const signup = (phone, otp, firstName, lastName) => {
  
//     const users = getUsers();
//   if (users[phone]) {
//     setError("User already exists");
//     return false;
//   }
//   users[phone] = { phone, otp, firstName, lastName };
//   saveUsers(users);
//   setCurrentUser({ phone, firstName, lastName });
//   localStorage.setItem("currentUser", JSON.stringify({ phone, firstName, lastName }));
//   setError("");
//   return true;
// };

const signup = (phone, otp, firstName, lastName) => {
  if (!phone || !otp || !firstName || !lastName) {
    setError("All fields are required");
    return false;
  }
  const users = getUsers();
  if (users[phone]) {
    setError("User already exists");
    return false;
  }
  users[phone] = { phone, otp, firstName, lastName };
  saveUsers(users);
  setCurrentUser({ phone, firstName, lastName });
  localStorage.setItem("currentUser", JSON.stringify({ phone, firstName, lastName }));
  setError("");
  return true;
};

  // Login logic
  const login = (phone, otp) => {
  const users = getUsers();
  if (!users[phone]) {
    setError("User not found, please signup");
    return false;
  }
  if (users[phone].otp !== otp) {
    setError("Incorrect OTP");
    return false;
  }
  const { firstName, lastName } = users[phone];
  setCurrentUser({ phone, firstName, lastName });
  localStorage.setItem("currentUser", JSON.stringify({ phone, firstName, lastName }));
  setError("");
  return true;
};
  // Logout logic
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
