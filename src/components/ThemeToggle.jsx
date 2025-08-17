import { useEffect, useState } from "react";

const ThemeToggle = ({ onToggle }) => {
  const [dark, setDark] = useState(false);

  const handleChange = () => {
    setDark(!dark);
    onToggle(!dark); 
  };

  
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <label htmlFor="theme" className="flex items-center select-none">
     
      <span className="relative mx-3">
        <input
          id="theme"
          type="checkbox"
          checked={dark}
          onChange={handleChange}
          className="sr-only peer"
        />
        {/* Toggle background */}
        <span
          className={`
            block w-10 h-5 rounded-full transition-colors duration-300
            ${dark ? "bg-blue-400" : "bg-yellow-300"}
          `}
        ></span>
        {/* Toggle circle */}
        <span
          className={`
            absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md
            transition-transform duration-300
            ${dark ? "translate-x-5 bg-blue-500" : ""}
          `}
        ></span>
        {/* Icon overlay */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className={`
                
                transform transition-all duration-300
                ${dark ? `rotate-${i * 45} translate-y-1` : "scale-0"}
              `}
            ></span>
          ))}
        </span>
      </span>

    </label>
  );
};

export default ThemeToggle;
