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
import Skills from "./Pages/NavBarLink/Buisness/Skill";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import IdeaPage from "./Pages/Idea/IdeaPage";
import LemonProducts from "./components/LemonProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentForm from "./components/PaymentForm";
import LoginRegistration from "./Pages/LoginRegistration/LoginRegistration";
import RoadMap from "./components/RoadMap";



// Service Pages
import LegalCompliance from "./Pages/Services/LegalCompliance";
import ProposalFunding from "./Pages/Services/ProposalFunding";
import PerformanceImprovement from "./Pages/Services/PerformanceImprovement";
import ProfessionalServices from "./Pages/Services/ProfessionalServices";
import Marketing from "./Pages/Services/Marketing";
import PremiumPlans from "./components/PremiumPlans";




// Debug Page Component
const DebugPage = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '60vh',
    textAlign: 'center',
    padding: '20px'
  }}>
    <h1 style={{ fontSize: '2rem', color: '#10b981', marginBottom: '1rem' }}>Debug Page</h1>
    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
      This page is working correctly.
    </p>
    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
      Current URL: {window.location.href}
    </p>
    <a 
      href="/admin-dashboard" 
      style={{
        padding: '12px 24px',
        backgroundColor: '#3b82f6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        marginRight: '10px'
      }}
    >
      Go to Admin Dashboard
    </a>
    <a 
      href="/" 
      style={{
        padding: '12px 24px',
        backgroundColor: '#6b7280',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600'
      }}
    >
      Go Home
    </a>
  </div>
);

// 404 Page Component
const NotFound = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '60vh',
    textAlign: 'center',
    padding: '20px'
  }}>
    <h1 style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }}>404</h1>
    <h2 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
      The page you're looking for doesn't exist.
    </p>
    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
      Current URL: {window.location.href}
    </p>
    <a 
      href="/debug" 
      style={{
        padding: '12px 24px',
        backgroundColor: '#10b981',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        marginRight: '10px'
      }}
    >
      Debug Page
    </a>
    <a 
      href="/" 
      style={{
        padding: '12px 24px',
        backgroundColor: '#3b82f6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600'
      }}
    >
      Go Home
    </a>
  </div>
);

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
  { path: "/roadmap", element: <RoadMap /> },
  { path: "/PaymentForm", element: <PaymentForm/>},
  { path: "/LoginRegistration", element: <LoginRegistration/>},
  { path: "/PremiumPlans", element: <PremiumPlans/>}, // Fixed the double slash
  { path: "/debug", element: <DebugPage/> }, // Debug route for testing

  
  // Service Routes
  { path: "/services/legal-compliance", element: <LegalCompliance /> },
  { path: "/services/proposal-funding", element: <ProposalFunding /> },
  { path: "/services/performance-improvement", element: <PerformanceImprovement /> },
  { path: "/services/professional-services", element: <ProfessionalServices /> },
  { path: "/services/marketing", element: <Marketing /> },
  
  // Catch-all route for 404
  { path: "*", element: <NotFound /> },
];
