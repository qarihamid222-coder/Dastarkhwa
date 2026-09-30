import type { ReactNode } from "react";
import { IconFlame, IconHeart, IconLeaf, IconCheck } from "./Icons";

const reasons: { icon: ReactNode; title: string; text: string }[] = [
  { icon: <IconCheck />, title: "Authentic Taste", text: "Biryani inspired by the traditional flavours of Karachi." },
  { icon: <IconLeaf />, title: "Fresh Ingredients", text: "A focus on fresh ingredients and careful preparation." },
  { icon: <IconFlame />, title: "Flavorful Biryani", text: "Aromatic rice and a balanced blend of spices in every serving." },
  { icon: <IconHeart />, title: "Quality Service", text: "Friendly, respectful service for every guest." },
];

export function WhyChooseUs() {
  return (
    <ul className="features">
      {reasons.map((r) => (
        <li key={r.title} className="feature">
          <span className="feature__icon">{r.icon}</span>
          <h3>{r.title}</h3>
          <p>{r.text}</p>
        </li>
      ))}
    </ul>
  );
}
