import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppRoutes from "./router/AppRoutes";
function App() {
  return (
    <Routes>
      {AppRoutes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  );
}
export default App;
