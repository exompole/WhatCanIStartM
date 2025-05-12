import "./App.css";
import Navbar from "./components/Navbar";
import{Routes,Route} from "react-router-dom"
import { routes } from "./Routes";

function App() {
  return (
    <>
      <Navbar></Navbar>
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
