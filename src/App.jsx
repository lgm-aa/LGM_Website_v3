import { Routes, Route } from "react-router-dom";
import NavBar from "@/components/layout/NavBar/NavBar";

import Layout from "@/components/layout/Layout";

import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Give from "@/pages/Give/Give";
import Contact from "@/pages/Contact/Contact";
import Sermons from "@/pages/Sermons/Sermons";
import ChildrensMinistry from "@/pages/ChildrensMinistry/ChildrensMinistry";
import YouthGroupMinistry from "@/pages/YouthGroupMinistry/YouthGroupMinistry";
import CampusMinistry from "@/pages/CampusMinistry/CampusMinistry";
import PostGradMinistry from "@/pages/PostGradMinistry/PostGradMinistry";
import AdultFamilyMinistry from "@/pages/AdultFamilyMinistry/AdultFamilyMinistry";
import ScrollToAnchor from "@/components/ScrollToAnchor/ScrollToAnchor";

function App() {
  return (
    <>
      {/* ScrollToAnchor handles scroll position on route changes */}
      <ScrollToAnchor />
      
      <Routes>
        {/* 👇 OPENING TAG: Layout wraps everything */}
        <Route element={<Layout />}>
          
          {/* All these pages will render INSIDE the Layout's <Outlet/> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/give" element={<Give />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/childrens" element={<ChildrensMinistry />} />
          <Route path="/youth-group" element={<YouthGroupMinistry />} />
          <Route path="/campus" element={<CampusMinistry />} />
          <Route path="/post-grad" element={<PostGradMinistry />} />
          <Route path="/adult-family" element={<AdultFamilyMinistry />} />
          
        </Route>
        {/* 👆 CLOSING TAG: End of the Layout wrapper */}
      </Routes>
    </>
  );
}

export default App;
