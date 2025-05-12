import HomeInfo from "./Pages/HomeInfo";
import Contact from "./Pages/Contact";
import LoginChoice from "./Pages/LoginChoice";
import Registration from "./Pages/Registration";
import AdminLogin from "./Pages/AdminLogin";
import UserLogin from "./Pages/UserLogin";
import About from "./Pages/About";

export const routes = [
  { path: "/", element: <HomeInfo /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/login", element: <LoginChoice /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/user-login", element: <UserLogin /> },
  { path: "/registration", element: <Registration /> },
  { path: "/about", element: <About/> },
  
];
