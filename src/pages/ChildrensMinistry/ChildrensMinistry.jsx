import MinistryHeroLayout from "@/components/layout/MinistryHeroLayout/MinistryHeroLayout";
import IntroSplit from "@/components/layout/MinistryHeroLayout/IntroSplit/IntroSplit";

import heroImage from "@/assets/ministry_campus.webp";
import sectionImage from "@/assets/ministry_campus.webp";

export default function ChildrensMinistry() {
  return (
    <MinistryHeroLayout title="CHILDREN" heroImage={heroImage}>
      <IntroSplit
        label="Children Ministry"
        blurb="Our children’s ministry is a joyful community where kids (grades K-5) gather together to learn about God’s love, grow in faith, and build lasting friendships."
        verse="Children are a heritage from the LORD, offspring a reward from him"
        verseRef="Psalms 127:3"
        ctaText="Contact Us"
        ctaHref="/contact"
        image={sectionImage}
        imageAlt="Children ministry"
      />
    </MinistryHeroLayout>
  );
}
