import "./ContactInfo.css";
import headshot from "@/assets/headshot.jpg";

export default function ContactInfo() {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Pastor",
      email: "john@livinggraceministry.com",
      image: headshot,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Worship Leader",
      email: "jane@livinggraceministry.com",
      image: headshot,
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Youth Pastor",
      email: "mike@livinggraceministry.com",
      image: headshot,
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Children's Ministry",
      email: "sarah@livinggraceministry.com",
      image: headshot,
    },
    {
      id: 5,
      name: "Tom Brown",
      role: "Deacon",
      email: "tom@livinggraceministry.com",
      image: headshot,
    },
    {
      id: 6,
      name: "Emily Davis",
      role: "Administrator",
      email: "emily@livinggraceministry.com",
      image: headshot,
    },
  ];

  return (
    <section className="contact-info">
      <div className="contact-info__container">
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
              <a
                href={`mailto:${member.email}`}
                className="team-card__email"
              >
                EMAIL →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
