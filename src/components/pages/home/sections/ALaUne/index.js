import * as React from "react";
import styled, { css } from "styled-components";
import SectionTitle from "../../SectionTitle";
import Cta from "components/global/Cta";
import Paragraph from "components/global/Paragraph";
import Title from "components/global/Title";
import { graphql, useStaticQuery, Link } from "gatsby";
import SanityImg from "gatsby-plugin-sanity-image";
import { useLocation } from "@reach/router";
import nbspPonctuation from "components/utils/nbspPonctuation";

const border = css`
  border-top: ${(props) => props.theme.border.black};
  padding-top: 10px;
  @media ${(props) => props.theme.minWidth.sm} {
    padding-top: 15px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    padding-top: 30px;
  }
`;
const StyledContainer = styled.div`
  ${(props) => (props.border ? border : null)}
  margin-top: 70px;
  @media ${(props) => props.theme.minWidth.sm} {
    margin-top: 100px;
  }
  @media ${(props) => props.theme.minWidth.md} {
    margin-top: 130px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    margin-top: 100px;
  }
  & > header {
    display: flex;
    @media ${(props) => props.theme.minWidth.sm} {
      padding-bottom: 0;
    }
    h2 {
      font-size: 32px;
      margin-bottom: 20px;
      @media ${(props) => props.theme.minWidth.sm} {
        margin-bottom: 0;
        font-size: 35px;
      }
      @media ${(props) => props.theme.minWidth.md} {
        font-size: ${({ isHome }) => (isHome ? 50 : 35)}px;
        margin-bottom: ${({ isHome }) => (isHome ? 20 : 0)}px;
      }
      @media ${(props) => props.theme.minWidth.lg} {
        font-size: ${({ isHome }) => (isHome ? 55 : 40)}px;
        line-height: ${({ isHome }) => (isHome ? 70 : 35)}px;
      }
      @media ${(props) => props.theme.minWidth.xl} {
        font-size: ${({ isHome }) => (isHome ? 60 : 45)}px;
      }
    }
  }
  a.mobile {
    display: block;
    margin-top: 30px;
    @media ${(props) => props.theme.minWidth.sm} {
      display: none;
    }
  }
`;
const StyledDesktopCta = styled(Cta)`
  display: none;
  @media ${(props) => props.theme.minWidth.sm} {
    display: block;
    margin-bottom: 25px;
    text-align: right;
  }
  @media ${(props) => props.theme.minWidth.md} {
    margin-bottom: 30px;
  }
`;
const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 30px;
  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${(props) => props.theme.columnGap.mobile};
  }
  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${(props) => props.theme.minWidth.xl} {
    grid-column-gap: ${(props) => props.theme.columnGap.desktop};
  }
`;
const StyledNews = styled(Link)`
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
  aside {
    margin: 5px 0;
    @media ${(props) => props.theme.minWidth.lg} {
      margin: 12px 0;
    }
  }
  h3 {
    font-size: 16px;
    @media ${(props) => props.theme.minWidth.lg} {
      font-size: 18px;
    }
  }
  &:nth-child(3),
  &:nth-child(4) {
    display: ${({ isHome }) => !isHome && "none"};
    @media ${(props) => props.theme.minWidth.md} {
      display: block;
    }
  }
`;

const ALaUne = ({ className, border }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allSanityArticle(limit: 4, sort: { date: DESC }) {
          nodes {
            title
            date
            heroImg {
              asset {
                _id
                url
              }
            }
            slug {
              current
            }
          }
        }
      }
    `
  );

  const articles = data.allSanityArticle.nodes;

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <StyledContainer className={className} border={border} isHome={isHome}>
      <header>
        {isHome ? (
          <SectionTitle aside="Actualités" title="À LA UNE" />
        ) : (
          <Title type="h2" size="sm">
            À la une
          </Title>
        )}
      </header>
      <StyledDesktopCta to="/actualites">
        Toutes les actualités
      </StyledDesktopCta>
      <StyledColumns>
        {articles.map(({ title, date, heroImg, slug }) => {
          const thumbAsset = heroImg?.asset;
          return (
            <StyledNews to={"/" + slug.current} key={title}>
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
              <Paragraph as="aside" size="sm">
                {new Date(date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Paragraph>
              <h3
                dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }}
              ></h3>
            </StyledNews>
          );
        })}
      </StyledColumns>
      <Cta to="/actualites" className="mobile">
        Toutes les actualités
      </Cta>
    </StyledContainer>
  );
};

export default ALaUne;
