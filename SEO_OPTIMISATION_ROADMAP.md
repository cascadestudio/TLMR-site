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

1. **Team Section:** Confirm 2 or 3 profiles - Currently CMS-managed (dynamic count based on core team members in Sanity)
2. **CTA Design:** Client to validate if current discretion level is acceptable or needs more contrast (noted as "un peu discret" by Bilkher)

**Note:** Header CTA visibility clarified ✅ - Navigation visibility behavior is approved and working as expected.

---

## TESTING PHASE (In Progress)

### SEO Technical Checklist ✅ COMPLETED

- [x] All pages have unique `<title>` tags (max 60 chars)
- [x] All pages have unique meta descriptions (155-160 chars)
- [x] Single H1 per page
- [x] Canonical URLs present and correct
- [x] Breadcrumbs visible with Schema.org markup
- [x] FAQ Schema.org FAQPage validates
- [x] Open Graph tags complete
- [x] Sitemap.xml generates correctly (plugin installed)
- [x] Robots.txt accessible (plugin installed)

**Audit Report:** See [SEO_AUDIT_REPORT.md](./SEO_AUDIT_REPORT.md) for complete verification details.

### Conversion Elements Checklist ✅ COMPLETED

- [x] Mobile: Sticky bottom CTA visible, hides when footer appears
- [x] Desktop: Sticky lateral CTA on **left** side (shows after 300px scroll)
- [x] Header Contact CTA always visible ✅ **APPROVED** (tested and confirmed working)
- [x] FAQ accordion expands/collapses correctly
- [x] Related specialties display (3+ cards in responsive grid)
- [x] Team section displays profiles (CMS-managed, dynamic count)

**Audit Report:** See [CONVERSION_ELEMENTS_AUDIT.md](./CONVERSION_ELEMENTS_AUDIT.md) for complete verification details.

**⚠️ Remaining Clarification:**
- **CTA Discretion:** Awaiting Julie/Henri validation on whether to increase contrast/visibility (noted as "un peu discret" by Bilkher).

### Content & Functionality Checklist ✅ COMPLETED

- [x] Breadcrumbs display correctly on Money Pages and Articles
- [x] Internal links work in Portable Text content
- [x] Dynamic update date shows current month/year
- [x] Custom HTML blocks render when enabled
- [x] Tables display correctly
- [x] Inline CTAs render from CTA library
- [x] Category pages show filtered articles
- [x] Block reordering works in Sanity Studio

**Audit Report:** See detailed verification report below.

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

---

## POST-PRODUCTION TASKS

### Immediate (First 24 Hours)

**SEO Configuration:**
- [ ] Submit sitemap to Google Search Console
  - URL: `https://www.tlmr-avocats.com/sitemap-index.xml`
  - Verify ownership if not already done
  - Monitor indexing status
- [ ] Verify robots.txt is accessible
  - URL: `https://www.tlmr-avocats.com/robots.txt`
  - Confirm sitemap reference is correct
- [ ] Submit site to Bing Webmaster Tools (optional but recommended)

**Validation:**
- [ ] Test all Money Pages with [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Verify BreadcrumbList markup
  - Verify FAQPage markup
- [ ] Test social sharing on LinkedIn
  - Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
  - Verify image, title, description display correctly
  - Test with sample Money Page URL
- [ ] Verify all Schema.org markup with [Schema Validator](https://validator.schema.org/)

**Monitoring Setup:**
- [ ] Set up Google Search Console email alerts
  - Coverage issues
  - Manual actions
  - Security issues
- [ ] Set up uptime monitoring (optional)
  - Options: UptimeRobot, Pingdom, or similar
  - Alert if site goes down
- [ ] Verify Google Analytics tracking (if configured)
  - Check real-time data
  - Verify events fire correctly

### Week 1 (Days 1-7)

**SEO Monitoring:**
- [ ] Check Google Search Console daily
  - Review Coverage report
  - Check for crawl errors
  - Monitor indexing progress
- [ ] Verify sitemap processing
  - GSC > Sitemaps section
  - Check submitted vs indexed pages
  - Address any errors
- [ ] Monitor search appearance
  - Check if rich results appear
  - Verify breadcrumbs display in SERPs
  - Check FAQ rich snippets

**Performance:**
- [ ] Run Lighthouse audit on production
  - Target: SEO score 100
  - Target: Performance > 85
  - Target: Accessibility > 90
- [ ] Test Core Web Vitals
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1
- [ ] Run PageSpeed Insights on 3-5 key pages
  - Homepage
  - 2-3 Money Pages
  - 1 Article page
- [ ] Test on real devices
  - iPhone (Safari)
  - Android phone (Chrome)
  - Desktop (Chrome, Firefox, Safari)

**Conversion Tracking:**
- [ ] Verify all CTAs link correctly
  - Mobile sticky bottom
  - Desktop lateral sticky
  - Header Contact link
  - Inline CTAs
- [ ] Test contact form submissions
  - Verify emails received
  - Check spam folder
  - Test validation
- [ ] Monitor analytics for CTA clicks (if tracking set up)

### Week 2-4 (Days 8-30)

**SEO Optimization:**
- [ ] Review indexed pages in GSC
  - Identify pages not indexed
  - Check for duplicate content issues
  - Address canonical problems if any
- [ ] Monitor search queries
  - GSC > Performance report
  - Identify top queries
  - Check CTR for top pages
- [ ] Check for 404 errors
  - GSC > Coverage > Excluded
  - Fix broken internal links
  - Set up redirects if needed

**Content Strategy:**
- [ ] Create remaining Money Pages
  - Target: 47 total pages (per project scope)
  - Follow CMS training guidelines
  - Ensure internal linking between pages
- [ ] Optimize existing content
  - Add internal links between Money Pages
  - Link from Articles to Money Pages
  - Use anchor text strategically
- [ ] Create FAQ content
  - Add FAQs to relevant Money Pages
  - Use natural language questions
  - Include internal links in answers

**Technical Monitoring:**
- [ ] Weekly Lighthouse audits
  - Track performance trends
  - Address any regressions
  - Document improvements
- [ ] Monitor page load times
  - Use GSC > Core Web Vitals report
  - Identify slow pages
  - Optimize if needed
- [ ] Check image optimization
  - Verify all images < 400KB
  - Check lazy loading works
  - Optimize large images if found

### Month 2-3 (Days 31-90)

**SEO Analysis:**
- [ ] Analyze search performance
  - Review GSC Performance report
  - Identify top-performing pages
  - Identify pages needing improvement
- [ ] Check backlink profile
  - Use GSC > Links report
  - Monitor new backlinks
  - Disavow spammy links if necessary
- [ ] Review Mobile Usability
  - GSC > Mobile Usability report
  - Fix any mobile issues
  - Test on multiple devices

**Content Expansion:**
- [ ] Analyze top search queries
  - Identify content gaps
  - Create new Money Pages for high-volume queries
  - Update existing pages with missing keywords
- [ ] Optimize underperforming pages
  - Pages with high impressions but low CTR
  - Improve title tags and meta descriptions
  - Add more relevant content
- [ ] Build internal linking strategy
  - Create hub pages linking to related Money Pages
  - Add contextual links from Articles
  - Use pillar content strategy

**Conversion Optimization:**
- [ ] A/B test CTA variations (if needed)
  - Test more prominent CTAs vs current discrete design
  - Monitor conversion rates
  - Implement winning variant
- [ ] Analyze user behavior
  - Use analytics heatmaps (if available)
  - Identify drop-off points
  - Optimize user flow
- [ ] Test different CTA copy
  - Button text variations
  - Heading variations
  - Measure impact on conversions

**Google Reviews Integration:**
- [ ] Complete Google Reviews API setup
  - Once client provides OAuth authorization
  - Extract Place ID: `https://share.google/4uWVW1mv345pak1Qb`
  - Set up Netlify function
  - Test on staging
  - Deploy to production
- [ ] Monitor review display
  - Verify reviews fetch correctly
  - Check caching works (1 hour)
  - Test Schema.org AggregateRating markup
- [ ] Encourage review collection
  - Add review request in email signatures
  - Follow up with satisfied clients
  - Monitor review count and rating

### Ongoing Maintenance

**Monthly Tasks:**
- [ ] Review GSC Performance report
  - Analyze traffic trends
  - Identify opportunities
  - Address issues
- [ ] Check for technical SEO issues
  - Crawl errors
  - Indexing problems
  - Mobile usability
  - Core Web Vitals
- [ ] Update content
  - Refresh outdated Money Pages
  - Add new FAQs
  - Create new Articles for internal linking
- [ ] Backup content
  - Export Sanity content
  - Backup Gatsby codebase
  - Document custom configurations

**Quarterly Tasks:**
- [ ] Comprehensive SEO audit
  - Full technical SEO review
  - Content quality assessment
  - Backlink analysis
  - Competitor analysis
- [ ] Performance review
  - Compare KPIs to baseline
  - Revenue from organic traffic
  - Contact form submissions
  - Phone call tracking
- [ ] Strategy adjustment
  - Based on quarterly data
  - Adjust keyword targets
  - Refine content strategy
  - Update conversion elements if needed

**Annual Tasks:**
- [ ] Major content refresh
  - Review all 47 Money Pages
  - Update statistics and data
  - Refresh old articles
  - Archive or 301 redirect obsolete pages
- [ ] Technical upgrade review
  - Update Gatsby and dependencies
  - Review and update plugins
  - Security audit
  - Performance optimization
- [ ] Strategic planning
  - Set new SEO goals
  - Plan content calendar
  - Budget for improvements
  - Review competitive landscape

---

## Success Metrics to Track

**SEO Metrics:**
- Organic traffic (sessions, users, pageviews)
- Keyword rankings (track top 20 target keywords)
- Pages indexed (target: all pages in sitemap)
- Average position in search results
- Click-through rate (CTR) from search
- Impressions in search results

**Conversion Metrics:**
- Contact form submissions
- Phone calls from site (if tracking enabled)
- CTA click rate (mobile sticky, desktop lateral, inline)
- Bounce rate (target: < 60%)
- Pages per session (target: > 2)
- Average session duration (target: > 2 minutes)

**Technical Metrics:**
- Core Web Vitals scores
- PageSpeed Insights scores
- Mobile vs desktop traffic ratio
- Lighthouse scores (SEO, Performance, Accessibility)
- Server response time
- Image optimization rate

**Business Metrics:**
- Qualified leads from organic search
- Conversion rate from visitor to lead
- Cost per acquisition (organic)
- ROI compared to paid advertising
- Case signups attributed to SEO

---

## Troubleshooting Common Issues

**Pages Not Indexing:**
1. Check robots.txt isn't blocking
2. Verify sitemap is valid
3. Check for noindex tags
4. Request indexing in GSC
5. Check for technical errors (5xx, 4xx)

**Low Search Rankings:**
1. Analyze competing pages
2. Improve content quality and depth
3. Build internal links
4. Optimize title tags and headings
5. Get quality backlinks

**Poor Mobile Performance:**
1. Optimize images
2. Reduce JavaScript
3. Implement lazy loading
4. Minimize CSS
5. Use CDN

**Low Conversion Rate:**
1. A/B test CTA designs
2. Improve CTA copy
3. Simplify contact form
4. Add social proof
5. Test different CTA placements

**Core Web Vitals Issues:**
1. LCP issues: Optimize images, improve server response time
2. FID issues: Reduce JavaScript execution time
3. CLS issues: Set image dimensions, avoid layout shifts

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

_Last updated: December 17, 2025_
