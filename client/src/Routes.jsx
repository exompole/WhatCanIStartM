
import HomeInfo from "./Pages/Homepage/HomeInfo";
import LoginChoice from "./Pages/LoginRegistration/LoginChoice";
import AdminLogin from "./Pages/LoginRegistration/AdminLogin";
import UserLogin from "./Pages/LoginRegistration/UserLogin";
import Registration from "./Pages/LoginRegistration/Registration";
import About from "./Pages/NavBarLink/About";
import Business from "./Pages/NavBarLink/Buisness/Business";
import Contact from "./Pages/NavBarLink/Contact";
import Land from "./Pages/NavBarLink/Buisness/Land";
import RawMaterials from "./Pages/NavBarLink/Buisness/RawMaterial";
import Farming from "./Pages/NavBarLink/Buisness/Farming";
import Skills from "./Pages/NavBarLink/Buisness/skill";
import AdminDashboard from "./Pages/LoginRegistration/AdminDashboard";


export const routes = [
  { path: "/", element:  <HomeInfo/>},
  { path: "/Contact", element: <Contact/> },
  { path: "/login", element: <LoginChoice /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/user-login", element: <UserLogin /> },
  { path: "/registration", element: <Registration /> },
  { path: "/about", element: <About/> },
  { path: "/business", element: <Business/> },
  { path: "/land", element: <Land/> },
  { path: "/raw-material", element: <RawMaterials/> },
  { path: "/farming", element: <Farming/> },
  { path: "/skill", element: <Skills/> },
  { path: "/admin-dashboard", element: <AdminDashboard/> },
  
  
];
