import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import CandidatesList from "./components/Dashboard/CandidatesList";
import Profile from "./components/Profile/Profile";
import Results from "./components/Results/Results";

function PrivateRoute({ children }) {
  const jwt = localStorage.getItem("jwt");
  return jwt ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CandidatesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
