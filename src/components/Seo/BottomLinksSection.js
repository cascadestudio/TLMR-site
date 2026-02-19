import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import nbspPonctuation from "components/utils/nbspPonctuation";
import resolveSanityRef from "components/utils/resolveSanityRef";

const SectionWrapper = styled.section`
  margin: 80px 0;
  padding: 60px 0;
  background: #f9f9f9;

  @media ${(props) => props.theme.minWidth.md} {
    margin: 100px 0;
    padding: 80px 0;
  }

  @media ${(props) => props.theme.minWidth.lg} {
    margin: 120px 0;
    padding: 100px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  line-height: 34px;
  margin-bottom: 40px;
  font-family: "Söhne Kräftig";
  text-align: center;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 32px;
    line-height: 38px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 36px;
    line-height: 42px;
    margin-bottom: 50px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
`;

const Card = styled(Link)`
  position: relative;
  padding: 35px 30px;
  background: #fff;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 180px;

  @media ${(props) => props.theme.minWidth.md} {
    padding: 40px 35px;
    min-height: 200px;
  }

  &:hover {
    border-color: #000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &::after {
    content: "→";
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 24px;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateX(-10px);

    @media ${(props) => props.theme.minWidth.md} {
      bottom: 35px;
      right: 35px;
    }
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(0);
  }
`;

const CardTitle = styled.h3`
  font-size: 19px;
  line-height: 26px;
  font-family: "Söhne Kräftig";
  margin: 0 0 12px 0;
  padding-right: 30px;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 20px;
    line-height: 27px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 21px;
    line-height: 28px;
    margin-bottom: 15px;
  }
`;

const CardDescription = styled.p`
  font-family: "Signifier Light";
  font-size: 15px;
  line-height: 22px;
  color: #555;
  margin: 0;
  padding-right: 30px;
  flex-grow: 1;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 16px;
    line-height: 24px;
  }
`;

const truncateDescription = (text, maxLength = 120) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "…";
};

const BottomLinksSection = ({
  rawLinks,
  sectionTitle,
  currentPageSlug,
  pageMap,
}) => {
  if (!rawLinks || rawLinks.length === 0) return null;

  const title = sectionTitle || "Pour aller plus loin";

  // Resolve references from rawLinks using pageMap
  const resolvedLinks = rawLinks
    .map((link) => {
      // The page field contains a reference with _ref
      let pageRef = link.page?._ref;
      if (!pageRef || !pageMap) return null;

      // Resolve with fallbacks for ID format mismatches (drafts., dash prefix, etc.)
      let resolvedPage = resolveSanityRef(pageMap, pageRef);
      if (!resolvedPage?.slug?.current) return null;

      // Exclude current page to prevent self-referencing
      if (currentPageSlug && resolvedPage.slug.current === currentPageSlug) {
        return null;
      }

      const isMoneyPage = resolvedPage._type === "moneyPage";

      // Use custom title/description or fallback to page data
      const displayTitle =
        link.customTitle || resolvedPage.customH1 || resolvedPage.title;
      const displayDescription = truncateDescription(
        link.customDescription || resolvedPage.metaDescription
      );

      // Build path based on page type
      const path = isMoneyPage
        ? `/expertises/${resolvedPage.slug.current}`
        : `/${resolvedPage.slug.current}`;

      return {
        path,
        title: displayTitle,
        description: displayDescription,
        key: link._key || pageRef,
      };
    })
    .filter(Boolean);

  if (resolvedLinks.length === 0) return null;

  return (
    <SectionWrapper>
      <Container>
        <Title dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }} />

        <Grid>
          {resolvedLinks.map((link) => (
            <Card key={link.key} to={link.path}>
              <CardTitle
                dangerouslySetInnerHTML={{
                  __html: nbspPonctuation(link.title),
                }}
              />
              {link.description && (
                <CardDescription>{link.description}</CardDescription>
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
};

export default BottomLinksSection;
