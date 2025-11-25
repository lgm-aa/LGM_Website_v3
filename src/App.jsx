import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./components/about/About";
import NavBar from "./components/layout/NavBar/NavBar";

function App() {
  return <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;
