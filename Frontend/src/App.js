import "./App.css";
import HeaderComponent from "./component/HeaderComponent";
import { useParams, Outlet } from "react-router-dom";

function App() {
  const url = useParams();
  console.log(url);
  return (
    <>
      <div>
        <HeaderComponent className="header-container" />
        <Outlet />
      </div>
    </>
  );
}

export default App;
