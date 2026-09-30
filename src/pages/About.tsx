import { usePageMeta } from "../hooks/usePageMeta";
import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { FoodArt } from "../components/FoodArt";

export default function About() {
  usePageMeta("About Us", "Learn about Karachi Biryani Center — flavorful biryani and delicious Pakistani food with a focus on taste, freshness and quality.");
  return (
    <>
      <PageHero title="About Us" intro="Flavorful biryani and delicious Pakistani food." />
      <Section tone="white">
        <div className="split split--center">
          <div>
            <h2>Karachi Biryani Center</h2>
            <p>
              Karachi Biryani Center is dedicated to serving flavorful biryani and delicious Pakistani food with a
              focus on taste, freshness and quality.
            </p>
            <p>
              Our biryani is inspired by the authentic taste of Karachi: fragrant basmati rice, tender meat and a rich
              blend of aromatic spices, prepared with care.
            </p>
            <ButtonLink to="/menu" variant="secondary">
              Explore the menu
            </ButtonLink>
          </div>
          <div className="about-art" role="img" aria-label="Illustration of a bowl of biryani">
            <FoodArt variant="biryani" />
          </div>
        </div>
      </Section>
      <Section eyebrow="Why choose us" title="What we stand for" tone="cream">
        <WhyChooseUs />
      </Section>
    </>
  );
}
