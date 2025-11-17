"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import "../styles/pages.css"

export default function Profile({ currentUser, onLogout }) {
  const [profile, setProfile] = useState({
    fullName: "Jean Dupont",
    email: currentUser?.email || "jean@example.com",
    phone: "06 12 34 56 78",
    bio: "Développeur passionné avec 5 ans d'expérience",
    location: "Paris, France",
    skills: ["React", "JavaScript", "Node.js"],
    experience: [
      {
        id: 1,
        title: "Développeur Senior",
        company: "TechCorp",
        duration: "2021 - Présent",
      },
    ],
  })

  const [newSkill, setNewSkill] = useState("")
  const [cv, setCv] = useState(null)

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    })
  }

  const handleCVUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCv(file)
    }
  }

  return (
    <div className="page-container">
      <Navigation userType={currentUser?.type} onLogout={onLogout} />

      <main className="page-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-placeholder">JD</div>
            </div>
            <div className="profile-info">
              <h1>{profile.fullName}</h1>
              <p className="profile-email">{profile.email}</p>
            </div>
          </div>

          <div className="profile-sections">
            <div className="profile-section">
              <h2>Informations Personnelles</h2>
              <div className="info-group">
                <label>Téléphone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="info-group">
                <label>Localisation</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
              <div className="info-group">
                <label>Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="profile-section">
              <h2>Compétences</h2>
              <div className="skills-container">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <span>{skill}</span>
                    <button className="skill-remove" onClick={() => handleRemoveSkill(index)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="add-skill">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Ajouter une compétence"
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <button className="btn-primary" onClick={handleAddSkill}>
                  Ajouter
                </button>
              </div>
            </div>

            <div className="profile-section">
              <h2>Expérience Professionnelle</h2>
              {profile.experience.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <h3>{exp.title}</h3>
                  <p className="company">{exp.company}</p>
                  <p className="duration">{exp.duration}</p>
                </div>
              ))}
            </div>

            <div className="profile-section">
              <h2>Télécharger votre CV</h2>
              <div className="cv-upload">
                <input
                  type="file"
                  id="cv-input"
                  onChange={handleCVUpload}
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                />
                <label htmlFor="cv-input" className="upload-label">
                  <span>📎 Cliquez pour sélectionner votre CV</span>
                </label>
                {cv && <p className="cv-name">✓ {cv.name}</p>}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-primary">Enregistrer les modifications</button>
          </div>
        </div>
      </main>
    </div>
  )
}
