import { Home, List } from "lucide-react";

export const menuData = [
  {
    title: "MENÜ",
    items: [
      {
        icon: Home,
        label: "Anasayfa",
        breadCrumb: "Anasayfa",
        path: "/",
      },
      {
        icon: List,
        label: "Blog",
        breadCrumb: "Blog",
        path: "/blogs",
        childPaths: [
          {
            label: "Tüm Bloglar",
            path: "/blog/list",
            breadCrumb: "Tüm Bloglar",
            isVisible: true,
          },
          {
            label: "Blog Ekle",
            path: "/blog/add",
            breadCrumb: "Blog Ekle",
            isVisible: false,
          },
        ],
      },
    ],
  },
];
