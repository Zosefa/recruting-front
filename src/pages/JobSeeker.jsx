"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import JobCard from "../components/JobCard"
import "../styles/pages.css"

export default function JobSeeker({ currentUser, onLogout }) {
  const [jobs] = useState([
    {
      id: 1,
      title: "Développeur React Senior",
      company: "TechCorp",
      location: "Paris",
      salary: "50-65k€",
      description: "Nous recherchons un développeur React expérimenté...",
      skills: ["React", "JavaScript", "Node.js"],
    },
    {
      id: 2,
      title: "Développeur Full Stack",
      company: "StartupXYZ",
      location: "Lyon",
      salary: "40-55k€",
      description: "Rejoignez notre équipe en croissance...",
      skills: ["React", "Python", "Docker"],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "Bordeaux",
      salary: "35-45k€",
      description: "Créez des interfaces exceptionnelles...",
      skills: ["Figma", "UI Design", "Prototyping"],
    },
  ])

  return (
    <div className="page-container">
      <Navigation userType="job-seeker" onLogout={onLogout} />

      <main className="page-content">
        <div className="page-header">
          <h1>Offres d'emploi</h1>
          <p>Découvrez les meilleures opportunités pour votre carrière</p>
        </div>

        <div className="jobs-filters">
          <input type="text" placeholder="Rechercher par titre..." className="search-input" />
          <input type="text" placeholder="Localisation..." className="search-input" />
          <select className="search-input">
            <option>Tous les secteurs</option>
            <option>Tech</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  )
}
