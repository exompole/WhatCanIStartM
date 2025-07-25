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
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import IdeaPage from "./Pages/Idea/IdeaPage";
import LemonProducts from "./components/LemonProduct";
import ProtectedRoute from "./components/ProtectedRoute";

// Service Pages
import LegalCompliance from "./Pages/Services/LegalCompliance";
import ProposalFunding from "./Pages/Services/ProposalFunding";
import PerformanceImprovement from "./Pages/Services/PerformanceImprovement";
import ProfessionalServices from "./Pages/Services/ProfessionalServices";
import Marketing from "./Pages/Services/Marketing";



export const routes = [
  { path: "/", element:  <HomeInfo/>},
  { path: "/Contact", element: <Contact/> },
  { path: "/login", element: <LoginChoice /> },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/user-login", element: <UserLogin /> },
  { path: "/registration", element: <Registration /> },
  { path: "/about", element: <About/> },
  { path: "/business", element: <Business/> },
  { path: "/lemon", element: <ProtectedRoute><LemonProducts/></ProtectedRoute> },
  { path: "/land", element: <Land/> },
  { path: "/raw-material", element: <RawMaterials/> },
  { path: "/farming", element: <Farming/> },
  { path: "/skill", element: <Skills/> },
  { path: "/admin-dashboard", element: <AdminDashboard/> },
  { path: "/forgot-password", element: <ForgotPassword />},
  { path: "/reset-password/:token", element: <ResetPassword/>},
  { path: "/Idea", element: <ProtectedRoute><IdeaPage/></ProtectedRoute>},
  
  // Service Routes
  { path: "/services/legal-compliance", element: <LegalCompliance /> },
  { path: "/services/proposal-funding", element: <ProposalFunding /> },
  { path: "/services/performance-improvement", element: <PerformanceImprovement /> },
  { path: "/services/professional-services", element: <ProfessionalServices /> },
  { path: "/services/marketing", element: <Marketing /> },
];
