import {
  Contact,
  Globe,
  Home,
  List,
  PersonStanding,
  Workflow,
} from "lucide-react";

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
        path: "/blog/list",
        childPaths: [
          {
            label: "Blog Ekle",
            path: "/blog/add",
            breadCrumb: "Blog Ekle",
            isVisible: false,
          },
        ],
      },
      {
        icon: PersonStanding,
        label: "Hakkımda",
        breadCrumb: "Hakkımda",
        path: "/about",
      },
      {
        icon: Workflow,
        label: "Hizmetler",
        breadCrumb: "Hizmetler",
        path: "/service/list",
        childPaths: [
          {
            label: "Tüm Hizmetler",
            path: "/service/list",
            breadCrumb: "Tüm Hizmetler",
            isVisible: true,
          },
          {
            label: "Hizmet Sayfa İçeriği",
            path: "/service/cont  ent",
            breadCrumb: "Hizmet Sayfa İçeriği",
            isVisible: true,
          },
          {
            label: "Hizmet Ekle",
            path: "/service/add",
            breadCrumb: "Hizmet Ekle",
            isVisible: false,
          },
          {
            label: "Hizmet Güncelle",
            path: "/service/update",
            breadCrumb: "Hizmet Güncelle",
            isVisible: false,
          },
        ],
      },
      {
        icon: Contact,
        label: "İletişim",
        breadCrumb: "İletişim",
        path: "/contact",
      },
    ],
  },
  {
    title: "YAYIN",
    items: [
      {
        icon: Globe,
        label: "Yayınla",
        breadCrumb: "Yayınla",
        path: "/deploy",
      },
    ],
  },
];
