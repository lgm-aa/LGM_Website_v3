import "./Ministries.css";
import Card from "@/components/ui/Card/Card";
import CardCarousel from "@/components/ui/CardCarousel/CardCarousel";
import Reveal from "@/components/ui/Reveal/Reveal";

import children from "@/assets/children.webp";
import youthgroup from "@/assets/youth-ministry.webp";
import campusImg from "@/assets/ministry_campus.webp";
import postgradImg from "@/assets/ministry_postgrad.webp";
import adultFamilyImg from "@/assets/ministry_adult_family.webp";

export default function Ministries() {
  const ministries = [
    { id: 1, title: "CHILDREN'S", image: children, href: "/childrens" },
    { id: 2, title: "YOUTH GROUP", image: youthgroup, href: "/youth-group" },
    { id: 3, title: "CAMPUS", image: campusImg, href: "/campus" },
    { id: 4, title: "POST GRAD", image: postgradImg, href: "/post-grad" },
    {
      id: 5,
      title: "ADULT/FAMILY",
      image: adultFamilyImg,
      href: "/adult-family",
    },
  ];

  return (
    <section className="ministries" id="ministries">
      <div className="ministries__inner">
        <Reveal as="header" className="ministries__header">
          <h2 className="section-h2">
            Find <em>your</em> place
          </h2>
          <p className="body-text">Check out our ministries</p>
        </Reveal>

        <Reveal className="ministries__carousel" delay={100}>
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
        </Reveal>
      </div>
    </section>
  );
}
