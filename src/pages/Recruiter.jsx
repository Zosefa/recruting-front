"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import "../styles/pages.css"

export default function Recruiter({ currentUser, onLogout }) {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Développeur React Senior",
      applications: 24,
      views: 156,
      status: "active",
    },
    {
      id: 2,
      title: "Développeur Full Stack",
      applications: 18,
      views: 98,
      status: "active",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  })

  const handleAddJob = (e) => {
    e.preventDefault()
    if (newJob.title && newJob.description) {
      setJobs([
        ...jobs,
        {
          id: jobs.length + 1,
          title: newJob.title,
          applications: 0,
          views: 0,
          status: "active",
        },
      ])
      setNewJob({ title: "", description: "", location: "", salary: "" })
      setShowForm(false)
    }
  }

  return (
    <div className="page-container">
      <Navigation userType="recruiter" onLogout={onLogout} />

      <main className="page-content">
        <div className="page-header">
          <h1>Gérer les offres d'emploi</h1>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            + Publier une nouvelle offre
          </button>
        </div>

        {showForm && (
          <div className="job-form">
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Titre du poste</label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="ex: Développeur React"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Décrivez le poste..."
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Localisation</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  placeholder="ex: Paris"
                />
              </div>
              <div className="form-group">
                <label>Salaire</label>
                <input
                  type="text"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  placeholder="ex: 50-65k€"
                />
              </div>
              <button type="submit" className="btn-primary">
                Publier l'offre
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Annuler
              </button>
            </form>
          </div>
        )}

        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-item">
              <div className="job-info">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span className="meta-badge">{job.applications} candidatures</span>
                  <span className="meta-badge">{job.views} vues</span>
                  <span className={`status-badge ${job.status}`}>{job.status}</span>
                </div>
              </div>
              <div className="job-actions">
                <button className="btn-secondary">Voir candidatures</button>
                <button className="btn-secondary">Modifier</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
