import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function LogicPages() {
   const navigate = useNavigate();   
  const { login, signup, error, setError } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [mode, setMode] = useState("login"); // "login" or "signup"

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    if (!/^\d{4}$/.test(otp)) {
      setError("OTP should be 4 digits");
      return;
    }
    const success = mode === "login" ? login(phone, otp) : signup(phone, otp);
    if (success) {
      // eslint-disable-next-line no-undef
      navigate("/dashboard");  // <--- This sends you to Dashboard!
    }
};

  return (
    <div className="max-w-xs mx-auto py-8">
      <h2 className="text-xl font-bold mb-3">{mode === "login" ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="p-2 border rounded w-full"
          placeholder="Phone (10 digits)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          className="p-2 border rounded w-full"
          placeholder="OTP (4 digits)"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          type="password"
        />
        <input
  className="p-2 border rounded w-full"
  placeholder="First Name"
  value={firstName}
  onChange={e => setFirstName(e.target.value)}
/>
<input
  className="p-2 border rounded w-full"
  placeholder="Last Name"
  value={lastName}
  onChange={e => setLastName(e.target.value)}
/>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit">{mode === "login" ? "Login" : "Sign Up"}</Button>
        <Button
          type="button"
          onClick={() => {
            setError("");
            setMode(mode === "login" ? "signup" : "login");
          }}
          className="ml-2"
        >
          {mode === "login" ? "Switch to Sign Up" : "Switch to Login"}
        </Button>
      </form>
    </div>
  );
}
