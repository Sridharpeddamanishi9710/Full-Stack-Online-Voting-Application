import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/candidate/vote/count")
      .then(res => setResults(res.data));
  }, []);

  return (
    <div>
      <h2>Vote Results</h2>
      {results.map((item, idx) => (
        <div key={idx}>
          Party: {item.party}, Votes: {item.count}
        </div>
      ))}
      <button onClick={() => navigate("/")}>Dashboard</button>
      <button onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
    </div>
  );
}
