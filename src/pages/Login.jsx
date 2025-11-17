"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import "../styles/auth.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, refresh_token } = data;

      const { data: userData } = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Stockage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refresh_token);
      sessionStorage.setItem("userType", userData.info.type);
      sessionStorage.setItem("currentUser", JSON.stringify({
        email: userData.user.email,
        id: userData.user.id
      }));

      // Callback si parent (App.jsx) veut savoir qui est connecté
      onLogin?.(userData.user.email, userData.info.type, userData.user.id);

      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-section">
          <div className="auth-header">
            <Logo />
            <h1>Connectez-vous</h1>
            <p>Bienvenue sur votre plateforme de recrutement</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form space-y-5">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-3 py-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size="xs" type="spinner"/>
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <p className="auth-link mt-6">
            Pas encore de compte ? <a href="/register" className="font-semibold">S'inscrire gratuitement</a>
          </p>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h2>Bienvenue sur RECRUITING</h2>
            <p>Connectez recruteurs et talents en quelques clics</p>
            <div className="feature-list">
              <div className="feature">Profils détaillés</div>
              <div className="feature">Messagerie intégrée</div>
              <div className="feature">Gestion de CV</div>
              <div className="feature">Offres d'emploi ciblées</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}