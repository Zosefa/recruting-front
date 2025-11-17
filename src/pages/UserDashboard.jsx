"use client"
import { useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

export default function UserDashboard({ userType, currentUser }) {
  const navigate = useNavigate()

  console.log(currentUser)

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <main className="dashboard-content">
      <div className="welcome-section">
        <h1>Bienvenue sur RECRUITING</h1>
        <p>Plateforme de recrutement moderne et efficace</p>
      </div>

      <div className="dashboard-grid">
        {userType === "job-seeker" ? (
          <>
            <div className="dashboard-card" onClick={() => handleNavigation("/job-seeker")}>
              <div className="card-icon">🔍</div>
              <h3>Parcourir les offres</h3>
              <p>Découvrez les meilleures opportunités d'emploi</p>
            </div>
            <div className="dashboard-card" onClick={() => handleNavigation("/profile")}>
              <div className="card-icon">👤</div>
              <h3>Mon Profil</h3>
              <p>Gérez votre profil et vos compétences</p>
            </div>
            <div className="dashboard-card" onClick={() => handleNavigation("/messages")}>
              <div className="card-icon">💬</div>
              <h3>Messages</h3>
              <p>Échangez avec les recruteurs</p>
            </div>
          </>
        ) : (
          <>
            <div className="dashboard-card" onClick={() => handleNavigation("/recruiter")}>
              <div className="card-icon">📋</div>
              <h3>Gérer les offres</h3>
              <p>Publiez et gérez vos offres d'emploi</p>
            </div>
            <div className="dashboard-card" onClick={() => handleNavigation("/job-seeker")}>
              <div className="card-icon">👥</div>
              <h3>Consulter les candidats</h3>
              <p>Parcourez les profils des candidats</p>
            </div>
            <div className="dashboard-card" onClick={() => handleNavigation("/messages")}>
              <div className="card-icon">💬</div>
              <h3>Messages</h3>
              <p>Communiquez avec les candidats</p>
            </div>
          </>
        )}
      </div>

      <div className="stats-section">
        <h2>Vos statistiques</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">{userType === "job-seeker" ? "Candidatures" : "Offres publiées"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Messages reçus</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">{userType === "job-seeker" ? "Appels reçus" : "Candidats interviewés"}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
