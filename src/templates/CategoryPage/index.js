import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "components/Layout";
import Seo from "components/Seo";
import styled from "styled-components";
import Grid from "components/global/Grid";
import Paragraph from "components/global/Paragraph";
import { PortableText } from "@portabletext/react";
import SanityImg from "gatsby-plugin-sanity-image";
import nbspPonctuation from "components/utils/nbspPonctuation";
import Breadcrumb from "components/Seo/Breadcrumb";
import CTASection from "components/Seo/CTASection";

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
  margin-bottom: 60px;
  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 3 / span 8;
    line-height: 32px;
    margin-bottom: 80px;
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
  min-width: 600px;
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

const StyledArticlesSection = styled.div`
  padding: 60px 0 40px;
  @media ${(props) => props.theme.minWidth.md} {
    padding: 80px 0 60px;
  }
`;

const StyledArticlesGrid = styled(Grid)`
  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledArticleCard = styled(Link)`
  margin-bottom: 30px;
  display: block;
  text-decoration: none;
  color: inherit;

  & > div {
    overflow: hidden;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    transition: transform 0.3s ${(props) => props.theme.cubicBezier.base};
    aspect-ratio: 1.6;
    @media ${(props) => props.theme.minWidth.md} {
      aspect-ratio: 1;
    }
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }

  @media ${(props) => props.theme.minWidth.md} {
    margin-bottom: 50px;
  }

  p {
    margin: 7px 0 5px;
    &.date {
      font-size: 12px;
      color: #666;
    }
  }
`;

// Create Portable Text components with access to CTA map and page map
const createPortableTextComponents = (ctaMap, pageMap) => ({
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
    internalLink: ({ value, children }) => {
      const { reference } = value;

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

      return <span>{children}</span>;
    },
  },
  types: {
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
    reference: ({ value }) => {
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
      }

      return null;
    },
  },
});

// GraphQL Query
export const query = graphql`
  query CategoryPageBySlug($slug: String!, $categoryId: String!) {
    sanityCategory(slug: { current: { eq: $slug } }) {
      _id
      slug {
        current
      }

      # SEO fields
      customH1
      customTitle
      metaDescription
      canonicalUrl

      # Main content
      mainContent
      _rawMainContent
    }

    # Fetch articles filtered by category
    allSanityArticle(
      filter: { categories: { elemMatch: { _id: { eq: $categoryId } } } }
      sort: { date: DESC }
    ) {
      nodes {
        title
        date
        slug {
          current
        }
        _rawHeroImg(resolveReferences: { maxDepth: 1 })
      }
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
    allArticlesForLinks: allSanityArticle {
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

const CategoryPage = ({ data }) => {
  const page = data.sanityCategory;
  const articles = data.allSanityArticle?.nodes || [];

  const allCtaDocuments = data.allSanityCtaSectionDocument?.nodes || [];
  const allMoneyPages = data.allSanityMoneyPage?.nodes || [];
  const allArticles = data.allArticlesForLinks?.nodes || [];

  // Create a map of CTA documents by _id for quick lookup
  const ctaMap = new Map();
  allCtaDocuments.forEach((cta) => {
    ctaMap.set(cta._id, cta);
  });

  // Create a map of all pages for internal link resolution
  const pageMap = new Map();
  allMoneyPages.forEach((moneyPage) => {
    pageMap.set(moneyPage._id, moneyPage);
  });
  allArticles.forEach((article) => {
    pageMap.set(article._id, article);
  });

  const displayH1 = page.customH1;

  // Generate breadcrumb items for Category Page
  const breadcrumbItems = [
    { label: "Cabinet TLMR : avocats à Paris", url: "/" },
    { label: "Actualités", url: "/actualites" },
    { label: displayH1 },
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
              {page.mainContent && (
                <PortableText
                  value={page.mainContent}
                  components={createPortableTextComponents(ctaMap, pageMap)}
                />
              )}
            </StyledContent>
          </StyledContentContainer>

          {/* Articles Grid */}
          <StyledArticlesSection>
            <StyledArticlesGrid>
              {articles.map((article) => {
                const thumbAsset = article._rawHeroImg?.asset;
                return (
                  <StyledArticleCard
                    key={article.slug.current}
                    to={`/${article.slug.current}`}
                  >
                    {thumbAsset && (
                      <div>
                        <SanityImg
                          asset={thumbAsset}
                          alt={article.title}
                          width={600}
                          loading="lazy"
                          config={{ quality: 75, fit: "max" }}
                        />
                      </div>
                    )}
                    <Paragraph className="date" size="sm">
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Paragraph>
                    <Paragraph
                      size="lg"
                      as="h3"
                      html={{
                        __html: nbspPonctuation(article.title),
                      }}
                    ></Paragraph>
                  </StyledArticleCard>
                );
              })}
            </StyledArticlesGrid>
          </StyledArticlesSection>
        </StyledContainer>
      </Layout>
    </>
  );
};

export default CategoryPage;
