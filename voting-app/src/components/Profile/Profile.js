import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/user/profile")
      .then(res => setUser(res.data.user))
      .catch(() => setUser({}));
  }, []);

  const change = (e) => setPwForm({ ...pwForm, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/user/profile/password", pwForm);
      setMsg("Password changed!");
    } catch {
      setMsg("Password change failed");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <div>Role: {user.role}</div>
      <div>Vote Status: {user.isVoted ? "Voted" : "Not Voted"}</div>
      <form onSubmit={submit}>
        <h3>Change Password</h3>
        <input name="currentPassword" type="password" placeholder="Current" onChange={change} />
        <input name="newPassword" type="password" placeholder="New" onChange={change} />
        <button type="submit">Update Password</button>
      </form>
      <button onClick={() => navigate("/")}>Dashboard</button>
      <button onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
    </div>
  );
}
