import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const distRoot = path.join(repoRoot, "artifacts", "kiminou", "dist", "public");
const templatePath = path.join(distRoot, "index.html");
const routeManifestPath = path.join(distRoot, "seo-routes.json");

if (!fs.existsSync(templatePath)) {
  throw new Error(`[prerender] Missing build output: ${templatePath}`);
}

if (!fs.existsSync(routeManifestPath)) {
  throw new Error(`[prerender] Missing route manifest: ${routeManifestPath}`);
}

const template = fs.readFileSync(templatePath, "utf8");
const manifest = JSON.parse(fs.readFileSync(routeManifestPath, "utf8"));

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function safeJson(value) {
  return JSON.stringify(value).replace(/<\/script/gi, "<\\/script");
}

function routePathname(route) {
  return route === "/" ? "" : route.replace(/^\/+/, "").replace(/\/+$/, "");
}

function stripManagedHead(head) {
  const managed = [
    /<title[\s>]/i,
    /<meta\s+name=["']description["']/i,
    /<meta\s+name=["']robots["']/i,
    /<meta\s+name=["']theme-color["']/i,
    /<meta\s+(?:property|name)=["']og:/i,
    /<meta\s+(?:property|name)=["']twitter:/i,
    /<link\s+rel=["']canonical["']/i,
    /<link\s+rel=["']alternate["']/i,
    /<link\s+rel=["']manifest["']/i,
  ];

  return head
    .split("\n")
    .filter((line) => !managed.some((pattern) => pattern.test(line)))
    .join("\n")
    .trimEnd();
}

function pageSchemas(route) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${manifest.site.url}/#person`,
    name: manifest.site.name,
    alternateName: "Kiminou",
    url: manifest.site.url,
    image: manifest.site.personImage || `${manifest.site.url}/photos/kiminou-knox/kiminou-knox-official-author-headshot-2026.jpg`,
    jobTitle: ["Athlete", "Author", "Speaker", "Entrepreneur"],
    description: manifest.site.description,
    sameAs: manifest.site.sameAs,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${manifest.site.url}/#website`,
    url: manifest.site.url,
    name: manifest.site.name,
    description: manifest.site.description,
    inLanguage: "en",
    publisher: { "@id": `${manifest.site.url}/#person` },
  };

  return [personSchema, websiteSchema, ...(route.schemas || [])];
}

function renderHead(route) {
  const keywords = Array.isArray(route.keywords) ? route.keywords.join(", ") : "";
  const canonical = route.url;
  const image = route.image || manifest.site.image;

  return `    <title data-seo-static>${escapeHtml(route.title)}</title>
    <meta data-seo-static name="description" content="${escapeAttr(route.description)}">
    <meta data-seo-static name="robots" content="noindex, nofollow">
    <meta data-seo-static name="theme-color" content="#090705">
    ${keywords ? `<meta data-seo-static name="keywords" content="${escapeAttr(keywords)}">` : ""}
    <link data-seo-static rel="canonical" href="${escapeAttr(canonical)}">
    <link data-seo-static rel="alternate" type="application/rss+xml" title="Kiminou Knox Journal RSS" href="${manifest.site.url}/rss.xml">
    <link data-seo-static rel="alternate" type="application/atom+xml" title="Kiminou Knox Journal Atom" href="${manifest.site.url}/feed.xml">
    <link data-seo-static rel="manifest" href="/manifest.webmanifest">
    <meta data-seo-static property="og:type" content="${route.loc?.startsWith("/blog/") ? "article" : route.loc?.startsWith("/books/") ? "book" : "website"}">
    <meta data-seo-static property="og:url" content="${escapeAttr(canonical)}">
    <meta data-seo-static property="og:title" content="${escapeAttr(route.title)}">
    <meta data-seo-static property="og:description" content="${escapeAttr(route.description)}">
    <meta data-seo-static property="og:image" content="${escapeAttr(image)}">
    ${route.imageType ? `<meta data-seo-static property="og:image:type" content="${escapeAttr(route.imageType)}">` : ""}
    ${route.imageWidth ? `<meta data-seo-static property="og:image:width" content="${escapeAttr(route.imageWidth)}">` : ""}
    ${route.imageHeight ? `<meta data-seo-static property="og:image:height" content="${escapeAttr(route.imageHeight)}">` : ""}
    <meta data-seo-static property="og:image:alt" content="${escapeAttr(route.title)}">
    <meta data-seo-static name="twitter:card" content="summary_large_image">
    <meta data-seo-static name="twitter:url" content="${escapeAttr(canonical)}">
    <meta data-seo-static name="twitter:title" content="${escapeAttr(route.title)}">
    <meta data-seo-static name="twitter:description" content="${escapeAttr(route.description)}">
    <meta data-seo-static name="twitter:image" content="${escapeAttr(image)}">
    <style data-seo-static>
      .seo-prerender{min-height:100vh;background:#050505;color:#f6f0df;font-family:Inter,system-ui,sans-serif;padding:40px 24px}
      .seo-prerender a{color:#f5c542}.seo-prerender__wrap{max-width:920px;margin:0 auto}
      .seo-prerender h1{font-family:"Cormorant Garamond",serif;font-size:clamp(42px,8vw,92px);font-weight:400;line-height:.95;margin:48px 0 24px}
      .seo-prerender h2{font-family:"Cormorant Garamond",serif;font-size:32px;font-weight:400;margin:36px 0 10px}
      .seo-prerender p{font-size:18px;line-height:1.75;color:rgba(246,240,223,.78)}
      .seo-prerender nav{display:flex;flex-wrap:wrap;gap:16px;text-transform:uppercase;letter-spacing:.16em;font-size:12px}
    </style>
${pageSchemas(route)
  .map((schema) => `    <script data-seo-static type="application/ld+json">${safeJson(schema)}</script>`)
  .join("\n")}`;
}

function renderBody(route) {
  const heading = route.sections?.[0]?.heading || route.title;
  const links = [
    ["/", "Home"],
    ["/books", "Books"],
    ["/author", "Author"],
    ["/sports", "Sports"],
    ["/speaking", "Speaking"],
    ["/blog", "Blog"],
    ["/contact", "Contact"],
  ];

  return `
      <div class="seo-prerender" data-seo-prerender>
        <div class="seo-prerender__wrap">
          <nav aria-label="Primary">
            ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("\n            ")}
          </nav>
          <main id="main-content">
            <article>
              <h1>${escapeHtml(heading)}</h1>
              <p>${escapeHtml(route.description)}</p>
              ${(route.sections || [])
                .slice(1)
                .map(
                  (section) => `<section>
                <h2>${escapeHtml(section.heading)}</h2>
                <p>${escapeHtml(section.text)}</p>
              </section>`,
                )
                .join("\n              ")}
            </article>
          </main>
        </div>
      </div>`;
}

function renderHtml(route) {
  const htmlWithHead = template.replace(/<head>([\s\S]*?)<\/head>/i, (_match, head) => {
    return `<head>
${stripManagedHead(head)}
${renderHead(route)}
  </head>`;
  });

  return htmlWithHead.replace('<div id="root"></div>', `<div id="root">${renderBody(route)}\n    </div>`);
}

let written = 0;

for (const route of manifest.routes) {
  const pathname = routePathname(route.loc);
  const outputPath = pathname ? path.join(distRoot, pathname, "index.html") : templatePath;
  const cleanUrlOutputPath = pathname ? path.join(distRoot, `${pathname}.html`) : "";
  const html = renderHtml(route);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html, "utf8");
  written += 1;

  if (cleanUrlOutputPath) {
    fs.mkdirSync(path.dirname(cleanUrlOutputPath), { recursive: true });
    fs.writeFileSync(cleanUrlOutputPath, html, "utf8");
    written += 1;
  }
}

console.log(`[prerender] Wrote ${written} static SEO HTML files for ${manifest.routes.length} routes.`);
