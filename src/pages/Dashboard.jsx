"use client"
import Navigation from "../components/Navigation"
import UserDashboard from "./UserDashboard"
import AdminDashboard from "./AdminDashboard"
import "../styles/dashboard.css"

export default function Dashboard({ userType, onLogout, currentUser }) {

  if (userType === "admin") {
    return <AdminDashboard currentUser={currentUser} onLogout={onLogout} />
  }

  return (
    <div className="dashboard-container">
      <Navigation userType={userType} onLogout={onLogout} />

      <UserDashboard userType={userType} currentUSer={currentUser}/>
    </div>
  )
}
