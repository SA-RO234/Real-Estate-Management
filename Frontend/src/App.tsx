<<<<<<< HEAD
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
=======
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
>>>>>>> b15d6e5ee0ebb6082b853af43af43919c318b37f
  );
}
export default App;
