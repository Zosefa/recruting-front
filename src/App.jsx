"use client"

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import JobSeeker from "./pages/JobSeeker"
import Recruiter from "./pages/Recruiter"
import Profile from "./pages/Profile"
import Messages from "./pages/Messages"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

   // Au montage, vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = sessionStorage.getItem("token")
    const storedUserType = sessionStorage.getItem("userType")
    const storedUser = sessionStorage.getItem("currentUser")

    if (token && storedUserType && storedUser) {
      setIsLoggedIn(true)
      setUserType(storedUserType)
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (email, type, id) => {
    setIsLoggedIn(true)
    setUserType(type)
    const user = { email, type, id }
    setCurrentUser(user)

    sessionStorage.setItem("userType", type)
    sessionStorage.setItem("currentUser", JSON.stringify(user))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
    setCurrentUser(null)
    sessionStorage.clear()
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard userType={userType} onLogout={handleLogout} currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/job-seeker"
          element={
            isLoggedIn && userType === "job-seeker" ? (
              <JobSeeker currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/recruiter"
          element={
            isLoggedIn && userType === "recruiter" ? (
              <Recruiter currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/messages"
          element={
            isLoggedIn ? <Messages currentUser={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}

export default App
