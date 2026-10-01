import { AUTHOR_SEARCH_DESCRIPTION, AUTHOR_SHORT_BIO } from "@/content/authorProfile";

export const SITE_NAME = "Kiminou Knox";
export const SITE_URL = "https://www.kiminouknox.com";
export const SITE_DESCRIPTION = AUTHOR_SEARCH_DESCRIPTION;
export const SITE_IMAGE = "https://www.kiminouknox.com/og-image.png";
export const SITE_PERSON_IMAGE =
  "https://www.kiminouknox.com/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg";
export const SITE_TWITTER = "@KnoxKiminou";
export const SITE_FEED = "https://www.kiminouknox.com/rss.xml";
export const SITE_MEDIUM_PROFILE = "https://medium.com/@knoxkiminou1";
export const SITE_GOODREADS_PROFILE =
  "https://www.goodreads.com/author/show/55621683.Kiminou_Knox";
export const SITE_PODCAST_APPLE = "https://podcasts.apple.com/us/podcast/kimyaps/id1850364308";
export const SITE_PODCAST_SPOTIFY = "https://open.spotify.com/show/4TB8QKI52yaGIFDOCCkrYg";
export const SITE_PODCAST_AMAZON =
  "https://music.amazon.com/podcasts/3db7d37c-3071-4eba-9fea-cadc50f5c543/kimyaps";
export const SITE_PODCAST_RSS = "https://api.riverside.fm/hosting/Qs2CJYe0.rss";
export const SITE_YOUTUBE = "https://www.youtube.com/@KiminouKnoxOfficial";
export const SITE_TIKTOK = "https://www.tiktok.com/@kiminou.knox";
export const SITE_X = "https://x.com/KnoxKiminou";
export const SITE_LINKEDIN = "https://www.linkedin.com/in/kiminou-knox-50691a394/";
export const SITE_AMAZON_AUTHOR = "https://www.amazon.com/author/kiminou";
export const SITE_ABOUT_ME = "https://about.me/kiminou";
export const SITE_WIKIDATA = "https://www.wikidata.org/wiki/Q137260299";

export const SITE_SOCIAL_LINKS = [
  { label: "Twitter / X", href: SITE_X },
  { label: "YouTube", href: SITE_YOUTUBE },
  { label: "TikTok", href: SITE_TIKTOK },
  { label: "LinkedIn", href: SITE_LINKEDIN },
  { label: "Medium", href: SITE_MEDIUM_PROFILE },
  { label: "Goodreads", href: SITE_GOODREADS_PROFILE },
  { label: "Amazon Author Store", href: SITE_AMAZON_AUTHOR },
  { label: "KimYaps on Apple Podcasts", href: SITE_PODCAST_APPLE },
  { label: "KimYaps on Spotify", href: SITE_PODCAST_SPOTIFY },
  { label: "KimYaps on Amazon Music", href: SITE_PODCAST_AMAZON },
  { label: "About.me", href: SITE_ABOUT_ME },
] as const;

export const SITE_SAME_AS = [
  ...SITE_SOCIAL_LINKS.map(({ href }) => href),
  "https://www.maxpreps.com/ca/concord/ygnacio-valley-wolves/athletes/kiminou-knox/?careerid=3flsq42m4bpcc",
  "https://www.ncsasports.org/mens-basketball-recruiting/california/concord/ygnacio-valley-high-school/kiminou-knox",
  SITE_WIKIDATA,
];

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        alternateName: "Kiminou",
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          url: SITE_PERSON_IMAGE,
          caption: "Kiminou Knox — official author headshot 2026",
        },
        jobTitle: ["Author", "Athlete", "Speaker", "Podcast Host"],
        description: AUTHOR_SHORT_BIO,
        birthPlace: {
          "@type": "Place",
          name: "Bay Area, California",
        },
        homeLocation: {
          "@type": "Place",
          name: "Bay Area, California",
        },
        height: {
          "@type": "QuantitativeValue",
          value: 80,
          unitCode: "INH",
        },
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Ygnacio Valley High School",
          },
          {
            "@type": "EducationalOrganization",
            name: "Cristo Rey De La Salle",
          },
          {
            "@type": "EducationalOrganization",
            name: "Bishop O'Dowd High School",
          },
        ],
        knowsAbout: [
          "Poetry",
          "Basketball",
          "Football",
          "Creative writing",
          "Public speaking",
          "Faith",
          "Black boyhood",
          "Youth leadership",
          "Publishing",
          "Bay Area literature",
          "Podcasting",
          "Mental health advocacy",
        ],
        award: "Top Essay Winner — Miles Hall Foundation Breaking Barriers Youth Summit (February 2025)",
        sameAs: SITE_SAME_AS,
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${SITE_NAME} — Official Site`,
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function podcastSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": `${SITE_URL}/#podcast`,
    name: "KimYaps",
    description:
      "KimYaps is a podcast by Kiminou Knox — honest conversations about navigating pain, finding purpose, and giving yourself (and others) a little extra grace.",
    url: `${SITE_URL}/podcast`,
    webFeed: SITE_PODCAST_RSS,
    sameAs: [SITE_PODCAST_APPLE, SITE_PODCAST_SPOTIFY, SITE_PODCAST_AMAZON, SITE_YOUTUBE],
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
    image: SITE_PERSON_IMAGE,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
