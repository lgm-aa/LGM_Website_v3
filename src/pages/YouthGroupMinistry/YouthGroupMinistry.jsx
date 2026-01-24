import MinistryHeroLayout from "@/components/layout/MinistryHeroLayout/MinistryHeroLayout";
import IntroSplit from "@/components/layout/MinistryHeroLayout/IntroSplit/IntroSplit";

import youthHeroImage from "@/assets/youth_group.webp";
import sectionImage from "@/assets/ministry_campus.webp";


export default function YouthGroupMinistry() {
  return (
    <MinistryHeroLayout title="YOUTH" heroImage={youthHeroImage}>
      <IntroSplit
        label="Youth Group"
        blurb="We’re a group of high school and middle school students (grades 6-12) who are passionate about having fun and learning about what it means to be a devoted follower of Christ who loves like Jesus, for life!"
        verse="Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity."
        verseRef="1 Timothy 4:12"
        ctaText="Contact Us"
        ctaHref="/contact"
        image={sectionImage}
        imageAlt="Children ministry"
      />
    </MinistryHeroLayout>
  );
}
