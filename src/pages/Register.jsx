"use client";

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/auth.css";
import { toast } from "react-toastify";
import axios from "axios";
import ImageUploadDropzone from "../components/ImageUploadDropzone";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Register({ onLogin }) {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("condidat");
  const [completedInfo, setCompletedInfo] = useState(false);
  const [error, setError] = useState("");

  // États communs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // États candidat
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");

  // États recruteur
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [logoEntreprise, setLogoEntreprise] = useState(""); // File object ou chaîne vide
  const [adresseEntreprise, setAdresseEntreprise] = useState("");
  const [descriptionEntreprise, setDescriptionEntreprise] = useState("");

  // Reset complet au changement de type
  const resetAll = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNom("");
    setPrenom("");
    setAdresse("");
    setNomEntreprise("");
    setLogoEntreprise("");
    setAdresseEntreprise("");
    setDescriptionEntreprise("");
    setCompletedInfo(false);
    setError("");
  }, []);

  useEffect(() => {
    resetAll();
  }, [userType, resetAll]);

  // Validation des champs de l'étape 1
  const isStep1Valid = () => {
    if (userType === "condidat") {
      return nom.trim() && prenom.trim() && adresse.trim();
    }
    return (
      nomEntreprise.trim() &&
      logoEntreprise && // c'est un objet File
      adresseEntreprise.trim() &&
      descriptionEntreprise.trim()
    );
  };

  const handleNext = () => {
    if (!isStep1Valid()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setCompletedInfo(true);
  };

  const handlePrev = () => {
    setCompletedInfo(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      const role = userType === "recruteur" ? "ROLE_RECRUITER" : "ROLE_CONDIDAT";

      const { data: userRes } = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        role,
      });

      if (!userRes.success) {
        toast.error(userRes.message || "Erreur lors de la création du compte");
        return;
      }

      const utilisateurId = userRes.user.id;

      if (userType === "condidat") {
        const { data: profilRes } = await axios.post(`${API_BASE_URL}/profil-condidat`, {
          utilisateurId,
          nom,
          prenom,
          localisation: adresse,
          resume: "",
          anneExperience: 0,
          profilCompleted: false,
        });

        if (!profilRes.success) {
          toast.error(profilRes.message);
          return;
        }

        toast.success(profilRes.message);
      } else {
        const formData = new FormData();
        formData.append("utilisateurId", utilisateurId);
        formData.append("nomEntreprise", nomEntreprise);
        formData.append("poste", descriptionEntreprise);
        formData.append("adresse", adresseEntreprise);
        formData.append("verifie", false);
        if (logoEntreprise) formData.append("logoEntreprise", logoEntreprise);

        const { data: recruteurRes } = await axios.post(
          `${API_BASE_URL}/profil-recruteur`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (!recruteurRes.success) {
          toast.error(recruteurRes.message);
          return;
        }

        toast.success(recruteurRes.message);
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-form-section">
          <div className="auth-header">
            <Logo />
            <h1>Créer un compte</h1>
            <p>Rejoignez notre plateforme de recrutement</p>
          </div>

          {/* Sélecteur de type */}
          <div className="form-group mb-5">
            <label>Type d'utilisateur</label>
            <div className="user-type-selector">
              <button
                type="button"
                className={`user-type-btn ${userType === "condidat" ? "active" : ""}`}
                onClick={() => setUserType("condidat")}
              >
                Chercheur d'emploi
              </button>
              <button
                type="button"
                className={`user-type-btn ${userType === "recruteur" ? "active" : ""}`}
                onClick={() => setUserType("recruteur")}
              >
                Recruteur
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
            encType={userType === "recruteur" ? "multipart/form-data" : undefined}
          >
            {/* Étape 1 : Infos spécifiques */}
            {!completedInfo && userType === "condidat" && (
              <div className="content-info space-y-4">
                <Input label="Nom" id="nom" value={nom} onChange={setNom} placeholder="Votre nom" />
                <Input label="Prénom" id="prenom" value={prenom} onChange={setPrenom} placeholder="Votre prénom" />
                <Input label="Adresse / Ville" id="adresse" value={adresse} onChange={setAdresse} placeholder="Ex: Antananarivo" />
              </div>
            )}

            {!completedInfo && userType === "recruteur" && (
              <div className="content-info space-y-4">
                <Input label="Nom de l'entreprise" id="nom-entreprise" value={nomEntreprise} onChange={setNomEntreprise} />
                <div className="form-group mb-2">
                  <ImageUploadDropzone
                    value={logoEntreprise}
                    onChange={setLogoEntreprise}
                    label="Logo de l'entreprise *"
                    placeholder="Glissez votre logo ici ou cliquez pour sélectionner"
                  />
                </div>
                <Input label="Siège social" id="adresse-entreprise" value={adresseEntreprise} onChange={setAdresseEntreprise} />
                <div className="form-group mb-2">
                  <label htmlFor="description-entreprise">Description</label>
                  <textarea
                    id="description-entreprise"
                    rows={5}
                    value={descriptionEntreprise}
                    onChange={(e) => setDescriptionEntreprise(e.target.value)}
                    placeholder="Décrivez votre entreprise..."
                    required
                  />
                </div>
              </div>
            )}

            {/* Étape 2 : Identifiants */}
            {completedInfo && (
              <div className="content-info-user space-y-4">
                <Input type="email" label="Email" id="email" value={email} onChange={setEmail} placeholder="votre@email.com" />
                <Input type="password" label="Mot de passe" id="password" value={password} onChange={setPassword} placeholder="6 caractères minimum" />
                <Input type="password" label="Confirmer le mot de passe" id="confirmPassword" value={confirmPassword} onChange={setConfirmPassword} />
              </div>
            )}

            {error && <div className="error-message mt-4">{error}</div>}

            {/* Boutons */}
            <div className="mt-5">
              {completedInfo ? (
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn-primary" onClick={handlePrev}>
                    Retour
                  </button>
                  <button type="submit" className="btn-primary">
                    Créer un compte
                  </button>
                </div>
              ) : (
                <button type="button" className="btn-primary w-100" onClick={handleNext}>
                  Suivant
                </button>
              )}
            </div>
          </form>

          <p className="auth-link mt-4">
            Vous avez déjà un compte ? <a href="/login">Se connecter</a>
          </p>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h2>Rejoignez-nous</h2>
            <p>Trouvez votre prochain emploi ou votre prochain talent</p>
            <div className="feature-list">
              <div className="feature">Inscription rapide</div>
              <div className="feature">Profil complet</div>
              <div className="feature">Connexions directes</div>
              <div className="feature">Opportunités</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Input réutilisable (petite optimisation JSX)
function Input({ label, id, value, onChange, type = "text", ...props }) {
  return (
    <div className="form-group mb-2">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        {...props}
      />
    </div>
  );
}