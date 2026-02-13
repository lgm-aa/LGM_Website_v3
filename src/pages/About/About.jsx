import Quote from '@/components/about/Quote/Quote'
import Overview from '@/components/about/Overview/Overview'
import WhoWeAre from '@/components/about/WhoWeAre/WhoWeAre'
import Hero from "@/components/ministries/Hero/Hero";
import about_hero from "@/assets/about_hero.webp";


export default function About() {
  return (
    <>
      <Hero title="ABOUT US" image={about_hero} />
      <Quote />
      <Overview />
      <WhoWeAre />
    </>
  );
}
