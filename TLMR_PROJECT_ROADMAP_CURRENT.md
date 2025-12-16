# TLMR SEO Optimization Project - Updated Roadmap

## Status Overview

**Completed:** Internal linking, Sanity schemas, GraphQL, frontend components (95% dev complete)  
**In Progress:** Bilkher testing, drag & drop blocks implementation  
**Next Priority:** List page template, then final testing phase  
**Standby:** Google Reviews (waiting client OAuth)  
**Timeline:** Testing this week, ready for deployment mid-December

---

## PHASE 1: Sanity CMS Schema Updates ✅ COMPLETED

### Step 1.1: Article Schema - SEO Fields ✅

**Status:** Implemented

**Completed:**

- Added `customTitle`, `customH1`, `metaDescription`, `canonicalUrl` in collapsible SEO fieldset
- Character validation working (60 chars for title, 155-160 for meta)
- All fields tested in Sanity Studio

### Step 1.2: Money Page Schema ✅

**Status:** Implemented

**Completed:**

- Complete Money Page document type with:
  - Basic info (title, slug)
  - SEO fields (customTitle, customH1, metaDescription, canonicalUrl)
  - Main content (Portable Text with table support)
  - FAQ section array
  - Related specialties (array of references to other Money Pages)
  - Google Reviews toggle
  - Dynamic update date toggle
  - Custom HTML block with conditional display

### Step 1.3: CTA Section Document Schema ✅

**Status:** Implemented

**Completed:**

- Reusable CTA library system
- Can be referenced in Portable Text
- Primary/secondary variants matching e-services page style

### Step 1.4: Team Member Schema 💤

**Status:** Schema exists but NOT USED (budget constraint)

**Current Implementation:**

- ✅ **Hard-coded section** with 2 profiles: Henri de La Motte Rouge + Jean-Philippe Touati
- ✅ Static content, no CMS management
- ✅ No dynamic team member data to save budget

**⚠️ Clarification needed from client:**

- Should we display 2 or 3 profiles? (Question asked to Bilkher)
- If 3: add Myriam Hertz as third profile
- Implementation remains hard-coded regardless

**Future Enhancement (if budget allows):**

- Could activate hidden Team Member schema for dynamic CMS management
- Would require additional budget discussion
- For now: keeping it simple with hard-coded HTML

### Step 1.5: List Page Schema 🔄

**Status:** ⏭️ NEXT PRIORITY - Requirements now clarified

**Clarified Structure (per Bilkher feedback Dec 11):**

```
[Hero/Header]
↓
[Main editorial content zone - Portable Text]
↓
[Grid of article boxes - Auto-populated from category]
```

**What needs to be done:**

1. Create `listPage` schema in Sanity with:

   - Title, slug, SEO fields (same as Money Page/Article)
   - Category reference (to filter articles)
   - Main content zone (Portable Text)
   - Article display settings (cards per row, limit, etc.)

2. Create Gatsby template `/src/templates/list-page.js`:

   - Query all articles matching category
   - Render content zones in correct order
   - Display article grid with pagination if needed

3. Update gatsby-node.js to generate list pages

**Priority:** After drag & drop implementation, before final testing phase

---

## PHASE 2: Gatsby Frontend - GraphQL Queries ✅ COMPLETED

### Step 2.1: Article Queries Updated ✅

**Status:** Implemented

**Completed:**

- All new SEO fields added to GraphQL queries
- Article template uses `customH1` with fallback to `title`
- Meta tags properly populated

### Step 2.2: SEO Component Created ✅

**Status:** Implemented

**Completed:**

- Reusable SEO component at `/src/components/SEO.js`
- Handles: title, meta description, canonical, Open Graph, Twitter cards
- Integrated in Money Page and Article templates

### Step 2.3: Money Page Template - Complete ✅

**Status:** Implemented

**Completed:**

- Full Money Page template at `/src/templates/money-page.js`
- GraphQL query fetching all schema fields
- gatsby-node.js entries for page generation
- All components integrated (see Phase 3)

---

## PHASE 3: Frontend Components ✅ COMPLETED

### Step 3.1: Breadcrumb Component ✅

**Status:** Fully Implemented

**Completed:**

- Component at `/src/components/seo/Breadcrumb.js`
- Schema.org BreadcrumbList structured data
- Grid-based layout, positioned below nav bar
- Ellipsis truncation for long titles
- **Updated per Bilkher request:** First breadcrumb now shows "Cabinet TLMR : avocats à Paris" instead of "Accueil"
- **Editable from Sanity** for future adjustments
- **Integrated in BOTH Money Pages AND Article templates**

### Step 3.2: FAQ Component ✅

**Status:** Fully Implemented

**Completed:**

- Accordion FAQ at `/src/components/seo/FAQSection.js`
- Schema.org FAQPage markup
- Expand/collapse functionality
- Renders Portable Text answers with internal linking support

### Step 3.3: CTA Components ✅

**Status:** Fully Implemented

**Completed:**

- **Sticky Mobile Bottom:** Fixed button at bottom, hides in footer, text "Réservez un rendez-vous avec un avocat"
- **Sticky Lateral Desktop:** Right-side fixed block with phone, CTA button, Google rating
- **Header CTA:** Always visible in navigation (doesn't hide on scroll per design requirements)
- **CTASection component:** Matches e-services page styling (primary/secondary variants)
- **Inline CTAs:** Can be inserted in Portable Text content via CTA library

**CTA Strategy by Page Type:**

- **Money Pages:** Header + Mobile sticky bottom + Desktop lateral sticky
- **Article Pages:** Header only (focus on internal linking to Money Pages)
- **Homepage:** Header + potential hero CTA (not sticky)

**Design Feedback (Dec 11):**

- Bilkher noted CTAs might be "un peu discret" from UX perspective
- Client preference: maintain minimalist luxury aesthetic (Hermès-style)
- Decision: Awaiting Julie/Henri validation on whether to increase color contrast
- Currently: Maintaining design coherence with existing site aesthetic

### Step 3.4: Related Specialties Block ✅

**Status:** Fully Implemented

**Completed:**

- Grid display of 3+ related Money Pages
- Links to other expertises
- Styled card layout
- Dynamic from Sanity references

### Step 3.5: Team Section ✅

**Status:** Implemented as hard-coded HTML

**Current Implementation:**

- ✅ Hard-coded section with 2 profiles:
  - Henri de La Motte Rouge
  - Jean-Philippe Touati
- ✅ Highlights expertise AND accessibility (their "unfair advantage" per Bilkher)
- ✅ Based on visual reference provided by Bilkher (screenshot received Dec 11)

**⚠️ Pending Clarification:**

- Waiting confirmation from Bilkher: 2 or 3 profiles?
- If 3: add Myriam Hertz as third profile
- Implementation remains hard-coded (no CMS) due to budget constraints

**Future Enhancement (if budget allows):**

- Could activate hidden Team Member schema
- Display team member cards with photos and bios
- Link to individual profile pages
- Requires additional budget discussion

### Step 3.6: Dynamic Update Text ✅

**Status:** Fully Implemented

**Completed:**

- Shows "Page mise à jour en [mois] [année]"
- Auto-updates based on current date
- French month names

### Step 3.7: Custom HTML Block ✅

**Status:** Fully Implemented

**Completed:**

- Conditional rendering based on `enableCustomHTML` toggle
- Secure dangerouslySetInnerHTML implementation
- For tracking scripts or special integrations

### Step 3.8: Table Support in Portable Text ✅

**Status:** Fully Implemented

**Completed:**

- Table type added to Portable Text schema
- Proper rendering in frontend
- Styled for readability

---

## PHASE 4: Technical SEO Optimizations ✅ MOSTLY COMPLETED

### Step 4.1: Lazy Loading Images ✅

**Status:** Complete (Gatsby native)

**Completed:**

- gatsby-plugin-image handles lazy loading by default
- All images use GatsbyImage component
- Progressive loading implemented

### Step 4.2: Sitemap Generation ✅

**Status:** Complete

**Completed:**

- gatsby-plugin-sitemap configured
- Auto-generates on build including all Money Pages and Articles
- To be submitted to Google Search Console by client after launch

### Step 4.3: Robots.txt ✅

**Status:** Complete

**Completed:**

- gatsby-plugin-robots-txt configured
- Proper crawling rules set
- Points to sitemap.xml

### Step 4.4: Open Graph Images ✅

**Status:** Complete

**Completed:**

- SEO component includes OG image handling
- Fallback to default site OG image
- Proper meta tags for social sharing (LinkedIn focus per client requirements)

### Step 4.5: Internal Linking in Portable Text ✅

**Status:** ✅ COMPLETED (Dec 11, 2025)

**What was implemented:**

1. **Sanity blockContent schema updated:**

```javascript
marks: {
  annotations: [
    {
      name: "internalLink",
      type: "object",
      title: "Internal Link",
      fields: [
        {
          name: "reference",
          type: "reference",
          title: "Reference",
          to: [{ type: "moneyPage" }, { type: "article" }],
        },
      ],
    },
  ];
}
```

2. **Gatsby serializer for internal links added:**

```javascript
// In BlockContent serializers
marks: {
  internalLink: ({ mark, children }) => {
    const slug = mark.reference?.slug?.current;
    const type = mark.reference?._type;

    let path = "/";
    if (type === "moneyPage") path = `/expertises/${slug}`;
    if (type === "article") path = `/blog/${slug}`;

    return <Link to={path}>{children}</Link>;
  };
}
```

3. **Integration points:**

- ✅ Money Page main content
- ✅ Article body content
- ✅ FAQ answers (already support Portable Text)

**Why this was critical (⭐⭐⭐⭐⭐):**

- Essential for SEO internal linking strategy
- Enables contextual linking from articles to Money Pages
- Allows cross-linking between Money Pages
- Required per SEO audit requirements

---

## PHASE 5: CMS Enhancements 🔄 IN PROGRESS

### Step 5.1: Sanity Studio Organization ✅

**Status:** Complete

**Completed:**

- Document types well organized
- Helpful descriptions throughout schemas
- Intuitive field grouping with collapsible SEO sections

### Step 5.2: Field Validations ✅

**Status:** Complete

**Completed:**

- Character limits on SEO fields (60 for title, 155-160 for meta)
- Required field validations
- Max length warnings
- Helpful placeholder text throughout

### Step 5.3: Image Upload Guidance ✅

**Status:** Complete

**Completed:**

- 400KB limit documented in field descriptions
- Clear guidance provided to users during upload
- Note: Full enforcement requires custom input component (future enhancement if needed)

### Step 5.4: Drag & Drop Block Reordering 🔄

**Status:** ⚠️ TO IMPLEMENT - Requested Dec 11, 2025

**Request from Bilkher:**

> "Question : y'a-t-il possibilité d'ajuster les blocs, en changeant l'ordre par exemple ?"

**Response:** Oui, on va le faire.

**What needs to be done:**

**For Money Pages:**

1. Restructure content blocks as array in schema:

```javascript
{
  name: 'contentBlocks',
  title: 'Content Blocks',
  type: 'array',
  of: [
    { type: 'block' },           // Regular Portable Text
    { type: 'faqSection' },      // FAQ Block
    { type: 'relatedSpecialties' }, // Related Pages
    { type: 'teamSection' },     // Team Block
    { type: 'ctaSection' },      // CTA Block
    { type: 'customHTML' }       // Custom HTML
  ]
}
```

2. Update Money Page template to:

- Map through contentBlocks array
- Render each block type with appropriate component
- Maintain proper styling/spacing between blocks

3. Benefits:

- Users can drag & drop blocks in any order
- Add multiple blocks of same type if needed
- Full flexibility for content structure

**Estimated time:** 4-6 hours
**Priority:** High - improves UX significantly

---

## PHASE 6: Google My Business Integration 💤 STANDBY

### Step 6.1: Google Reviews API Setup ⚠️ **BLOCKED - WAITING CLIENT INFO**

**Status:** Ready to implement, waiting for:

**Received:**

- ✅ Google Business link: `https://share.google/4uWVW1mv345pak1Qb`

**Still needed from client:**

- ❌ Email admin of GMB account (for API permissions if needed)
- ❌ OAuth authorization (client will receive request to approve)

**Next steps when info received:**

1. Extract Place ID from provided link
2. Set up Google Places API project in Google Cloud Console
3. Create Netlify function at `/netlify/functions/google-reviews.js`
4. Configure environment variables:
   - `GOOGLE_PLACE_ID`
   - `GOOGLE_PLACES_API_KEY`
5. Test API connection
6. Implement caching (1 hour) to minimize API calls

### Step 6.2: GoogleReviews Component ✅

**Status:** Component structure created, waiting for API

**Completed:**

- Component at `/src/components/seo/GoogleReviews.js`
- Schema.org AggregateRating markup ready
- UI layout complete (rating stars, review count, sample reviews)
- Will connect to Netlify function once API is set up

**Display:**

- Rating (e.g., 4.8/5)
- Total review count
- 3 most recent reviews
- Structured data for SEO

---

## PHASE 7: Testing & Optimization 🔄 IN PROGRESS

### Step 7.1: Full SEO & Functionality Testing ⭐⭐⭐⭐⭐

**Status:** Bilkher currently testing staging environment

**Prerequisites for testing:**

- [x] Internal linking implementation complete
- [x] Bilkher has staging access
- [x] Sample Money Page created with all features

**SEO Technical Checklist:**

- [ ] All pages have unique `<title>` tags (max 60 chars, starts with keyword)
- [ ] All pages have unique meta descriptions (155-160 chars)
- [ ] Single H1 per page
- [ ] Canonical URLs present and correct
- [ ] Breadcrumbs visible with Schema.org markup (Money Pages + Articles)
  - [ ] First breadcrumb shows "Cabinet TLMR : avocats à Paris" instead of "Accueil"
- [ ] FAQ Schema.org FAQPage validates ([Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Open Graph tags complete (title, description, image)
- [ ] LinkedIn preview displays correctly
- [ ] Sitemap.xml generates correctly at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

**Conversion Elements Checklist:**

- [ ] **Mobile:** Sticky bottom CTA visible, hides when footer appears
- [ ] **Desktop:** Sticky lateral CTA on right side, appears after hero scroll
- [ ] **Both:** Header CTA always visible, doesn't hide on scroll
- [ ] CTA design: Validate if current discretion level is acceptable or needs more contrast
- [ ] FAQ accordion expands/collapses correctly
- [ ] Related specialties display (minimum 3 links)
- [ ] Team section displays 2 profiles (Henri + Jean-Philippe) with expertise highlighted
- [ ] Google reviews section placeholder ready (will populate when API connected)

**Content & Functionality Checklist:**

- [ ] Breadcrumbs display on Money Pages: `Cabinet TLMR : avocats à Paris > Expertises > [Page Name]`
- [ ] Breadcrumbs display on Articles: `Cabinet TLMR : avocats à Paris > Blog > [Category] > [Article]`
- [ ] Internal links work correctly in Portable Text content
- [ ] Internal links properly resolve for both Money Pages and Articles
- [ ] Dynamic update date shows current month/year
- [ ] Custom HTML blocks render when enabled
- [ ] Tables display correctly in content
- [ ] Inline CTAs render from CTA library
- [ ] All fields save correctly in Sanity Studio

**Performance Checklist:**

- [ ] Images lazy load properly
- [ ] No images exceed 400KB
- [ ] PageSpeed Insights score (mobile) > 75
- [ ] Core Web Vitals acceptable:
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

**Feedback received Dec 11:**

- ✅ Drag & drop functionality requested - added to Phase 5.4
- ✅ CTA discretion noted - awaiting Julie/Henri validation on contrast
- ✅ Team section format validated - implementing with 2 profiles
- ✅ Breadcrumb text updated as requested
- ⏳ List page structure clarified - implementing as Phase 7.2

### Step 7.2: Cross-Browser Testing ⭐⭐⭐

**Status:** Execute after Bilkher validation + drag & drop implementation

**Test on:**

- Chrome (desktop & mobile)
- Safari (desktop & iOS)
- Firefox (desktop)
- Edge (desktop)

**Focus areas:**

- Sticky CTA behavior (mobile bottom + desktop lateral)
- Header CTA always visible (doesn't hide on scroll)
- FAQ accordion functionality
- Image loading and lazy loading
- Layout integrity across breakpoints
- Breadcrumb display with new text
- Internal linking navigation
- Block reordering (once drag & drop implemented)

### Step 7.3: Performance Optimization ⭐⭐

**Status:** Execute after functionality validated

**Actions:**

- Run Lighthouse audit on staging
- Identify bottlenecks
- Optimize remaining images if needed
- Verify Gatsby build optimizations
- Check for unused dependencies
- Test on 3G network simulation

**Target metrics:**

- Lighthouse Performance: > 85
- Lighthouse SEO: 100
- Lighthouse Accessibility: > 90

---

## PHASE 8: Content & Training 📋 FOR LATER

### Step 8.1: First Money Page Creation ⭐⭐⭐

**Status:** Ready once Bilkher approves templates

**Current situation:**

- Content in validation at TLMR (per client email)
- Bilkher testing staging environment
- First page: "Avocat e-réputation Paris" ready to migrate

**Process:**

1. Client provides finalized content
2. Create first Money Page in Sanity Studio
3. Verify all features work with real content
4. Use as template example for training

### Step 8.2: CMS Training Documentation ⭐⭐⭐⭐

**Status:** Create after successful testing

**Document should cover:**

- How to create a Money Page step-by-step
- How to reorder content blocks (drag & drop)
- SEO fields best practices (keyword in title, meta description tips)
- How to add FAQ items with internal links
- How to link related specialties
- How to use inline CTAs
- How to add internal links in content
- Image optimization guidelines (400KB max)
- How to preview pages before publishing

### Step 8.3: Live Training Session ⭐⭐⭐⭐⭐

**Status:** Schedule after Bilkher approval

**Format:** 1-hour video call with screen sharing  
**Attendees:** Julie, Henri, content team  
**Topics:**

- Sanity Studio walkthrough
- Creating Money Page live demo
- Block reordering demonstration
- SEO fields explanation
- FAQ best practices
- Internal linking strategy
- Q&A session

**Deliverable:** Recording for future reference

### Step 8.4: Bulk Content Creation ⭐⭐⭐⭐

**Status:** Client starts after training

**Goal:** Create 47 Money Pages for different expertises

**Support:**

- Monitor first 5 pages closely
- Answer questions promptly
- Verify SEO implementation
- Check performance with growing content

---

## PHASE 9: Deployment & Launch 🚀 FOR LATER

### Step 9.1: Pre-Launch Checklist ⭐⭐⭐⭐⭐

**Status:** Execute when all testing passes

**Code:**

- [ ] All components tested and approved
- [ ] Drag & drop functionality working in production Sanity Studio
- [ ] No console errors or warnings
- [ ] Gatsby build succeeds without errors
- [ ] GraphQL queries optimized
- [ ] All environment variables documented

**SEO:**

- [ ] All Schema.org markup validates
- [ ] Sitemap includes all pages
- [ ] Robots.txt configured correctly
- [ ] Meta tags complete on all pages
- [ ] Canonical tags correct
- [ ] Breadcrumb first item shows "Cabinet TLMR : avocats à Paris"

**Content:**

- [ ] At least 5 Money Pages published as samples
- [ ] 404 page styled and functional
- [ ] Contact form working

**Performance:**

- [ ] Lighthouse scores acceptable
- [ ] Images optimized
- [ ] Lazy loading verified
- [ ] Core Web Vitals passing

**Integrations:**

- [ ] Google Reviews API working (if client info received)
- [ ] Netlify functions deployed
- [ ] Environment variables set in production

### Step 9.2: Staging Review & Approval ⭐⭐⭐⭐

**Status:** In progress - Bilkher testing this week

**Actions:**

1. Bilkher completes full SEO audit on staging
2. Client reviews design and functionality
3. Final adjustments based on feedback (drag & drop, list template)
4. Sign-off from Henri/Julie

### Step 9.3: Production Deployment ⭐⭐⭐⭐⭐

**Status:** Target mid-December 2025

**Deployment process:**

1. Backup current production site
2. Deploy Sanity schemas to production Studio
3. Deploy Gatsby build to production hosting
4. Verify all environment variables
5. Test critical paths on production
6. Monitor for errors (Sentry, logs)

**Post-deployment immediate checks:**

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms submit successfully
- [ ] No 404 errors
- [ ] Sticky CTAs function on mobile and desktop
- [ ] Header CTA always visible
- [ ] Block reordering works in production Sanity
- [ ] Internal links navigate correctly
- [ ] Google Analytics tracking (if configured)

### Step 9.4: Post-Launch Actions ⭐⭐⭐

**Status:** Week 1 after production

**Actions:**

- Submit sitemap to Google Search Console
- Verify Google Search Console ownership
- Set up performance monitoring
- Watch for 404 errors in GSC
- Monitor PageSpeed scores
- Check for crawl errors

**Support:**

- Daily monitoring first 3 days
- Respond to urgent issues within 4 hours
- Answer client questions promptly
- Performance check after 7 days

---

## CURRENT PROJECT STATUS SUMMARY

### ✅ Completed (95% of development)

1. **Sanity Schemas:** Money Page, Article, SEO fields, CTA library
2. **GraphQL:** All queries for Money Pages and Articles
3. **Frontend Components:**
   - Breadcrumb (with updated "Cabinet TLMR : avocats à Paris" text)
   - FAQ with internal linking support
   - CTAs (sticky mobile/desktop/header)
   - Related Specialties
   - Team Section (hard-coded 2 profiles)
   - Update Date
   - Custom HTML
   - Tables
4. **SEO Infrastructure:** Sitemap, Robots.txt, Open Graph, Schema.org markup
5. **Performance:** Lazy loading, image optimization
6. **Internal Linking:** Full implementation in Portable Text ✅ NEW

### 🔄 In Progress

1. **Testing Phase:** Bilkher currently testing staging
2. **Drag & Drop Blocks:** To implement this week

### ⏭️ Next Priority

1. **List Page Template:** Structure clarified, ready to implement after drag & drop
2. **Final Testing:** Complete Phase 7 checklists
3. **Client Approval:** Final sign-off from Julie/Henri

### 💤 On Standby

1. **Google Reviews:** Waiting for client OAuth authorization
2. **Team Member Schema:** Exists but not used - hard-coded implementation instead

### ⚠️ Pending Clarifications

1. **Team Section:** Confirm if 2 or 3 profiles (currently implementing 2: Henri + Jean-Philippe)
2. **CTA Design:** Client to validate if current discretion level acceptable or needs more contrast

### 🚫 Removed from Scope

1. **Markdown Import Tool:** Over-engineered, not requested, removed due to budget
2. **Dynamic Team Member CMS:** Replaced with hard-coded HTML to save budget

---

## IMMEDIATE NEXT STEPS (Priority Order)

### This Week (Dec 11-15):

1. **🔄 Implement Drag & Drop Block Reordering** (Phase 5.4)

   - Restructure Money Page content as array of blocks
   - Update template to render blocks dynamically
   - Test reordering functionality in Sanity Studio
   - **Estimated time:** 4-6 hours
   - **Priority:** HIGH - Requested by Bilkher

2. **⏭️ Create List Page Template** (Phase 1.5 + Phase 7)

   - Create listPage schema with clarified structure
   - Build Gatsby template
   - Update gatsby-node.js
   - Test with sample category
   - **Estimated time:** 6-8 hours
   - **Priority:** HIGH - Next major feature

3. **🧪 Support Bilkher Testing** (Phase 7)

   - Respond to feedback promptly
   - Fix any issues discovered
   - Validate SEO implementation
   - **Timeline:** Ongoing this week

4. **⚠️ Resolve Pending Clarifications**
   - Team section: 2 or 3 profiles?
   - CTA design: current discretion acceptable?
   - **Action:** Follow up with Bilkher/Julie/Henri

### Next Week (Dec 16-20):

5. **✅ Final Testing & Approval**

   - Complete all Phase 7 checklists
   - Cross-browser testing
   - Performance optimization
   - Client review and sign-off
   - **Timeline:** After steps 1-2 complete

6. **🎓 Training & Content Creation** (Phase 8)

   - Create documentation
   - Schedule training call
   - Support initial content creation
   - **Timeline:** After client approval

7. **🚀 Production Launch** (Phase 9)
   - Deploy to production
   - Post-launch monitoring
   - GSC submission
   - **Target:** Mid-December 2025

### Ongoing:

8. **📧 Google Reviews Follow-up**
   - Client needs to provide OAuth authorization
   - Extract Place ID from provided link
   - Set up API once authorized
   - **Timeline:** Waiting on client response

---

## DECISIONS & CLARIFICATIONS LOG

### Dec 11, 2025 - Bilkher Feedback Session:

**Requests Received:**

1. ✅ **Drag & drop block reordering** - To implement (Phase 5.4)
2. ✅ **CTA visibility concern** - Noted as "un peu discret", awaiting client validation
3. ✅ **Team section format** - Validated with 2 profiles (Henri + Jean-Philippe)
4. ✅ **Breadcrumb text** - Updated to "Cabinet TLMR : avocats à Paris"
5. ✅ **List page structure** - Clarified: content zone BEFORE article grid

**Pending Clarifications:**

- Team section: Final confirmation on 2 vs 3 profiles
- CTA design: Whether to increase contrast/visibility

### Earlier Decisions:

**Budget Constraints Impact:**

1. **Team Member profiles:** Hard-coded instead of CMS-managed
2. **Markdown import tool:** Removed - not requested, over-engineered
3. **List page template:** Initially on standby, now clarified and prioritized

**CTA Strategy Finalized:**

- **Money Pages:** Full conversion setup (header + mobile sticky + desktop lateral)
- **Articles:** Header only, focus on internal linking to Money Pages
- **Homepage:** Header + optional hero CTA

**Design Philosophy:**

- Maintain minimalist luxury aesthetic (Hermès-style)
- Discrete but effective conversion elements
- No bold colors that "break" the design
- Client has final say on any contrast adjustments

**Technical Decisions:**

- **Breadcrumb:** Same component for Money Pages and Articles
- **Internal linking:** Fully implemented in Portable Text ✅
- **Google Reviews:** API approach via Netlify function (secure, cached)
- **Block reordering:** To be implemented as array-based content blocks

---

## KEY DOCUMENTS & REFERENCES

- `Money_pages_content` - Feature requirements from SEO expert
- `Tableau_des_taches_de_développement` - Task priorities (⭐⭐⭐⭐⭐ = critical)
- `Checklist_SEO_Tech___conversion` - Technical SEO audit baseline
- `Notes_Réunion_de_cadrage` - Meeting notes with client decisions (Nov 10, 2025)
- `10 nov. 2025 Point SEO - SITE TLMR - Transcription` - Full meeting transcript
- `Devis_Optimisation_SEO_Site_TLMR.pdf` - Project scope and €2,160 TTC budget
- **Dec 11 Bilkher Feedback** - Latest requirements and clarifications

---

## PROJECT TIMELINE

- **Started:** November 24, 2025
- **Current Week:** Week 3 (Dec 11-15) - Testing + Final features
- **Next Week:** Week 4 (Dec 16-20) - Final testing + Training
- **Target Launch:** December 15-20, 2025
- **Status:** ✅ On track with drag & drop + list page to complete

---

## BUDGET TRACKING

**Original Budget:** €2,160 TTC
**Current Scope:** Within budget
**Savings Achieved:**

- Team member CMS → Hard-coded HTML
- Removed markdown import tool
- Efficient implementation of core features

**Current Status:** ✅ All planned features deliverable within budget

---

_Last updated: December 11, 2025 - 15:00_
_Roadmap version: 2.1 (Bilkher feedback integration + status updates)_
