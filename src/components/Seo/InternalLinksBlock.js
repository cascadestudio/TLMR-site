import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import nbspPonctuation from "components/utils/nbspPonctuation";

const SectionWrapper = styled.section`
  margin: 60px 0;
  padding: 40px 0;
  background-color: #f8f8f8;

  @media ${(props) => props.theme.minWidth.md} {
    margin: 80px 0;
    padding: 50px 0;
  }

  @media ${(props) => props.theme.minWidth.lg} {
    margin: 100px 0;
    padding: 60px 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Söhne Kräftig";
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 30px;
  padding: 0 20px;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 28px;
    line-height: 34px;
    margin-bottom: 40px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 32px;
    line-height: 38px;
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

const LinkCard = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background-color: white;
  border-radius: 8px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
`;

const LinkTitle = styled.span`
  font-family: "Söhne Kräftig";
  font-size: 15px;
  line-height: 20px;
  flex: 1;
  padding-right: 12px;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 16px;
    line-height: 22px;
  }
`;

const Arrow = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.colors.blackLight};
  transition: transform 0.2s ease;
  flex-shrink: 0;
`;

const InternalLinksBlock = ({ links, sectionTitle, pageMap }) => {
  if (!links || links.length === 0) return null;

  const title = sectionTitle || "Pour aller plus loin";

  // Resolve links - they can be either resolved references or just IDs
  const resolvedLinks = links
    .map((link) => {
      // If the link is already resolved with slug
      if (link?.slug?.current) {
        return {
          title: link.customH1 || link.title,
          slug: link.slug.current,
          type: link._type,
        };
      }

      // If it's a reference ID, try to resolve from pageMap
      if (link?._ref && pageMap) {
        const resolved = pageMap.get(link._ref);
        if (resolved?.slug?.current) {
          return {
            title: resolved.customH1 || resolved.title,
            slug: resolved.slug.current,
            type: resolved._type,
          };
        }
      }

      return null;
    })
    .filter(Boolean);

  if (resolvedLinks.length === 0) return null;

  return (
    <SectionWrapper>
      <SectionTitle
        dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }}
      />
      <LinksGrid>
        {resolvedLinks.map((link, index) => {
          const path =
            link.type === "moneyPage"
              ? `/expertises/${link.slug}`
              : `/${link.slug}`;

          return (
            <LinkCard key={index} to={path}>
              <LinkTitle>{link.title}</LinkTitle>
              <Arrow className="arrow">&rarr;</Arrow>
            </LinkCard>
          );
        })}
      </LinksGrid>
    </SectionWrapper>
  );
};

export default InternalLinksBlock;