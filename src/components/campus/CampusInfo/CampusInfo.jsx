import "./CampusInfo.css";
import Reveal from "@/components/ui/Reveal/Reveal";
import photoGroups from "@/assets/campus-sg.webp";
import photoRide from "@/assets/community7.webp";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0?cid=Y184MGRlNGI1OGJjNmFiOWI1ODAwNjFiMDQ3MDM5ODJkNzI2NjlkMWE3MmUyODVhMzU2Zjk5YTMzMzNjYjUzMWU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20";
const SMALL_GROUP_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScIMlvICnBFDibjgFX3kbcKM9zXpRiBcd_PiJDqff3wPBMcIg/viewform";
const DISCORD_URL = "https://discord.gg/zgny5dyxv4";

export default function CampusInfo() {
  return (
    <section className="campus-info">
      <div className="campus-info__container">
        <Reveal className="campus-info__media">
          <img
            src={photoRide}
            alt="Students on the way to a Campus gathering"
            className="campus-info__photo campus-info__photo--1"
          />
          <img
            src={photoGroups}
            alt="Campus small group gathered together"
            className="campus-info__photo campus-info__photo--2"
          />
        </Reveal>

        <Reveal className="campus-info__body" delay={120}>
          <div className="campus-info__block">
            <h3 className="campus-info__title section-h4">Small Groups</h3>
            <p className="campus-info__text body-text">
              Small groups meet once a week — any evening Monday through
              Thursday, from 7 to 9 PM. We run four groups across the week, so
              you can pick the night that fits your semester.
            </p>
            <a
              href={SMALL_GROUP_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="campus-info__link"
            >
              Join a small group
            </a>
          </div>

          <div className="campus-info__block">
            <h3 className="campus-info__title section-h4">Rides</h3>
            <p className="campus-info__text body-text">
              We gather off campus, so we run rides every week. Hop into our
              Discord for pickup spots and times, and to let us know you&rsquo;re
              coming along.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="campus-info__link"
            >
              Get on Discord
            </a>
          </div>

          <div className="campus-info__block">
            <h3 className="campus-info__title section-h4">Events</h3>
            <p className="campus-info__text body-text">
              Game nights, retreats, food runs — there&rsquo;s usually something
              on the calendar. Add ours to yours so you don&rsquo;t miss
              what&rsquo;s next.
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="campus-info__link"
            >
              View the calendar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
