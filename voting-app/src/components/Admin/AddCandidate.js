import React, { useState } from "react";
import api from "../../api";

/**
 * AddCandidate component:
 * - Creates a new candidate (name, party, age)
 * - Calls /candidate (POST)
 * - Only admin users should access this!
 */
export default function AddCandidate({ onAdded }) {
  const [form, setForm] = useState({ name: "", party: "", age: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");
    try {
      await api.post("/candidate", form);
      setMsg("Candidate added!");
      setForm({ name: "", party: "", age: "" });
      if (onAdded) onAdded();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error adding candidate"
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "16px 0" }}>
      <h3>Add Candidate</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        required
        onChange={handleChange}
        style={{ margin: "8px 0" }}
      />
      <input
        name="party"
        placeholder="Party"
        value={form.party}
        required
        onChange={handleChange}
        style={{ margin: "8px 0" }}
      />
      <input
        name="age"
        placeholder="Age"
        value={form.age}
        required
        type="number"
        onChange={handleChange}
        style={{ margin: "8px 0" }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
