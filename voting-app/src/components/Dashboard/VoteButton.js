import React, { useState } from "react";
import api from "../../api";

/**
 * VoteButton component:
 * Props:
 * - candidateId: ID of the candidate to vote for (string)
 * - disabled: whether the button should be disabled (usually if already voted)
 * - onVote: callback function to notify parent after voting
 */
export default function VoteButton({ candidateId, disabled, onVote }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await api.get(`/candidate/vote/${candidateId}`);
      setMessage(res.data.message || "Voted!");
      if (onVote) onVote();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Vote error"
      );
    }
    setLoading(false);
  };

  return (
    <span style={{ marginLeft: 12 }}>
      <button
        disabled={disabled || loading}
        onClick={handleVote}
        style={{ padding: "5px 15px" }}
      >
        {loading ? "Voting..." : "Vote"}
      </button>
      {message && <span style={{ color: "green", marginLeft: 8 }}>{message}</span>}
      {error && <span style={{ color: "red", marginLeft: 8 }}>{error}</span>}
    </span>
  );
}
