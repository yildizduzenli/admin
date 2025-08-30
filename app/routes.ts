import {type RouteConfig, index, route} from '@react-router/dev/routes';

export default [
  index('routes/home.jsx'),
  route('blog/add', 'routes/addBlog.jsx'),
  route('login', 'routes/login.jsx'),
  route('blog/list', 'routes/blogList.jsx'),
  route('blog/update', 'routes/updateBlog.jsx'),
  route('about', 'routes/about.jsx'),
  route('service/list', 'routes/serviceList.jsx'),
  route('service/content', 'routes/serviceContent.jsx'),
  route('service/add', 'routes/addService.jsx'),
  route('service/update', 'routes/updateService.jsx'),
  route('contact', 'routes/contact.jsx'),
  route('deploy', 'routes/deploy.jsx'),
] satisfies RouteConfig;
