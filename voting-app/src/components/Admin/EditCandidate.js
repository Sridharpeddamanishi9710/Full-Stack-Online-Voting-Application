import React, { useState, useEffect } from "react";
import api from "../../api";

/**
 * EditCandidate component:
 * - Edits a candidate given candidateId
 * - Calls /candidate/:candidateId (PUT)
 * - Only admin users should access this!
 * Props:
 * - candidateId: ID of candidate to edit
 * - onEdited: callback after edit (optional)
 */
export default function EditCandidate({ candidateId, onEdited }) {
  const [form, setForm] = useState({ name: "", party: "", age: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch candidate data for editing
    async function fetchCandidate() {
      try {
        // Here, you need an endpoint to get candidate by ID.
        // For now, fetch all and filter, or adjust this to match your backend.
        const res = await api.get("/candidate");
        const found = res.data.find(c => c._id === candidateId || c.id === candidateId);
        if (found) setForm({ name: found.name, party: found.party, age: found.age });
      } catch (err) {
        setError("Candidate not found");
      }
    }
    if (candidateId) fetchCandidate();
  }, [candidateId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");
    try {
      await api.put(`/candidate/${candidateId}`, form);
      setMsg("Candidate updated!");
      if (onEdited) onEdited();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error updating candidate"
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "16px 0" }}>
      <h3>Edit Candidate</h3>
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
        {loading ? "Saving..." : "Save"}
      </button>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
