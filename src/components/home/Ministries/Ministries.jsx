import "./Ministries.css";
import Card from "@/components/ui/Card/Card";
import CardCarousel from "@/components/ui/CardCarousel/CardCarousel";

import campusImg from "@/assets/ministry_campus.webp";
import postgradImg from "@/assets/ministry_postgrad.webp";
import postgradImg2 from "@/assets/postgradimg.webp";
import children from "@/assets/children.webp";
import youthgroup from "@/assets/youth-ministry.webp";

export default function Ministries() {
  const ministries = [
    { id: 1, title: "CHILDREN'S", image: children, href: "/childrens" },
    { id: 2, title: "YOUTH GROUP", image: youthgroup, href: "/youth-group" },
    { id: 3, title: "CAMPUS", image: campusImg, href: "/campus" },
    { id: 4, title: "POST GRAD", image: postgradImg2, href: "/post-grad" },
    { id: 5, title: "ADULT/FAMILY", image: postgradImg, href: "/adult-family" },
  ];

  return (
    <section className="ministries" id="ministries">
      <div className="ministries__inner">
        <header className="ministries__header">
          <h2 className="section-h2">
            Find <em>your</em> place
          </h2>
          <p className="body-text">Check out our ministries</p>
        </header>

        <div className="ministries__carousel">
          <CardCarousel
            items={ministries}
            spaceBetween={32}
            renderCard={(ministry) => (
              <Card
                title={ministry.title}
                image={ministry.image}
                href={ministry.href}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
