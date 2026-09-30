import { usePageMeta } from "../hooks/usePageMeta";
import { ButtonLink } from "../components/Button";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <>
      <PageHero title="Page not found" intro="Sorry, we couldn't find the page you were looking for." />
      <Section tone="white">
        <p className="center">
          <ButtonLink to="/">Back to home</ButtonLink> <ButtonLink to="/menu" variant="secondary">View menu</ButtonLink>
        </p>
      </Section>
    </>
  );
}
