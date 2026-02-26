import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "", age: "", email: "", mobile: "", address: "",
    aadharCardNumber: "", password: "", role: "voter",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/user/signup", form);
      localStorage.setItem("jwt", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Signup error");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>
      {Object.keys(form).map((key) => (
        key !== "role" && (
          <div key={key}>
            <input
              placeholder={key}
              name={key}
              value={form[key]}
              onChange={change}
              required={["name", "age", "address", "aadharCardNumber", "password"].includes(key)}
            />
          </div>
        )
      ))}
      <button type="submit">Signup</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
