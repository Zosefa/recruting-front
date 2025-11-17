import "../styles/components.css"

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className="company-badge">{job.company}</span>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-details">
        <span className="detail-item">📍 {job.location}</span>
        <span className="detail-item">💰 {job.salary}</span>
      </div>

      <div className="skills-list">
        {job.skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>

      <button className="btn-primary">Candidater</button>
    </div>
  )
}