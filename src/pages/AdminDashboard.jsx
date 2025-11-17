"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dashboard,
  People,
  Work,
  Message,
  BarChart,
  Logout,
  Menu,
  Close,
  ChevronLeft,
  ChevronRight
} from "@mui/icons-material";
import "../styles/adminDashboard.css";

export default function AdminDashboard({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path, menu) => {
    setActiveMenu(menu);
    navigate(path);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Dashboard, path: "/admin/dashboard" },
    { id: "users", label: "Utilisateurs", icon: People, path: "/admin/users" },
    { id: "offers", label: "Offres", icon: Work, path: "/admin/offers" },
    { id: "messages", label: "Messages", icon: Message, path: "/admin/messages" },
    { id: "stats", label: "Statistiques", icon: BarChart, path: "/admin/stats" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {/* Le titre n'apparaît que si la sidebar est ouverte */}
          {sidebarOpen && <h2 className="sidebar-title">RECRUITING</h2>}
          
          {/* Email aussi conditionnel */}
          {sidebarOpen && <p className="user-email">{currentUser?.email}</p>}
          
          <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle menu">
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => handleNavigation(item.path, item.id)}
            >
              <item.icon className="menu-icon" />
              {sidebarOpen && <span className="menu-label">{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* Déconnexion */}
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <Logout className="menu-icon" />
            {sidebarOpen && <span className="menu-label">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && window.innerWidth < 992 && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* Main Content */}
      <main className="admin-content">
        <div className="content-header">
          <h1>Tableau de bord Admin</h1>
          <button className="mobile-toggle" onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>

        <p className="welcome-text">
          Bienvenue dans le panneau d’administration. Gérez la plateforme en toute simplicité.
        </p>

        <div className="admin-cards">
          <div className="admin-card" onClick={() => handleNavigation("/admin/users", "users")}>
            <People className="card-icon" />
            <h3>Utilisateurs</h3>
            <p>Gérer tous les comptes (candidats & recruteurs)</p>
          </div>

          <div className="admin-card" onClick={() => handleNavigation("/admin/offers", "offers")}>
            <Work className="card-icon" />
            <h3>Offres d'emploi</h3>
            <p>Valider, modifier ou supprimer les offres</p>
          </div>

          <div className="admin-card" onClick={() => handleNavigation("/admin/messages", "messages")}>
            <Message className="card-icon" />
            <h3>Messages</h3>
            <p>Superviser les échanges entre utilisateurs</p>
          </div>

          <div className="admin-card" onClick={() => handleNavigation("/admin/stats", "stats")}>
            <BarChart className="card-icon" />
            <h3>Statistiques</h3>
            <p>Suivre la croissance de la plateforme</p>
          </div>
        </div>
      </main>
    </div>
  );
}