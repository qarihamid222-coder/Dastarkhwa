import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { MobileActionBar } from "./ContactButtons";

export function Layout() {
  const { t } = useI18n();
  return (
    <>
      <a href="#main" className="skip-link">
        {t("nav.skip")}
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<p className="loading" role="status">{t("common.loading")}</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
