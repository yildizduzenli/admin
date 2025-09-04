import Home from "./home";
import About from "./about";
import AddBlog from "./addBlog";
import UpdateBlog from "./updateBlog";
import BlogList from "./blogList";
import AddService from "./addService";
import ServiceList from "./serviceList";
import UpdateService from "./updateService";
import ServiceContent from "./serviceContent";
import Contact from "./contact";
import Deploy from "./deploy";
import NotFound from "./404";
import Login from "./login";
import DashboardLayout from "../layouts/Dashboard.layout";

const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "blog/update",
        element: <UpdateBlog />,
      },
      {
        path: "blog/list",
        element: <BlogList />,
      },
      {
        path: "blog/add",
        element: <AddBlog />,
      },
      {
        path: "service/list",
        element: <ServiceList />,
      },
      {
        path: "service/add",
        element: <AddService />,
      },
      {
        path: "service/update",
        element: <UpdateService />,
      },
      {
        path: "service/content",
        element: <ServiceContent />,
      },
      {
        path: "service/update",
        element: <UpdateService />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "deploy",
        element: <Deploy />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
