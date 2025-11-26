import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./components/about/About";
import NavBar from "./components/layout/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
