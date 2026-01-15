import "./ContactInfo.css";
import headshot from "@/assets/headshot.jpg";

export default function ContactInfo() {
  const teamMembers = [
    {
      id: 1,
      name: "TBD",
      role: "Pastor",
      email: "livinggraceministry@gmail.com",
      image: headshot,
    },
    {
      id: 2,
      name: "Andrew Choi",
      role: "Worship Leader",
      email: "livinggraceministry@gmail.com",
      image: headshot,
    },
    {
      id: 3,
      name: "Daniel Cha",
      role: "Assistant Worship Leader",
      email: "livinggraceministry@gmail.com",
      image: headshot,
    },
    {
      id: 4,
      name: "Sarah Chung",
      role: "Youth Ministry Director",
      email: "livinggraceministry@gmail.com",
      image: headshot,
    },
    {
      id: 5,
      name: "Sammy Kim",
      role: "Campus Ministry Admin",
      email: "samueki@umich.edu",
      image: headshot,
    },
    {
      id: 6,
      name: "Ian Yu",
      role: "Post-Grad Ministry Admin",
      email: "9921ianyu@gmail.com",
      image: headshot,
    },
    {
      id: 7,
      name: "TBD",
      role: "Adult/Family Group",
      email: "LGMAdultandFamilyMinistry@gmail.com",
      image: headshot,
    },
    {
      id: 8,
      name: "Jason Um",
      role: "Finance Chair",
      email: "LGMAdultandFamilyMinistry@gmail.com",
      image: headshot,
    },
  ];

  return (
    <section className="contact-info">
      <div className="contact-info__container">
        <div className="contact-info__email-section">
          <a href="mailto:livinggraceministry@gmail.com" className="contact-info__email-link">
            livinggraceministry@gmail.com
          </a>
        </div>
        <div className="contact-info__grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card__image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card__image"
                />
              </div>
              <h3 className="team-card__name">{member.name}</h3>
              <p className="team-card__role">{member.role}</p>
              <a href={`mailto:${member.email}`} className="team-card__email">
                EMAIL →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
