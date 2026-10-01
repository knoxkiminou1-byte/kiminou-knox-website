import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME, SITE_IMAGE, SITE_TWITTER } from "@/lib/seo";

/**
 * Route-level head tags for the SPA.
 *
 * Crawlers get the static prerender (view-source): per-route title,
 * description, canonical, and JSON-LD are baked into the served HTML.
 * Once the app hydrates, main.tsx removes those static tags and Helmet
 * becomes the single owner — so client-side navigation can't leave stale
 * titles, descriptions, or canonicals behind (that was the empty-title bug).
 *
 * robots: noindex while on staging (vercel.app). Flips to index
 * automatically on the production domain — no code change at launch.
 * The static prerender files stay noindex until the launch build.
 */
export default function Seo({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : SITE_IMAGE;
  const robots =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("vercel.app")
      ? "noindex, nofollow"
      : "index, follow";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
