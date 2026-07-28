import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import FeaturedProjects from "../components/FeaturedProjects";
import CallToAction from "../components/CallToAction";

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Intro />
      <HowItWorks />
      <Features />
      <FeaturedProjects />
      <CallToAction />
    </div>
  );
}

export default Landing;