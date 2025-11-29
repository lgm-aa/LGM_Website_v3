import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar/NavBar";
import Home from "./pages/Home/Home";
import About from "./components/about/About";
import Sermons from "./pages/Sermons/Sermons";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sermons" element={<Sermons />} />
      </Routes>
    </>
  );
}

export default App;
