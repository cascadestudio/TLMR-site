import React from "react";
import { graphql } from "gatsby";
import Layout from "components/Layout";
import Seo from "components/Seo";
import styled from "styled-components";
import Grid from "components/global/Grid";
import { PortableText } from "@portabletext/react";
import nbspPonctuation from "components/utils/nbspPonctuation";
import FAQSection from "components/seo/FAQSection";
import RelatedSpecialties from "components/seo/RelatedSpecialties";
import TeamSection from "components/seo/TeamSection";

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

// Portable Text components for rendering rich content
const myPortableTextComponents = {
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
  },
};

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
  }
`;

const MoneyPage = ({ data }) => {
  const page = data.sanityMoneyPage;

  // Use customH1 if available, fallback to title
  const displayH1 = page.customH1 || page.title;

  return (
    <>
      <Seo
        pageTitle={page.title}
        customTitle={page.customTitle}
        customMetaDescription={page.metaDescription}
        canonicalUrl={page.canonicalUrl}
      />
      <Layout>
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
                  components={myPortableTextComponents}
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
      </Layout>
    </>
  );
};

export default MoneyPage;
