import { Routes, Route } from "react-router-dom";
import NavBar from "@/components/layout/NavBar/NavBar";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Sermons from "@/pages/Sermons/Sermons";
import ChildrensMinistry from "@/pages/ChildrensMinistry/ChildrensMinistry"
import YouthGroupMinistry from "@/pages/YouthGroupMinistry/YouthGroupMinistry"
import CampusMinistry from "@/pages/CampusMinistry/CampusMinistry"
import PostGradMinistry from "./pages/PostGradMinistry/PostGradMinistry";
import AdultFamilyContent from "./components/adult-family/AdultFamilyContent";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/childrens" element={<ChildrensMinistry />} />
        <Route path="/youth-group" element={<YouthGroupMinistry />} />
        <Route path="/campus" element={<CampusMinistry />} />
        <Route path="/post-grad" element={<PostGradMinistry />} />
        <Route path="/adult-family" element={<AdultFamilyContent />} />
      </Routes>
    </>
  );
}

export default App;
