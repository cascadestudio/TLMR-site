import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "components/Layout";
import Seo from "components/Seo";
import styled from "styled-components";
import Grid from "components/global/Grid";
import { PortableText } from "@portabletext/react";
import SanityImg from "gatsby-plugin-sanity-image";
import nbspPonctuation from "components/utils/nbspPonctuation";
import FAQSection from "components/Seo/FAQSection";
import RelatedSpecialties from "components/Seo/RelatedSpecialties";
import TeamSection from "components/Seo/TeamSection";
import CTASection from "components/Seo/CTASection";
import Breadcrumb from "components/Seo/Breadcrumb";
import GoogleReviews from "components/Seo/GoogleReviews";
import CTASticky from "components/Seo/CTASticky";
import SidebarCtaCard from "components/Seo/SidebarCtaCard";
import InternalLinksBlock from "components/Seo/InternalLinksBlock";
import BottomLinksSection from "components/Seo/BottomLinksSection";

const StyledContainer = styled.div`
  padding-top: 40px;
  @media ${(props) => props.theme.minWidth.md} {
    padding-top: 60px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    padding-top: 80px;
  }
`;

const StyledHeader = styled(Grid)`
  display: block;
  @media ${(props) => props.theme.minWidth.md} {
    display: grid;
  }

  h1 {
    font-size: 32px;
    line-height: 38px;
    margin-bottom: 30px;
    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 42px;
      line-height: 50px;
    }
    @media ${(props) => props.theme.minWidth.md} {
      grid-column: 2 / span 11;
      font-size: 48px;
      line-height: 56px;
    }
    @media ${(props) => props.theme.minWidth.lg} {
      grid-column: 2 / span 11;
      font-size: 52px;
      line-height: 60px;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 56px;
      line-height: 64px;
    }
  }
`;

const StyledContentContainer = styled(Grid)`
  display: block;
  margin-top: 20px;
  @media ${(props) => props.theme.minWidth.md} {
    display: grid;
    margin-top: 40px;
  }
`;

const StyledSidebarInfo = styled.div`
  display: none;
  @media ${(props) => props.theme.minWidth.md} {
    display: block;
    grid-column: 10 / span 3;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 10 / span 3;
  }
`;

const StyledSidebarSticky = styled.div`
  position: sticky;
  top: calc(50vh - 150px);
`;

const StyledContent = styled.section`
  line-height: 28px;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 2 / span 7;
    line-height: 32px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 2 / span 7;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    grid-column: 2 / span 6;
  }

  & > :first-child {
    margin-top: 0;
  }

  p,
  a {
    font-family: "Signifier Light";
    em {
      font-style: normal;
      font-family: "Signifier Light Italic";
    }
  }

  p {
    margin-bottom: 35px;
  }

  a {
    display: inline;
    text-decoration: underline;
    text-decoration-thickness: 0.8px;
    text-underline-offset: 7px;
  }

  h2 {
    margin: 55px 0 30px;
    font-family: "Söhne Kräftig";
    font-size: 24px;
    line-height: 30px;
    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 26px;
      line-height: 32px;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 30px;
      line-height: 36px;
    }
  }

  h3 {
    font-family: "Söhne Kräftig";
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 10px;
    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 22px;
      line-height: 27px;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 24px;
      line-height: 29px;
    }
  }

  p,
  li,
  a {
    font-size: 18px;
    line-height: 28px;
    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 20px;
      line-height: 32px;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 22px;
      line-height: 34px;
    }
  }

  ul {
    margin: 15px 0 35px;
    padding-left: 20px;
    li {
      font-family: "Signifier Light";
      list-style: disc;
      em {
        font-style: normal;
        font-family: "Signifier Light Italic";
      }
    }
  }
  p + ul {
    margin-top: -35px;
  }
`;

const StyledUpdateDate = styled.p`
  font-size: 14px;
  color: #666;
  font-style: italic;
  margin: 30px 0;
  text-align: center;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 2 / span 7;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 2 / span 7;
  }
`;

const StyledCustomHTML = styled.div`
  margin: 40px 0;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 2 / span 7;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 2 / span 7;
  }
`;

const StyledTableWrapper = styled.div`
  width: 100%;
  margin: 40px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media ${(props) => props.theme.minWidth.md} {
    overflow-x: visible;
  }
`;

const StyledTable = styled.table`
  min-width: 600px; /* Minimum width to maintain readability */
  width: 100%;
  border-collapse: collapse;
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 24px;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 18px;
    line-height: 28px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 20px;
    line-height: 32px;
    min-width: auto;
  }

  thead {
    background-color: #f5f5f5;
  }

  th {
    padding: 12px;
    text-align: left;
    font-family: "Söhne Kräftig";
    font-weight: normal;
    border-bottom: 2px solid #000;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;

    @media ${(props) => props.theme.minWidth.sm} {
      padding: 16px;
      font-size: 18px;
      line-height: 24px;
    }

    @media ${(props) => props.theme.minWidth.md} {
      padding: 20px;
      font-size: 20px;
      line-height: 26px;
      white-space: normal;
    }
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: top;

    @media ${(props) => props.theme.minWidth.sm} {
      padding: 16px;
    }

    @media ${(props) => props.theme.minWidth.md} {
      padding: 20px;
    }
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: #fafafa;
  }
`;

// Helper to safely apply nbspPonctuation
const safeNbspPonctuation = (text) => {
  if (typeof text === "string") {
    return nbspPonctuation(text);
  }
  return text;
};

const getSanityAssetWidth = (asset) => {
  const metaWidth = asset?.metadata?.dimensions?.width;
  if (typeof metaWidth === "number" && metaWidth > 0) return metaWidth;

  const assetWidth = asset?.width;
  if (typeof assetWidth === "number" && assetWidth > 0) return assetWidth;

  const ref = asset?._ref || asset?._id;
  if (typeof ref === "string") {
    const match = ref.match(/-(\d+)x(\d+)-/);
    if (match && match[1]) return Number(match[1]);
  }

  return null;
};

// Create Portable Text components with access to CTA map and page map
const createPortableTextComponents = (ctaMap, pageMap) => ({
  block: {
    h2: ({ children }) => (
      <h2>
        {children.map((child, i) =>
          typeof child === "string" ? (
            <span
              key={i}
              dangerouslySetInnerHTML={{ __html: safeNbspPonctuation(child) }}
            />
          ) : (
            child
          ),
        )}
      </h2>
    ),
    h3: ({ children }) => (
      <h3>
        {children.map((child, i) =>
          typeof child === "string" ? (
            <span
              key={i}
              dangerouslySetInnerHTML={{ __html: safeNbspPonctuation(child) }}
            />
          ) : (
            child
          ),
        )}
      </h3>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
    internalLink: ({ value, children }) => {
      // Handle internal links to other pages on the site
      const { reference } = value;

      // If reference is already resolved (has slug), use it directly
      if (reference?.slug?.current) {
        const slug = reference.slug.current;
        const type = reference._type;

        let path = "/";
        if (type === "moneyPage") {
          path = `/expertises/${slug}`;
        } else if (type === "article") {
          path = `/${slug}`;
        }

        return <Link to={path}>{children}</Link>;
      }

      // If reference is just an ID (_ref), resolve it from pageMap
      if (reference?._ref && pageMap) {
        const referencedPage = pageMap.get(reference._ref);
        if (referencedPage?.slug?.current) {
          const slug = referencedPage.slug.current;
          const type = referencedPage._type;

          let path = "/";
          if (type === "moneyPage") {
            path = `/expertises/${slug}`;
          } else if (type === "article") {
            path = `/${slug}`;
          }

          return <Link to={path}>{children}</Link>;
        }
      }

      // Fallback: render as plain text if reference can't be resolved
      return <span>{children}</span>;
    },
  },
  types: {
    image: ({ value }) =>
      value.asset && (
        <figure style={{ margin: "30px 0", textAlign: "center" }}>
          {(() => {
            const originalWidth = getSanityAssetWidth(value.asset);
            const requestedWidth = originalWidth
              ? Math.min(originalWidth, 1200)
              : 800;

            return (
              <SanityImg
                asset={value.asset}
                alt={value.alt || ""}
                width={requestedWidth}
                loading="lazy"
                config={{
                  quality: 75,
                  fit: "max",
                }}
                style={{
                  maxWidth: originalWidth ? `${originalWidth}px` : "100%",
                  width: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            );
          })()}
          {value.caption && (
            <figcaption
              style={{
                fontSize: "14px",
                color: "#666",
                marginTop: "8px",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),
    customHTMLBlock: ({ value }) => {
      if (!value?.html) return null;
      return (
        <div
          dangerouslySetInnerHTML={{ __html: value.html }}
          style={{ margin: "20px 0" }}
        />
      );
    },
    table: ({ value }) => {
      if (!value?.rows || value.rows.length === 0) return null;

      const [headerRow, ...bodyRows] = value.rows;

      return (
        <StyledTableWrapper>
          <StyledTable>
            {headerRow?.cells && (
              <thead>
                <tr>
                  {headerRow.cells.map((cell, i) => (
                    <th key={i}>{cell}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.cells?.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </StyledTableWrapper>
      );
    },
    // Handle referenced CTAs from library
    // When a reference is resolved, it becomes the document itself
    ctaSectionDocument: ({ value }) => {
      if (!value?.buttonText || !value?.buttonLink) return null;

      return (
        <CTASection
          heading={value.heading}
          description={value.description}
          buttonText={value.buttonText}
          buttonLink={value.buttonLink}
          style={value.style || "primary"}
        />
      );
    },
    // Handle reference type (when reference is in Portable Text array)
    // In Portable Text, references can come through as type 'reference'
    reference: ({ value }) => {
      // Check if it's a resolved CTA document reference
      // When resolved, it should have the document fields directly
      // OR it might have _type: 'ctaSectionDocument' when resolved
      if (
        value?._type === "ctaSectionDocument" ||
        (value?.buttonText && value?.buttonLink)
      ) {
        return (
          <CTASection
            heading={value.heading}
            description={value.description}
            buttonText={value.buttonText}
            buttonLink={value.buttonLink}
            style={value.style || "primary"}
          />
        );
      }

      // If it's an unresolved reference (has _ref), try to resolve it from ctaMap
      if (value?._ref) {
        const referencedCta = ctaMap.get(value._ref);
        if (referencedCta) {
          return (
            <CTASection
              heading={referencedCta.heading}
              description={referencedCta.description}
              buttonText={referencedCta.buttonText}
              buttonLink={referencedCta.buttonLink}
              style={referencedCta.style || "primary"}
            />
          );
        }

        // Reference not found in ctaMap - return null silently
        return null;
      }

      return null;
    },
    // Handle FAQ Block
    faqBlock: ({ value }) => {
      if (!value?.items || value.items.length === 0) return null;
      return (
        <FAQSection
          items={value.items}
          pageMap={pageMap}
          sectionTitle={value.sectionTitle}
        />
      );
    },
    // Handle Team Block
    teamBlock: ({ value }) => {
      if (!value?.members || value.members.length === 0) return null;
      return (
        <TeamSection
          members={value.members}
          sectionTitle={value.sectionTitle}
        />
      );
    },
    // Handle Related Specialties Block
    relatedSpecialtiesBlock: ({ value }) => {
      if (!value?.pages || value.pages.length === 0) return null;
      return (
        <RelatedSpecialties
          items={value.pages}
          sectionTitle={value.sectionTitle}
        />
      );
    },
    // Handle Internal Links Block (maillage interne)
    internalLinksBlock: ({ value }) => {
      if (!value?.links || value.links.length === 0) return null;
      return (
        <InternalLinksBlock
          links={value.links}
          sectionTitle={value.sectionTitle}
          pageMap={pageMap}
        />
      );
    },
  },
});

// Component to display dynamic update date
const UpdateDate = () => {
  const currentDate = new Date();
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <StyledUpdateDate>
      Page mise à jour en {month} {year}
    </StyledUpdateDate>
  );
};

// GraphQL Query
export const query = graphql`
  query MoneyPageBySlug($slug: String!) {
    sanityMoneyPage(slug: { current: { eq: $slug } }) {
      slug {
        current
      }

      # SEO fields
      customH1
      customTitle
      metaDescription
      canonicalUrl
      ogImage {
        asset {
          url
        }
      }

      # Main content
      _rawMainContent

      # FAQ Section (deprecated - use FAQ Block in mainContent)
      faqItems {
        question
        _rawAnswer
      }

      # Team Members (deprecated - use Team Block in mainContent)
      teamMembers {
        teamType
        name
        role
        photo {
          asset {
            gatsbyImageData(width: 300, placeholder: BLURRED)
            url
          }
        }
        bio
        experience
        engagements
        linkedIn
      }

      # Options
      showGoogleReviews
      showUpdateDate
      enableCustomHTML
      customHTML

      # Bottom Internal Links (maillage)
      bottomLinksTitle
      _rawBottomLinks
    }

    # Fetch all CTA documents for reference resolution
    allSanityCtaSectionDocument {
      nodes {
        _id
        name
        heading
        description
        buttonText
        buttonLink
        style
      }
    }

    # Fetch all Money Pages for internal link resolution
    allSanityMoneyPage {
      nodes {
        _id
        id
        _type
        customH1
        metaDescription
        slug {
          current
        }
      }
    }

    # Fetch all Articles for internal link resolution
    allSanityArticle {
      nodes {
        _id
        id
        _type
        title
        metaDescription
        slug {
          current
        }
      }
    }
  }
`;

const MoneyPage = ({ data }) => {
  const page = data.sanityMoneyPage;
  const allCtaDocuments = data.allSanityCtaSectionDocument?.nodes || [];
  const allMoneyPages = data.allSanityMoneyPage?.nodes || [];
  const allArticles = data.allSanityArticle?.nodes || [];

  // Create a map of CTA documents by _id for quick lookup
  const ctaMap = new Map();
  allCtaDocuments.forEach((cta) => {
    ctaMap.set(cta._id, cta);
  });

  // Create a map of all pages for internal link resolution
  // Index by both _id (Sanity ID) and id (Gatsby ID with dash prefix)
  const pageMap = new Map();
  allMoneyPages.forEach((page) => {
    pageMap.set(page._id, page);
    if (page.id) pageMap.set(page.id, page);
  });
  allArticles.forEach((article) => {
    pageMap.set(article._id, article);
    if (article.id) pageMap.set(article.id, article);
  });

  const displayH1 = page.customH1;

  // Generate breadcrumb items for Money Page
  const breadcrumbItems = [
    { label: "Cabinet TLMR : avocats à Paris", url: "/" },
    { label: "Expertises", url: "/expertises" },
    { label: displayH1 }, // Current page, no URL - will be truncated if too long
  ];

  return (
    <>
      <Seo
        pageTitle={page.customH1}
        customTitle={page.customTitle}
        customMetaDescription={page.metaDescription}
        canonicalUrl={page.canonicalUrl}
        imageUrl={page.ogImage?.asset?.url}
      />
      <Layout breadcrumb={<Breadcrumb items={breadcrumbItems} />}>
        <StyledContainer>
          <StyledHeader>
            <h1
              dangerouslySetInnerHTML={{ __html: nbspPonctuation(displayH1) }}
            ></h1>
          </StyledHeader>

          <StyledContentContainer>
            <StyledContent>
              {/* Main Content */}
              {page._rawMainContent && (
                <PortableText
                  value={page._rawMainContent}
                  components={createPortableTextComponents(ctaMap, pageMap)}
                />
              )}
            </StyledContent>

            {/* Sidebar on the right - desktop only */}
            <StyledSidebarInfo>
              <StyledSidebarSticky>
                <SidebarCtaCard />
              </StyledSidebarSticky>
            </StyledSidebarInfo>

            {/* Dynamic Update Date */}
            {page.showUpdateDate && <UpdateDate />}

            {/* Custom HTML Block */}
            {page.enableCustomHTML && page.customHTML && (
              <StyledCustomHTML
                dangerouslySetInnerHTML={{ __html: page.customHTML }}
              />
            )}
          </StyledContentContainer>

          {/* DEPRECATED: These sections now render through mainContent PortableText blocks */}
          {/* Keeping these as fallback for backward compatibility during migration */}
          {page.faqItems && page.faqItems.length > 0 && (
            <FAQSection items={page.faqItems} pageMap={pageMap} />
          )}

          {page.teamMembers && page.teamMembers.length > 0 && (
            <TeamSection members={page.teamMembers} />
          )}

          {/* Bottom Internal Links Section (maillage) */}
          {page._rawBottomLinks && page._rawBottomLinks.length > 0 && (
            <BottomLinksSection
              rawLinks={page._rawBottomLinks}
              sectionTitle={page.bottomLinksTitle}
              currentPageSlug={page.slug?.current}
              pageMap={pageMap}
            />
          )}

          {/* Google Reviews Section */}
          {page.showGoogleReviews && <GoogleReviews />}
        </StyledContainer>

        {/* Mobile Sticky CTA */}
        <CTASticky />
      </Layout>
    </>
  );
};

export default MoneyPage;
