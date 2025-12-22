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
      grid-column: 3 / span 10;
      font-size: 48px;
      line-height: 56px;
    }
    @media ${(props) => props.theme.minWidth.lg} {
      grid-column: 4 / span 9;
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
    grid-column: 11 / span 2;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 11 / span 2;
  }
`;

const StyledSidebarSticky = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.headerHeight}px;
`;

const StyledSidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  padding: 20px;
`;

const StyledSidebarTitle = styled.h3`
  font-family: "Söhne Kräftig";
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.black};
  margin: 0;
`;

const StyledSidebarDescription = styled.p`
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.black};
  margin: 0;
  opacity: 0.9;
`;

const StyledSidebarCTA = styled(Link)`
  display: inline-block;
  padding: 8px 16px 9px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.blackLight};
  color: white;
  text-decoration: none;
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 1.4;
  text-align: center;
  transition: background-color 0.2s ease;
  word-wrap: break-word;

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
  }
`;

const StyledContent = styled.section`
  line-height: 28px;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 3 / span 8;
    line-height: 32px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 4 / span 7;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    grid-column: 4 / span 6;
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
    margin: -35px 0 35px;
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
`;

const StyledUpdateDate = styled.p`
  font-size: 14px;
  color: #666;
  font-style: italic;
  margin: 30px 0;
  text-align: center;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 3 / span 8;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 4 / span 7;
  }
`;

const StyledCustomHTML = styled.div`
  margin: 40px 0;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 3 / span 8;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    grid-column: 4 / span 7;
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

// Create Portable Text components with access to CTA map and page map
const createPortableTextComponents = (ctaMap, pageMap) => ({
  block: {
    h2: ({ children }) => <h2>{children.map((child, i) =>
      typeof child === "string" ? <span key={i} dangerouslySetInnerHTML={{ __html: safeNbspPonctuation(child) }} /> : child
    )}</h2>,
    h3: ({ children }) => <h3>{children.map((child, i) =>
      typeof child === "string" ? <span key={i} dangerouslySetInnerHTML={{ __html: safeNbspPonctuation(child) }} /> : child
    )}</h3>,
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
        <SanityImg
          asset={value.asset}
          alt={value.alt || ""}
          width={value.asset.width}
          style={{ width: "100%", maxWidth: value.asset.width, margin: "30px 0" }}
        />
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
      // Debug in development
      if (process.env.NODE_ENV === "development" && value) {
        console.log(
          "ctaSectionDocument value:",
          JSON.stringify(value, null, 2)
        );
      }

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
      // Debug: log the reference structure
      if (process.env.NODE_ENV === "development" && value) {
        console.log("Reference type value:", JSON.stringify(value, null, 2));
      }

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

      // If it's an unresolved reference, try to resolve it manually
      if (value?._type === "reference" && value?._ref) {
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

        if (process.env.NODE_ENV === "development") {
          console.warn(
            "Unresolved CTA reference:",
            value._ref,
            "Available CTAs:",
            Array.from(ctaMap.keys())
          );
        }
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

      # Main content
      _rawMainContent

      # FAQ Section
      faqItems {
        question
        _rawAnswer
      }

      # Related Specialties
      relatedSpecialties {
        title
        customH1
        slug {
          current
        }
      }

      # Team Members
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
        _type
        slug {
          current
        }
      }
    }

    # Fetch all Articles for internal link resolution
    allSanityArticle {
      nodes {
        _id
        _type
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
  const pageMap = new Map();
  allMoneyPages.forEach((page) => {
    pageMap.set(page._id, page);
  });
  allArticles.forEach((article) => {
    pageMap.set(article._id, article);
  });

  // Debug: log the raw content structure in development
  if (process.env.NODE_ENV === "development" && page._rawMainContent) {
    console.log(
      "Raw main content structure:",
      JSON.stringify(page._rawMainContent, null, 2)
    );
    console.log("Available CTA documents:", ctaMap);
  }

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
                <StyledSidebarContent>
                  <StyledSidebarTitle>Besoin d'un avocat ?</StyledSidebarTitle>
                  <StyledSidebarDescription>
                    Contactez TLMR Avocats pour un premier échange confidentiel.
                  </StyledSidebarDescription>
                  <StyledSidebarCTA to="/contact">
                    Prendre<br />rendez-vous
                  </StyledSidebarCTA>
                </StyledSidebarContent>
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

          {page.relatedSpecialties && page.relatedSpecialties.length > 0 && (
            <RelatedSpecialties items={page.relatedSpecialties} />
          )}

          {page.teamMembers && page.teamMembers.length > 0 && (
            <TeamSection members={page.teamMembers} />
          )}

          {/* TODO: Add Google Reviews Component */}
        </StyledContainer>
      </Layout>
    </>
  );
};

export default MoneyPage;
