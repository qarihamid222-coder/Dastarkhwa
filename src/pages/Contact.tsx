import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { ContactForm } from "../components/ContactForm";
import { ContactDetails } from "../components/ContactDetails";

export default function Contact() {
  usePageMeta("Contact Us", "Contact Karachi Biryani Center with your questions, feedback or catering enquiries.");
  return (
    <>
      <PageHero title="Contact Us" intro="Questions or feedback? Send us a message." />
      <Section tone="white">
        <div className="split">
          <div>
            <h2 className="h3">Send a message</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="h3">Restaurant details</h2>
            <ContactDetails />
          </div>
        </div>
      </Section>
    </>
  );
}
