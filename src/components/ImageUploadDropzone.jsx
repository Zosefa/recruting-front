import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/dropdown.css";

export default function ImageUploadDropzone({
  value,
  onChange,
  label = "Logo de l'entreprise *",
  placeholder = "Glissez-déposez une image ou cliquez pour sélectionner",
}) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  // Mise à jour du preview quand value change (ex: depuis parent)
  useEffect(() => {
    if (value && value instanceof File) {
      setPreview(URL.createObjectURL(value));
    } else if (!value) {
      setPreview(null);
    }
  }, [value]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide (PNG, JPG, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    onChange(file);
    // Le preview sera mis à jour via useEffect
  };

  const removeImage = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="form-group mb-2">
      <label className="block font-medium text-gray-700 mb-2">{label}</label>

      <div
        className={`upload-label ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
          id="logo-upload"
        />

        {!preview ? (
          // État vide : invitation à uploader
          <div className="flex flex-col items-center gap-3">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary opacity-70"
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 font-medium text-center">{placeholder}</p>
            <p className="text-xs text-gray-500 mb-3">PNG, JPG, GIF • Max 5 Mo</p>
            <label
              htmlFor="logo-upload"
              className="btn-primary text-sm px-5 py-2 cursor-pointer"
            >
              Choisir une image
            </label>
          </div>
        ) : (
          // État avec image : aperçu centré et contrôlé
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={preview}
                alt="Aperçu du logo"
                className="w-20 h-20 object-cover rounded-xl shadow-lg border-4 border-white"
              />
              {/* Bouton supprimer en coin */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute btn-danger -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600 transition mb-3"
                title="Supprimer"
              >
                supprimer
              </button>
            </div>

            <label
              htmlFor="logo-upload"
              className="btn-secondary text-sm px-4 py-2 cursor-pointer"
            >
              Changer l'image
            </label>
          </div>
        )}
      </div>
    </div>
  );
}