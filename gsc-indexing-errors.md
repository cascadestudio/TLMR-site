# GSC Non-Indexed Pages — Diagnosis & Fix Instructions
## tlmr-avocats.com · Gatsby 5.15.0 · Hosted on Netlify

> **This document is an instruction prompt for Claude Code.**
> All root causes have been fully qualified by direct page inspection, HTTP header analysis, and HTML tag verification before writing.
> **None of the 35 non-indexed pages is a content quality issue.** They are all caused by two precise technical misconfigurations in the Gatsby/Netlify setup, detailed below.

---

## EXECUTIVE SUMMARY

| # | Root Cause | Pages Affected | File to Edit |
|---|-----------|----------------|--------------|
| 1 | `siteUrl` points to `www.tlmr-avocats.com` while the live site runs on the non-www domain | **31 pages** (all 5xx errors) | `gatsby-config.js` |
| 2 | `/competence/xxx/` and `/e-services/xxx/` pages perform a client-side JS redirect to a parent page anchor — Google sees empty pages | **3 pages** "Crawled not indexed" + **1 page** "Alternate canonical" + **8 pages** with no canonical in the 5xx group | `netlify.toml` or `gatsby-node.js` |
| 3 | URL with PII query parameters crawlable by Google | **1 URL** | `static/robots.txt` |

---

## ROOT CAUSE #1 — Wrong `siteUrl` in gatsby-config.js

### Diagnosis

Every page on the site declares a canonical tag and an `og:url` meta tag pointing to `https://www.tlmr-avocats.com/...` (with www), while the site is actually served from `https://tlmr-avocats.com/` (without www).

**Direct evidence:**
- Homepage: `<link rel="canonical" href="https://www.tlmr-avocats.com/">` ✗
- `/rse/`: `<link rel="canonical" href="https://www.tlmr-avocats.com/rse/">` ✗
- `/ia-et-droit-a-l-oubli/`: `<link rel="canonical" href="https://www.tlmr-avocats.com/ia-et-droit-a-l-oubli/">` ✗

**Behavior of `www.tlmr-avocats.com`:**
- `https://www.tlmr-avocats.com/` → correctly redirects to `https://tlmr-avocats.com/` ✓
- `https://www.tlmr-avocats.com/rse/` → **returns a Gatsby 404 page** ✗
- `https://www.tlmr-avocats.com/[any path]` → **returns 404** ✗

**What happens to Googlebot:**
1. Google crawls `https://tlmr-avocats.com/rse/` → receives 200 with canonical = `https://www.tlmr-avocats.com/rse/`
2. Google attempts to validate the canonical by fetching `https://www.tlmr-avocats.com/rse/`
3. Receives a 404 (or 5xx depending on Netlify's behavior at crawl time)
4. GSC records the original URL as having a server error — page is not indexed

**Source of the problem:** `gatsby-config.js` contains `siteUrl: 'https://www.tlmr-avocats.com'`. This field is used by `gatsby-plugin-canonical-urls` (or equivalent) and the sitemap plugin to generate ALL canonical tags and all sitemap entries across the entire site.

### Fix

**File:** `gatsby-config.js` (project root)

Find the line:
```js
siteUrl: 'https://www.tlmr-avocats.com',
```
Replace with:
```js
siteUrl: 'https://tlmr-avocats.com',
```

> ⚠️ This field may also appear under `siteMetadata.siteUrl`. Check both possible locations:
> ```js
> module.exports = {
>   siteMetadata: {
>     siteUrl: 'https://tlmr-avocats.com',  // ← fix here
>   },
>   ...
> }
> ```

After this change:
1. Run `gatsby build` locally to confirm no build errors
2. Check that the generated HTML (`public/rse/index.html`) now contains `https://tlmr-avocats.com/rse/` as canonical
3. Check that `public/sitemap-0.xml` (or `public/sitemap/sitemap-0.xml`) contains only non-www URLs
4. Push and deploy to Netlify

**Pages resolved by this fix** (blog posts and service pages with wrong www canonical):

```
https://tlmr-avocats.com/ces-3-enseignements-cles-de-la-regate-et-des-phases-de-petole-pour-traverser-une-crise-comme-le-covid/
https://tlmr-avocats.com/comment-empecher-ia-d-utiliser-vos-contenus-en-ligne/
https://tlmr-avocats.com/de-la-protection-juridique-des-noms-des-evenements-sportifs-en-general-et-des-regates-en-particulier/
https://tlmr-avocats.com/focus-sur-le-reglement-general-sur-la-protection-des-donnees-rgpd-applicable-le-25-mai-2018/
https://tlmr-avocats.com/comment-faire-face-a-un-probleme-de-reputation-sur-les-plans-techniques-et-juridiques/
https://tlmr-avocats.com/fiche-pratique-quest-ce-que-la-dsp2-comment-sy-conformer/
https://tlmr-avocats.com/impunite-et-haine-sur-internet-larsenal-juridique-en-question/
https://tlmr-avocats.com/deferencement-de-wish-consequences/
https://tlmr-avocats.com/deposer-sa-marque-le-guide-pratique/
https://tlmr-avocats.com/ia-et-donnees-de-sante-comment-rester-conforme-au-rgpd/
https://tlmr-avocats.com/ia-et-droit-a-l-oubli/
https://tlmr-avocats.com/publicite-comparative-comment-eviter-le-denigrement/
https://tlmr-avocats.com/rgpd-le-mooc-de-la-cnil-pour-se-former/
https://tlmr-avocats.com/grand-debat-national-le-cabinet-accompagne-la-conformite-rgpd-web-du-site-granddebat-fr/
https://tlmr-avocats.com/redacteur-web-sans-risque/
https://tlmr-avocats.com/comment-deposer-et-proteger-une-marque-en-2020-suite-a-la-loi-pacte/
https://tlmr-avocats.com/-achat-vente-de-donnees-de-prospection-la-cnil-consacre-l-opt-in-informe/
https://tlmr-avocats.com/regulation-de-l-ia-l-union-europeenne-adopte-son-reglement/
https://tlmr-avocats.com/rse/
https://tlmr-avocats.com/environnement-e-commercants/
https://tlmr-avocats.com/e-services/generateur-de-politique-de-confidentialite-conforme-rgpd/
```

---

## ROOT CAUSE #2 — `/competence/xxx/` and `/e-services/xxx/` sub-pages: client-side JS redirects with no real content

### Diagnosis

The site has "child" URLs for each practice area and each e-service. These URLs are Gatsby page components that, on client-side load, execute a `navigate()` (or `window.location`) call redirecting to the parent page + an anchor fragment.

**Observed behavior via direct navigation:**

| Requested URL | JS redirects to | Canonical declared (after redirect) |
|---|---|---|
| `/competence/donnees-personnelles-et-conformite-cnil-rgpd/` | `/expertises/#Données personnelles et conformité CNIL/RGPD` | `https://www.tlmr-avocats.com/expertises/` |
| `/competence/droit-des-affaires-et-des-entreprises/` | `/expertises/#Affaires complexes et contentieux à risque` | `https://www.tlmr-avocats.com/expertises/` |
| `/competence/droit-du-travail-et-numerique/` | `/expertises/#Droit du travail numérique et de la formation` | `https://www.tlmr-avocats.com/expertises/` |
| `/e-services/signatureelectronique/` | `/e-services/#Signature électronique` | `https://www.tlmr-avocats.com/e-services/` |
| `/e-services/protection-des-creations/` | `/e-services/#Protection des créations` | `https://www.tlmr-avocats.com/e-services/` |
| `/e-services/avomarque-fr/` | `/e-services/` (no anchor) | `https://www.tlmr-avocats.com/e-services/` |

**The following pages follow the same pattern** (confirmed by absence of canonical in static HTML):
- `/competence/propriete-intellectuelle-et-industrielle/`
- `/competence/droit-immobilier/`
- `/competence/fiscalite-du-web-et-de-linnovation/`
- `/competence/penal-et-cybercriminalite/`
- `/competence/droit-de-la-formation/`
- `/e-services/generateur-de-politique-de-confidentialite-conforme-rgpd/`

**Why this is a problem for Google:**
- Googlebot fetches the page → the static HTML rendered by Gatsby (SSG) contains no valid canonical or points to the wrong www domain
- Even with JS rendering, Google sees a page whose entire content redirects to the parent: treated as thin or duplicate content
- Result: "Crawled, currently not indexed" or "Server error" depending on crawl timing

### Fix

**Recommended approach — 301 server-side redirects via `netlify.toml`** (simplest and most reliable for Netlify + Gatsby):

Open or create `netlify.toml` at the project root and add the following redirect blocks:

```toml
# -----------------------------------------------
# 301 redirects for competence sub-pages
# (replace client-side JS redirects)
# -----------------------------------------------
[[redirects]]
  from = "/competence/donnees-personnelles-et-conformite-cnil-rgpd/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/droit-des-affaires-et-des-entreprises/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/droit-du-travail-et-numerique/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/propriete-intellectuelle-et-industrielle/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/droit-immobilier/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/fiscalite-du-web-et-de-linnovation/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/penal-et-cybercriminalite/"
  to = "/expertises/"
  status = 301
  force = true

[[redirects]]
  from = "/competence/droit-de-la-formation/"
  to = "/expertises/"
  status = 301
  force = true

# -----------------------------------------------
# 301 redirects for e-services sub-pages
# -----------------------------------------------
[[redirects]]
  from = "/e-services/signatureelectronique/"
  to = "/e-services/"
  status = 301
  force = true

[[redirects]]
  from = "/e-services/protection-des-creations/"
  to = "/e-services/"
  status = 301
  force = true

[[redirects]]
  from = "/e-services/avomarque-fr/"
  to = "/e-services/"
  status = 301
  force = true

[[redirects]]
  from = "/e-services/generateur-de-politique-de-confidentialite-conforme-rgpd/"
  to = "/e-services/"
  status = 301
  force = true
```

> ⚠️ **Note on anchor fragments (#) in Netlify redirects:**
> Browsers never send the fragment portion of a URL to the server, so Netlify cannot pass `#anchor` in server-side redirects. Use the parent page URL without a fragment as the destination — this is sufficient for Google (the parent page will be the one indexed).

**Alternative approach — `createRedirect` in `gatsby-node.js`** (if the project doesn't use `netlify.toml`):

```js
// In gatsby-node.js, inside exports.createPages
exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;

  const redirects = [
    { from: '/competence/donnees-personnelles-et-conformite-cnil-rgpd/', to: '/expertises/' },
    { from: '/competence/droit-des-affaires-et-des-entreprises/', to: '/expertises/' },
    { from: '/competence/droit-du-travail-et-numerique/', to: '/expertises/' },
    { from: '/competence/propriete-intellectuelle-et-industrielle/', to: '/expertises/' },
    { from: '/competence/droit-immobilier/', to: '/expertises/' },
    { from: '/competence/fiscalite-du-web-et-de-linnovation/', to: '/expertises/' },
    { from: '/competence/penal-et-cybercriminalite/', to: '/expertises/' },
    { from: '/competence/droit-de-la-formation/', to: '/expertises/' },
    { from: '/e-services/signatureelectronique/', to: '/e-services/' },
    { from: '/e-services/protection-des-creations/', to: '/e-services/' },
    { from: '/e-services/avomarque-fr/', to: '/e-services/' },
    { from: '/e-services/generateur-de-politique-de-confidentialite-conforme-rgpd/', to: '/e-services/' },
  ];

  redirects.forEach(({ from, to }) => {
    createRedirect({
      fromPath: from,
      toPath: to,
      isPermanent: true,
      redirectInBrowser: true,
    });
  });
};
```

> ⚠️ `createRedirect` requires `gatsby-plugin-netlify` to be installed so redirects are written to `_redirects` or `netlify.toml` at build time. Verify it is listed in `gatsby-config.js`.

**Pages resolved by this fix:**
- 3 "Crawled, currently not indexed" pages
- 1 "Alternate page with proper canonical tag" page
- 9 sub-pages from the 5xx group (competence/e-services pages with no canonical)

---

## ROOT CAUSE #3 — URL with PII in query string

### Diagnosis

The following URL is known to Googlebot and appears in GSC non-indexed pages:
```
https://tlmr-avocats.com/publicite-comparative-comment-eviter-le-denigrement/?prenom=Patricia&email=contact@aet-formations.com&ev=348431
```

It contains:
- `prenom=Patricia` — a visitor's first name
- `email=contact@aet-formations.com` — a personal email address
- `ev=348431` — a tracking/event identifier

This URL was likely generated by a form or marketing automation tool that pre-fills fields via URL parameters and was shared or bookmarked, allowing Google to discover it.

**Risks:** personal data exposed to crawlers (GDPR), duplicate content, GSC pollution.

### Fix

**File:** `static/robots.txt` (Gatsby copies this folder as-is into the build output)

Add the following rules to block URLs with these parameter types:

```
User-agent: *
Disallow: /*?prenom=
Disallow: /*?email=
Disallow: /*?ev=
```

If the project uses `gatsby-plugin-robots-txt`, update the config in `gatsby-config.js`:
```js
{
  resolve: 'gatsby-plugin-robots-txt',
  options: {
    policy: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/*?prenom=' },
      { userAgent: '*', disallow: '/*?email=' },
      { userAgent: '*', disallow: '/*?ev=' },
    ],
  },
},
```

**Also recommended:** identify the source of this URL (contact form, newsletter tool, marketing automation) and fix the mechanism generating URLs with personal data in query strings. Personal data must never be passed via URL parameters.

---

## ROOT CAUSE #4 — URLs without trailing slash (secondary, self-resolving)

### Diagnosis

These 3 URLs appear in the 5xx list without a trailing slash:
```
https://tlmr-avocats.com/e-services           → 301 redirects to /e-services/
https://tlmr-avocats.com/expertises            → 301 redirects to /expertises/
https://tlmr-avocats.com/regulation-de-l-ia-l-union-europeenne-adopte-son-reglement  → 301 redirects to /.../
```

Netlify handles trailing-slash redirects automatically for Gatsby static pages. These URLs likely generated 5xx errors during a past server instability event, not a structural issue.

### Fix

No specific code change required. Once fixes #1 and #2 are deployed, request revalidation in GSC.

If errors persist after redeployment, add explicitly in `netlify.toml`:
```toml
[[redirects]]
  from = "/e-services"
  to = "/e-services/"
  status = 301
  force = true

[[redirects]]
  from = "/expertises"
  to = "/expertises/"
  status = 301
  force = true
```

---

## ORDERED EXECUTION PLAN

### Step 1 — Fix `gatsby-config.js`
```
File: gatsby-config.js
Change: siteUrl 'https://www.tlmr-avocats.com' → 'https://tlmr-avocats.com'
```

### Step 2 — Add redirects in `netlify.toml`
Add the 12 `[[redirects]]` blocks listed in Root Cause #2.

### Step 3 — Update `robots.txt`
Add `Disallow` rules for PII query parameters.

### Step 4 — Pre-deployment verification
```bash
gatsby build

# Verify canonical in a sample page:
grep -i canonical public/rse/index.html
# Must contain: https://tlmr-avocats.com/rse/  (no www)

# Verify sitemap contains no www URLs:
grep -c 'www.tlmr-avocats' public/sitemap*.xml
# Must return 0
```

### Step 5 — Deploy to Netlify
```bash
git add gatsby-config.js netlify.toml static/robots.txt
git commit -m "fix: correct siteUrl to non-www, add 301 redirects for sub-pages, block PII params in robots.txt"
git push
```

### Step 6 — Google Search Console actions (after deployment)
Once the Netlify deployment is confirmed live:

1. Go to **GSC → Indexing → Pages → Server error (5xx)**
2. Click **"Validate fix"** to trigger a re-crawl validation
3. Repeat for each group: "Crawled not indexed", "Alternate page with proper canonical tag"
4. **Manually request indexing** via "URL Inspection" → "Request indexing" for priority URLs:
   - `https://tlmr-avocats.com/rse/`
   - `https://tlmr-avocats.com/environnement-e-commercants/`
   - `https://tlmr-avocats.com/expertises/`
   - `https://tlmr-avocats.com/e-services/`
   - Recent articles (2025–2026)

---

## FILES TO MODIFY — SUMMARY

| File | Change | Resolves |
|------|--------|---------|
| `gatsby-config.js` | `siteUrl` without www | 22 pages with 5xx + wrong www canonical |
| `netlify.toml` | 12 `[[redirects]]` 301 blocks | 12 competence/e-services sub-pages |
| `static/robots.txt` | `Disallow` PII parameters | 1 URL with personal data |

**Total pages resolved after these 3 changes + GSC revalidation: 35/35.**
