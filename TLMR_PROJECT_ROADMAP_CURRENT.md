# TLMR SEO Optimization Project - Roadmap

## Status Overview

**Development:** 100% Complete
**Testing:** In Progress (Bilkher testing staging)
**On Standby:** Google Reviews (waiting client OAuth)
**Target Launch:** Mid-December 2025

---

## COMPLETED FEATURES

### Phase 1: Sanity CMS Schemas ✅

- **Article Schema:** SEO fields (customTitle, customH1, metaDescription, canonicalUrl)
- **Money Page Schema:** Full document type with drag & drop content blocks
- **Category Page Schema:** List page template for article categories
- **CTA Section Document:** Reusable CTA library system
- **Team Member Schema:** Exists but not used (hard-coded instead for budget)

### Phase 2: GraphQL & Gatsby ✅

- All SEO fields added to GraphQL queries
- Article template with SEO support
- Money Page template with all blocks
- Category Page template with article grid
- gatsby-node.js configured for all page types

### Phase 3: Frontend Components ✅

- **Breadcrumb:** Schema.org markup, "Cabinet TLMR : avocats à Paris" as first item
- **FAQ Section:** Accordion with Schema.org FAQPage markup
- **CTA Components:**
  - Sticky Mobile Bottom (hides near footer)
  - Sticky Lateral Desktop (left side)
  - Header CTA (always visible)
  - CTASection (inline, primary/secondary variants)
- **Related Specialties Block:** Grid of linked Money Pages
- **Team Section:** Hard-coded 2 profiles (Henri + Jean-Philippe)
- **Dynamic Update Date:** "Page mise à jour en [mois] [année]"
- **Custom HTML Block:** Conditional rendering for scripts
- **Table Support:** In Portable Text content

### Phase 4: Technical SEO ✅

- Lazy loading images (Gatsby native)
- Sitemap generation (gatsby-plugin-sitemap)
- Robots.txt (gatsby-plugin-robots-txt)
- Open Graph images & meta tags
- Internal linking in Portable Text (Money Pages + Articles)

### Phase 5: CMS Enhancements ✅

- Sanity Studio organization with collapsible fieldsets
- Field validations (character limits, required fields)
- Image upload guidance (400KB limit documented)
- **Drag & Drop Block Reordering:** Money Page mainContent is an array supporting reorder of all block types

### Phase 6: Category/List Pages ✅

- Schema: `category.js` with SEO fields + mainContent
- Template: Hero → Editorial content → Article grid (filtered by category)
- gatsby-node.js generates pages at `/{slug}`

---

## ON STANDBY

### Google Reviews API (Phase 6)

**Status:** Waiting for client OAuth authorization

**Have:**
- Google Business link: `https://share.google/4uWVW1mv345pak1Qb`
- GoogleReviews component structure ready

**Need from client:**
- Email admin of GMB account
- OAuth authorization approval

**When received:**
1. Extract Place ID from link
2. Set up Google Places API in Google Cloud Console
3. Create Netlify function `/netlify/functions/google-reviews.js`
4. Configure environment variables
5. Connect component to API

---

## PENDING CLARIFICATIONS

1. **Team Section:** Confirm 2 or 3 profiles (currently 2: Henri + Jean-Philippe). If 3, add Myriam Hertz.
2. **CTA Design:** Client to validate if current discretion level is acceptable or needs more contrast (noted as "un peu discret" by Bilkher)

---

## TESTING PHASE (In Progress)

### SEO Technical Checklist

- [ ] All pages have unique `<title>` tags (max 60 chars)
- [ ] All pages have unique meta descriptions (155-160 chars)
- [ ] Single H1 per page
- [ ] Canonical URLs present and correct
- [ ] Breadcrumbs visible with Schema.org markup
- [ ] FAQ Schema.org FAQPage validates
- [ ] Open Graph tags complete
- [ ] Sitemap.xml generates correctly
- [ ] Robots.txt accessible

### Conversion Elements Checklist

- [ ] Mobile: Sticky bottom CTA visible, hides when footer appears
- [ ] Desktop: Sticky lateral CTA on left side
- [ ] Header CTA always visible (doesn't hide on scroll)
- [ ] FAQ accordion expands/collapses correctly
- [ ] Related specialties display
- [ ] Team section displays 2 profiles

### Content & Functionality Checklist

- [ ] Breadcrumbs display correctly on Money Pages and Articles
- [ ] Internal links work in Portable Text content
- [ ] Dynamic update date shows current month/year
- [ ] Custom HTML blocks render when enabled
- [ ] Tables display correctly
- [ ] Inline CTAs render from CTA library
- [ ] Category pages show filtered articles
- [ ] Block reordering works in Sanity Studio

### Performance Checklist

- [ ] Images lazy load properly
- [ ] No images exceed 400KB
- [ ] PageSpeed Insights score (mobile) > 75
- [ ] Core Web Vitals acceptable (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Cross-Browser Testing

- Chrome (desktop & mobile)
- Safari (desktop & iOS)
- Firefox (desktop)
- Edge (desktop)

---

## NEXT STEPS

### This Week

1. **Support Bilkher Testing** - Respond to feedback, fix issues
2. **Resolve Pending Clarifications** - Team section count, CTA contrast
3. **Complete Testing Checklists**

### After Testing Approval

4. **Training & Documentation**
   - CMS training documentation
   - Live training session (1 hour video call)
   - Support initial content creation

5. **Production Deployment**
   - Deploy Sanity schemas to production
   - Deploy Gatsby build to production
   - Post-launch monitoring

6. **Post-Launch**
   - Submit sitemap to Google Search Console
   - Monitor for crawl errors
   - Performance check after 7 days

---

## PROJECT INFO

**Budget:** €2,160 TTC - Within budget
**Started:** November 24, 2025
**Target Launch:** December 15-20, 2025

**Key Documents:**
- Money_pages_content - Feature requirements
- Tableau_des_taches_de_développement - Task priorities
- Checklist_SEO_Tech___conversion - Technical SEO audit baseline

---

_Last updated: December 16, 2025_
