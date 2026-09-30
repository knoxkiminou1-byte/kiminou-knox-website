// STAGING COPY — kiminou-knox-website rebuild canvas.
//
// Rebuild step 1: the particle-portrait hero, ported from the static concept
// site. Routes/pages come next per the agreed order:
// hero → /books → /speaking → /press → /sports → /contact → court/craft toggle.
//
// The site ships with indexing disabled (noindex + X-Robots-Tag) until the
// rebuild is finished and promoted. Production stays untouched until then.

import ParticleHero from "./components/ParticleHero";

export default function App() {
  return (
    <main id="main" aria-label="Rebuild canvas">
      <ParticleHero />
    </main>
  );
}
