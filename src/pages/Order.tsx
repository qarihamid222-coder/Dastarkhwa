import { usePageMeta } from "../hooks/usePageMeta";
import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { OrderForm } from "../components/OrderForm";

export default function Order() {
  usePageMeta("Order Now", "Order your favourite biryani from Karachi Biryani Center for delivery or pickup.");
  return (
    <>
      <PageHero title="Order Now" intro="Choose your items, tell us how you'd like to receive them, and place your order." />
      <Section tone="cream">
        <OrderForm />
      </Section>
    </>
  );
}
