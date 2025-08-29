import { menuData } from "../constants/menu";
import { useLocation } from "react-router";

const AppBreadCrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const findMenuItemByPath = (menuData, path) => {
    for (const section of menuData) {
      for (const item of section.items) {
        if (item.path === path) {
          return item;
        }

        if (item.childPaths) {
          for (const child of item.childPaths) {
            if (child.path === path) {
              return child;
            }
          }
        }
      }
    }
    return null;
  };

  const currentMenuItem = findMenuItemByPath(menuData, currentPath);

  return (
    <div className="text-gray-900 font-semibold text-[20px]">
      {currentMenuItem ? currentMenuItem.breadCrumb : ""}
    </div>
  );
};

export default AppBreadCrumb;
