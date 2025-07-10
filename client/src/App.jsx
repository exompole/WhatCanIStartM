
import Navbar from "./components/Navbar";
import{Routes,Route} from "react-router-dom"
import { routes } from "./Routes";
import FloatingHelp from "./components/FloatingHelp";
import IdeaGenerator from "./components/IdeaGenerator";
import Footer from "./components/Footer";


function App() {
  
  return (
    <>
    
      <Navbar></Navbar>
      {/*    */}
      {/* <IdeaGenerator/> */}
      
      <>
        <Routes>
          {routes.map(({path,element})=>(
            <Route key={path} path={path} element={element}/>
          ))}
        </Routes>
      </>
      <Footer/>
    </>
  );
}

export default App;
