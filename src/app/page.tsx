import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import Footer from "../components/Footer/Footer";


export default function Page() {
  return (
    <>
      <Hero />
      <Section>
        <h2>About Us</h2>
        <p>Some content here...</p>
      </Section>
      <Section>
        <h2>Services</h2>
        <p>Details of services...</p>
      </Section>
    </>
  );
}
