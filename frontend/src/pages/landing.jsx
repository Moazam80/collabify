import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Intro />
      <HowItWorks />
      <Features />
    </div>
  );
}

export default Landing;