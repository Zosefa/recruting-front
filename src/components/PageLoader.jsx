// components/PageLoader.jsx
import "../styles/loader.css";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader size="xl" type="pulse" />
        <p className="text-gray-600 mt-6 text-lg">Chargement...</p>
      </div>
    </div>
  );
}