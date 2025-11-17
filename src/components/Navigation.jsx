"use client"

import { useNavigate } from "react-router-dom"
import Logo from "./Logo"
import "../styles/navigation.css"

export default function Navigation({ userType, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo" onClick={() => navigate("/dashboard")}>
          <Logo />
        </div>

        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/dashboard")}>
            Accueil
          </button>
          {userType === "condidat" ? (
            <>
              <button className="nav-link" onClick={() => navigate("/job-seeker")}>
                Offres d'emploi
              </button>
            </>
          ) : (
            <>
              <button className="nav-link" onClick={() => navigate("/recruiter")}>
                Mes offres
              </button>
            </>
          )}
          <button className="nav-link" onClick={() => navigate("/messages")}>
            Messages
          </button>
          <button className="nav-link" onClick={() => navigate("/profile")}>
            Mon profil
          </button>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  )
}
