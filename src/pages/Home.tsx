import { Link } from "react-router-dom";
import { menuItems } from "../data/menu";
import { restaurant } from "../data/restaurant";
import { usePageMeta } from "../hooks/usePageMeta";
import { ButtonLink } from "../components/Button";
import { FoodArt } from "../components/FoodArt";
import { MenuCard } from "../components/MenuCard";
import { Section } from "../components/Section";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { ContactDetails } from "../components/ContactDetails";

export default function Home() {
  usePageMeta();
  const featured = menuItems.filter((i) => i.featured).slice(0, 6);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__brand">{restaurant.name}</p>
            <h1 id="hero-title">Authentic Karachi Biryani, Made With Love</h1>
            <p className="hero__lead">{restaurant.shortDescription}</p>
            <div className="hero__cta">
              <ButtonLink to="/order" size="lg">
                ORDER NOW
              </ButtonLink>
              <ButtonLink to="/menu" variant="light" size="lg">
                VIEW MENU
              </ButtonLink>
            </div>
          </div>
          <div className="hero__art" role="img" aria-label="Illustration of a bowl of fragrant biryani with steam rising">
            <div className="hero__plate">
              <FoodArt variant="biryani" bare />
            </div>
          </div>
        </div>
      </section>

      <Section id="welcome" eyebrow="Welcome" title="A taste inspired by Karachi" tone="white">
        <p className="lead-text">
          Welcome to Karachi Biryani Center — serving delicious, aromatic and flavorful biryani inspired by the
          authentic taste of Karachi.
        </p>
      </Section>

      <Section
        id="featured"
        eyebrow="From our menu"
        title="Our biryani selection"
        intro="A taste of what we serve. Explore the full menu for drinks, sides and family deals."
      >
        <div className="grid-cards">
          {featured.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <p className="center">
          <ButtonLink to="/menu" variant="secondary">
            See the full menu
          </ButtonLink>
        </p>
      </Section>

      <Section id="why" eyebrow="Why choose us" title="Made with care, served with respect" tone="white">
        <WhyChooseUs />
      </Section>

      <Section id="about-teaser" eyebrow="About us" title={restaurant.name} tone="cream">
        <p className="lead-text">
          Karachi Biryani Center is dedicated to serving flavorful biryani and delicious Pakistani food with a focus
          on taste, freshness and quality.
        </p>
        <p className="center">
          <Link className="text-link" to="/about">
            Read more about us →
          </Link>
        </p>
      </Section>

      <Section id="find-us" eyebrow="Find us" title="Visit or get in touch" tone="white">
        <div className="split">
          <ContactDetails />
          <div className="cta-card">
            <h3>Ready to order?</h3>
            <p>Choose your favourites and place your order in a few taps.</p>
            <ButtonLink to="/order" size="lg">
              Order Now
            </ButtonLink>
            <p className="cta-card__link">
              <Link className="text-link" to="/location">
                Location &amp; opening hours →
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
