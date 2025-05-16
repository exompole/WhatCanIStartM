
import Navbar from "./components/Navbar";
import{Routes,Route} from "react-router-dom"
import { routes } from "./Routes";
import FloatingHelp from "./components/FloatingHelp";


function App() {
  return (
    <>
    
      <Navbar></Navbar>
      <FloatingHelp/>
      <>
        <Routes>
          {routes.map(({path,element})=>(
            <Route key={path} path={path} element={element}/>
          ))}
        </Routes>
      </>
    </>
  );
}

export default App;
