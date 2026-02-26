import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/candidate");
        setCandidates(res.data);
        // Fetch user voting status
        const prof = await api.get("/user/profile");
        setIsVoted(prof.data.user?.isVoted);
      } catch (err) {
        setError("Failed to load candidates");
      }
    }
    load();
  }, []);

  const vote = async (cand) => {
    try {
      const res = await api.get(`/candidate/vote/${cand._id || cand.id}`);
      setMessage(res.data.message || "Voted!");
      setIsVoted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Vote error");
    }
  };

  return (
    <div>
      <h2>Candidates</h2>
      {candidates.map((cand, i) => (
        <div key={i}>
          <span>{cand.name} ({cand.party})</span>
          <button disabled={isVoted} onClick={() => vote(cand)}>
            Vote
          </button>
        </div>
      ))}
      <button onClick={() => navigate("/results")}>View Results</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
