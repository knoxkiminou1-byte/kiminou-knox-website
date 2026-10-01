import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
const PageHero3D = lazy(() => import("@/components/LuxuryFX/PageHero3D"));
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConstellationTimeline from "@/components/ConstellationTimeline";
import SplitNarrative from "@/components/SplitNarrative";
import { CANONICAL_BOOK_TITLES, CATALOG_EDITION_NOTE } from "@/content/authorProfile";
import { KIMINOU_IMAGES } from "@/lib/kiminouMedia";
import { breadcrumbSchema, personSchema, SITE_URL } from "@/lib/seo";

const Radiograph = lazy(() => import("@/components/LuxuryFX/Radiograph"));
const TypewriterArchaeology = lazy(() => import("@/components/LuxuryFX/TypewriterArchaeology"));

export default function About() {
  const officialHeadshotUrl = `${SITE_URL}${KIMINOU_IMAGES.officialHeadshot.src}`;
  const outdoorPortraitUrl = `${SITE_URL}${KIMINOU_IMAGES.outdoorPortrait.src}`;

  // Shared Person schema from seo.ts — keeps About and the rest of the site in sync
  const baseSchema = personSchema();

  // Extend the shared schema with the About-page WebPage node
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...baseSchema["@graph"],
      {
        "@type": "WebPage",
        "@id": "https://www.kiminouknox.com/about#webpage",
        "url": "https://www.kiminouknox.com/about",
        "name": "About Kiminou Knox — Author, Athlete, Speaker",
        "description": "Learn about Kiminou Knox — Bay Area raised, New Orleans based author and poet of ten books, host of KimYaps, Director at AAFC, and youth speaker.",
        "isPartOf": { "@id": "https://www.kiminouknox.com/#website" },
        "about": { "@id": "https://www.kiminouknox.com/#person" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": outdoorPortraitUrl,
          "name": KIMINOU_IMAGES.outdoorPortrait.title,
          "caption": KIMINOU_IMAGES.outdoorPortrait.caption,
          "width": KIMINOU_IMAGES.outdoorPortrait.width,
          "height": KIMINOU_IMAGES.outdoorPortrait.height
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>About Kiminou Knox — Author and Poet | Bay Area Raised, New Orleans Based</title>
        <meta name="description" content="Kiminou Knox is a Bay Area raised, New Orleans based author and poet with ten published books. Host of KimYaps. Director at AAFC. Creator of the Black Boy Lie universe." />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href="https://www.kiminouknox.com/about" />
        
        <meta property="og:type" content="profile" />
        <meta property="og:profile:first_name" content="Kiminou" />
        <meta property="og:profile:last_name" content="Knox" />
        <meta property="og:title" content="About Kiminou Knox — Author and Poet" />
        <meta property="og:description" content="Bay Area raised, New Orleans based author and poet with ten published books. Host of KimYaps. Director at AAFC." />
        <meta property="og:url" content="https://www.kiminouknox.com/about" />
        <meta property="og:image" content={outdoorPortraitUrl} />
        <meta property="og:site_name" content="Kiminou Knox" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KnoxKiminou" />
        <meta name="twitter:title" content="About Kiminou Knox — Author and Poet" />
        <meta name="twitter:description" content="Bay Area raised, New Orleans based author and poet with ten published books. Host of KimYaps. Director at AAFC." />
        <meta name="twitter:image" content={outdoorPortraitUrl} />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "About", url: `${SITE_URL}/about` },
            ]),
          )}
        </script>
      </Helmet>

      <Header />

      <main id="main-content" className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative mb-12 flex min-h-[300px] items-end overflow-hidden">
            {/* Contained foreground 3D band behind the title (glass frame). */}
            <Suspense fallback={null}>
              <PageHero3D variant="about" />
            </Suspense>
            <h1 className="relative z-10 text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="about-heading">
              About
            </h1>
          </div>

          <div className="mb-12 grid gap-6 overflow-hidden border border-border bg-card md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[420px] bg-muted">
              <img
                src={KIMINOU_IMAGES.outdoorPortrait.src}
                alt={KIMINOU_IMAGES.outdoorPortrait.alt}
                width={KIMINOU_IMAGES.outdoorPortrait.width}
                height={KIMINOU_IMAGES.outdoorPortrait.height}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">Bay Area Voice</p>
              <h2 className="mb-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Writer, athlete, and builder in one frame.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The same discipline behind the books shows up on the court, in youth work, and in the public voice Kiminou Knox is building from the Bay Area outward.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-foreground leading-relaxed text-lg">
              <p data-testid="about-intro">
                I am a writer and athlete from the Bay Area, California, telling stories that carry faith, grit, and love. I attended Ygnacio Valley High School, Cristo Rey De La Salle, and Bishop O'Dowd — three schools, three different chapters, all part of the same story. Through books, poems, and youth work, I try to say the things that usually go unsaid.
              </p>

              <p data-testid="about-stats">
                I am the author of ten books and the Top Essay Winner at the 2025 Miles Hall Foundation Breaking Barriers Youth Summit. I scored 1380 on the SAT while maintaining excellence in both athletics and creative writing.
              </p>

              <p data-testid="about-family">
                My family serves as my compass. I am the son of Rashida Knox, a Bay Area marketer and singer whose standard for what good work looks like I carry into everything I do. My grandmother, Dr. Faye McNair Knox, ran One East Palo Alto as its executive director. She showed me what service actually looks like.
              </p>

              <p data-testid="about-work">
                On the page, I explore Black boy life, love, and becoming through verse and narrative. On the court, I play forward and center, bringing the same discipline to both arenas. The principles remain constant: show up, do the work, leave every space better than you found it.
              </p>

              <div data-testid="about-books">
                <p>Kiminou Knox is the author of ten published books:</p>
                <ol className="mt-4 grid gap-2 pl-6 sm:grid-cols-2">
                  {CANONICAL_BOOK_TITLES.map((title) => <li key={title}>{title}</li>)}
                </ol>
                <p className="mt-4 text-base text-muted-foreground">{CATALOG_EDITION_NOTE}</p>
                <p className="mt-4">I am building a universe that weaves together poems, stories, essays, visual media, and live performance.</p>
              </div>

              <p data-testid="about-speaking">
                As a speaker, I address craft, discipline, voice, and the cost of silence. I work with teams, schools, and community organizations.
              </p>

              <p data-testid="about-closing" className="font-medium">
                That is where I am right now. If something here connects, reach out.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Radiograph />
      </Suspense>

      <SplitNarrative />
      <ConstellationTimeline />

      <Suspense fallback={null}>
        <TypewriterArchaeology />
      </Suspense>

      <Footer />
    </>
  );
}
