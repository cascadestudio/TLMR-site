import React from "react";
import { graphql } from "gatsby";
import Layout from "components/Layout";
import Seo from "components/Seo";
import styled from "styled-components";
import Grid from "components/global/Grid";
import { PortableText } from "@portabletext/react";
import nbspPonctuation from "components/utils/nbspPonctuation";
import FAQSection from "components/Seo/FAQSection";
import RelatedSpecialties from "components/Seo/RelatedSpecialties";
import TeamSection from "components/Seo/TeamSection";
import CTASection from "components/Seo/CTASection";
import CTASticky from "components/Seo/CTASticky";
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

// Create Portable Text components with access to CTA map
const createPortableTextComponents = (ctaMap) => ({
  block: {
    h2: ({ children }) => (
      <h2
        dangerouslySetInnerHTML={{ __html: nbspPonctuation(children[0]) }}
      ></h2>
    ),
    h3: ({ children }) => (
      <h3
        dangerouslySetInnerHTML={{ __html: nbspPonctuation(children[0]) }}
      ></h3>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
  types: {
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
      title
      slug {
        current
      }

      # SEO fields
      customTitle
      customH1
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
  }
`;

const MoneyPage = ({ data }) => {
  const page = data.sanityMoneyPage;
  const allCtaDocuments = data.allSanityCtaSectionDocument?.nodes || [];

  // Create a map of CTA documents by _id for quick lookup
  const ctaMap = new Map();
  allCtaDocuments.forEach((cta) => {
    ctaMap.set(cta._id, cta);
  });

  // Debug: log the raw content structure in development
  if (process.env.NODE_ENV === "development" && page._rawMainContent) {
    console.log(
      "Raw main content structure:",
      JSON.stringify(page._rawMainContent, null, 2)
    );
    console.log("Available CTA documents:", ctaMap);
  }

  // Use customH1 if available, fallback to title
  const displayH1 = page.customH1 || page.title;

  // Generate breadcrumb items for Money Page
  const breadcrumbItems = [
    { label: "Accueil", url: "/" },
    { label: "Expertises", url: "/expertises" },
    { label: displayH1 }, // Current page, no URL - will be truncated if too long
  ];

  return (
    <>
      <Seo
        pageTitle={page.title}
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
                  components={createPortableTextComponents(ctaMap)}
                />
              )}
            </StyledContent>

            {/* Dynamic Update Date */}
            {page.showUpdateDate && <UpdateDate />}

            {/* Custom HTML Block */}
            {page.enableCustomHTML && page.customHTML && (
              <StyledCustomHTML
                dangerouslySetInnerHTML={{ __html: page.customHTML }}
              />
            )}
          </StyledContentContainer>

          {/* FAQ Section */}
          {page.faqItems && page.faqItems.length > 0 && (
            <FAQSection items={page.faqItems} />
          )}

          {/* Related Specialties Section */}
          {page.relatedSpecialties && page.relatedSpecialties.length > 0 && (
            <RelatedSpecialties items={page.relatedSpecialties} />
          )}

          {/* Team Section */}
          {page.teamMembers && page.teamMembers.length > 0 && (
            <TeamSection members={page.teamMembers} />
          )}

          {/* Placeholder sections for components we'll build next */}
          {/* TODO: Add Google Reviews Component */}
        </StyledContainer>

        {/* Sticky CTA - appears on mobile/tablet only */}
        <CTASticky
          text="Réservez un rendez-vous avec un avocat"
          to="/contact"
        />
      </Layout>
    </>
  );
};

export default MoneyPage;
