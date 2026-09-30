import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { MenuBrowser } from "../components/MenuBrowser";

export default function MenuPage() {
  usePageMeta("Menu", "Browse the Karachi Biryani Center menu: chicken, beef and mutton biryani, special biryani, family deals, sides, drinks and extras.");
  return (
    <>
      <PageHero title="Our Menu" intro="Chicken, beef, mutton and special biryani, family deals, sides, drinks and extras." />
      <Section tone="cream">
        <MenuBrowser />
      </Section>
    </>
  );
}
