
import "../styles/loader.css";

const Loader = ({
  size = "md",        // xs, sm, md, lg, xl
  type = "spinner",   // spinner, dots, pulse, bar
  fullScreen = false,
  text = null,
  className = ""
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const loaderContent = (
    <div className={`loader loader-${type} ${sizeClasses[size]} ${className}`}>
      {type === "spinner" && (
        <svg className="animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M4 12a8 8 0 018-8v8H4z"
            fill="currentColor"
            className="opacity-75"
          />
        </svg>
      )}

      {type === "dots" && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="dot" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      )}

      {type === "pulse" && (
        <div className="pulse-ring"></div>
      )}

      {type === "bar" && (
        <div className="bar-loader">
          <div className="bar"></div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
        {loaderContent}
        {text && <p className="text-white mt-6 text-lg font-medium">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {loaderContent}
      {text && <p className="text-gray-600 mt-4 text-sm">{text}</p>}
    </div>
  );
};

export default Loader;