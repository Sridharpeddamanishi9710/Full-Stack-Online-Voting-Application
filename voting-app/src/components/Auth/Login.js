import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ aadharCardNumber: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", form);
      localStorage.setItem("jwt", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login error");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input
        placeholder="Aadhaar Card Number"
        name="aadharCardNumber"
        value={form.aadharCardNumber}
        onChange={change}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={change}
      />
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
