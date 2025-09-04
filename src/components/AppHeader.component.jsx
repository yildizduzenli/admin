import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const AppHeader = () => {
  const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex bg-white justify-between items-center px-4 py-6 border-b border-gray-200">
      <div className="ml-auto relative" ref={dropdownRef}>
        <button
          className="flex items-center text-gray-900 font-medium cursor-pointer gap-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {user?.name}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              showDropdown ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 flex flex-col gap-1">
              <span className="font-semibold text-base flex">{user?.name}</span>
              <span className="text-gray-500 flex">{user?.mail}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
                setShowDropdown(false);
              }}
              className="block w-full font-medium text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
