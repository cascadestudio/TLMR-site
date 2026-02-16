import React from "react";
import Layout from "components/Layout";
import styled from "styled-components";
import Grid from "components/global/Grid";
import Title from "components/global/Title";
import Paragraph from "components/global/Paragraph";
import { graphql, useStaticQuery, Link } from "gatsby";
import SanityImg from "gatsby-plugin-sanity-image";
import Seo from "components/Seo";
import nbspPonctuation from "components/utils/nbspPonctuation";

const StyledContainer = styled.div`
  padding: 160px 0 75px;
  @media ${(props) => props.theme.minWidth.sm} {
    padding: 210px 0 0;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    padding: 210px 0 0;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    padding: 210px 0 40px;
  }
`;
const StyledYearContainer = styled.div`
  margin-bottom: 50px;
  @media ${(props) => props.theme.minWidth.sm} {
    margin-bottom: 70px;
  }
  h2 {
    @media ${(props) => props.theme.minWidth.sm} {
      margin-bottom: 15px;
    }
  }
`;
const StyledGrid = styled(Grid)`
  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const StyledArticleCard = styled(Link)`
  margin-bottom: 30px;
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
    }
  }
`;

const Actualites = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allSanityArticle(sort: { date: DESC }) {
          nodes {
            title
            date
            _rawHeroImg
            slug {
              current
            }
          }
        }
      }
    `
  );

  const articles = data.allSanityArticle.nodes;

  const years = [];

  const getYearFromDateString = (dateString) => {
    var date = new Date(dateString);
    var year = date.getFullYear();
    return year;
  };

  articles.map(({ date }) => {
    const articleYear = getYearFromDateString(date);
    return years.indexOf(articleYear) === -1 && years.push(articleYear);
  });

  years.sort((a, b) => b - a);

  return (
    <>
      <Seo pageTitle="Actualités" />
      <Layout>
        <StyledContainer className="pageAnimation">
          <Title type="h1">Actualités</Title>
          {years.map((year) => {
            const articlesByYear = articles.filter(
              ({ date }) => getYearFromDateString(date) === year
            );
            return (
              <StyledYearContainer key={year}>
                <Title type="h2">{year}</Title>
                <StyledGrid>
                  {articlesByYear.map(({ date, title, _rawHeroImg, slug }) => {
                    const thumbAsset = _rawHeroImg?.asset;
                    return (
                      <StyledArticleCard key={title} to={"/" + slug.current}>
                        {thumbAsset && (
                          <div>
                            <SanityImg
                              asset={thumbAsset}
                              alt={title}
                              width={600}
                              loading="lazy"
                              config={{ quality: 75, fit: "max" }}
                            />
                          </div>
                        )}
                        <Paragraph className="date" size="sm">
                          {new Date(date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Paragraph>
                        <Paragraph
                          size="lg"
                          as="h3"
                          html={{
                            __html: nbspPonctuation(title),
                          }}
                        ></Paragraph>
                      </StyledArticleCard>
                    );
                  })}
                </StyledGrid>
              </StyledYearContainer>
            );
          })}
        </StyledContainer>
      </Layout>
    </>
  );
};

export default Actualites;
