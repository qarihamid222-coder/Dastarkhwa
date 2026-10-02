import type { ReactNode } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

const make = (paths: ReactNode) =>
  function Icon({ className }: { className?: string }) {
    return (
      <svg {...base} className={className}>
        {paths}
      </svg>
    );
  };

export const IconLeaf = make(<><path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15" /><path d="M5 19c3-5 6-8 10-10" /></>);
export const IconFlame = make(<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z" />);
export const IconCheck = make(<><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16 9.5" /></>);
export const IconHeart = make(<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />);
export const IconPin = make(<><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>);
export const IconPhone = make(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
export const IconChat = make(<path d="M4 5h16v11H9l-5 4z" />);
export const IconClock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconMail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>);
export const IconBag = make(<><path d="M5 8h14l-1 12H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></>);
export const IconMenu = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const IconClose = make(<path d="M6 6l12 12M18 6 6 18" />);
export const IconPlus = make(<path d="M12 5v14M5 12h14" />);
export const IconMinus = make(<path d="M5 12h14" />);
export const IconTrash = make(<><path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13" /></>);
export const IconSocial = make(<><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>);
export const IconCup = make(<><path d="M6 5h12l-1.4 14a2 2 0 0 1-2 1.8H9.4a2 2 0 0 1-2-1.8z" /><path d="M7 10h10" /><path d="M13 5l2-3" /></>);
