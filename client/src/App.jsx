
import Navbar from "./components/Navbar";
import{Routes,Route} from "react-router-dom"
import { routes } from "./Routes";
import FloatingHelp from "./components/FloatingHelp";
import IdeaGenerator from "./components/IdeaGenerator";
import Footer from "./components/Footer";
import SessionTimeoutWarning from "./components/SessionTimeoutWarning";
import SessionDebug from "./components/SessionDebug";


function App() {
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Navbar></Navbar>
      {/*    */}
      {/* <IdeaGenerator/> */}
      
      <main style={{ flex: 1, paddingBottom: '20px' }}>
        <Routes>
          {routes.map(({path,element})=>(
            <Route key={path} path={path} element={element}/>
          ))}
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
