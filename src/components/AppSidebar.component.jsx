import { useState, useRef } from "react";
import { ChevronDown, PanelLeftClose, PanelRightClose } from "lucide-react";
import { useLocation } from "react-router";
import { Link } from "react-router";
import { menuData } from "../constants/menu";

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const sidebarRef = useRef(null);

  const isActive = (path) => {
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovering(false);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.body.classList.toggle("sidebar-collapsed", !isCollapsed);
    document.body.classList.toggle("sidebar-expanded", isCollapsed);
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    const isOpen = openDropdowns[item.label];
    const visibleChilds = item.childPaths?.filter((child) => child.isVisible);
    const hasDropdown = visibleChilds && visibleChilds.length > 0;
    const hasActiveChild = item.childPaths?.some((child) =>
      isActive(child.path)
    );

    return (
      <div key={item.label} className="my-2">
        <Link
          onClick={() => {
            if (hasDropdown) {
              toggleDropdown(item.label);
            }
          }}
          to={hasDropdown ? "#" : item.path}
          className={` flex text-gray-800 items-center text-sm font-medium  transition-colors duration-75 p-3 rounded-md cursor-pointer ${
            active || hasActiveChild
              ? "bg-indigo-100 text-indigo-500"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center flex-grow">
            <Icon className="mr-3" size={24} />
            <span>{item.label}</span>
          </div>

          {hasDropdown && (
            <div className="flex items-center">
              <ChevronDown
                size={20}
                className={`transform text-gray-800 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </Link>

        {hasDropdown && isOpen && (
          <div className="pl-10 py-1 ">
            {item.childPaths.map(
              (child) =>
                child.isVisible && (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`block py-2 my-2 px-3 text-gray-800 font-medium tracking-[-0.32px] rounded-md border-transparent transition-colors duration-75 text-sm ${
                      isActive(child.path)
                        ? "bg-indigo-100 text-indigo-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {child.label}
                  </Link>
                )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className={`absolute top-4 ${
          isCollapsed && !isHovering ? "left-[88px]" : "left-[298px]"
        }  p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-all duration-200 cursor-pointer`}
      >
        {isCollapsed && !isHovering ? (
          <PanelRightClose size={24} />
        ) : (
          <PanelLeftClose size={24} />
        )}
      </button>
      <aside
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed sidebar  px-5 bg-white text-gray-900 h-full z-[9999] border-r border-gray-200 ${
          isCollapsed && !isHovering ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
      >
        <div className="flex mt-4 justify-center items-center">
          {isCollapsed && !isHovering ? (
            <img src="/logo.svg" alt="Logo" className="h-20 w-20" />
          ) : (
            <img src="/logo.svg" alt="Logo" className="h-40 w-40" />
          )}
        </div>

        {!isCollapsed || isHovering ? (
          <div className="menu-container mt-12">
            {menuData.map((section) => (
              <div key={section.title} className="menu-section mb-6">
                <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
                  {section.title}
                </h2>
                {section.items.map(renderMenuItem)}
              </div>
            ))}
          </div>
        ) : (
          <div className="menu-container mt-18 flex flex-col items-center">
            {menuData.flatMap((section) =>
              section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                const hasActiveChild = item.childPaths?.some((child) =>
                  isActive(child.path)
                );

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`p-3 my-2 rounded-md ${
                      active || hasActiveChild
                        ? "bg-indigo-100 text-indigo-500"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                    title={item.label}
                  >
                    <Icon size={24} />
                  </Link>
                );
              })
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default AppSidebar;
