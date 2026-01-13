import React from "react";
import Hero from '@/components/about/Hero/Hero'
import Quote from '@/components/about/Quote/Quote'
import Overview from '@/components/about/Overview/Overview'
import WhoWeAre from '@/components/about/WhoWeAre/WhoWeAre'

export default function About() {
  return (
    <>
      <Hero />
      <Quote />
      <Overview />
      <WhoWeAre />
    </>
  );
}
