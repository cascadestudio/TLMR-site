import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Grid from "components/global/Grid";

const BreadcrumbContainer = styled(Grid)`
  padding: 20px 0 10px;
  @media ${(props) => props.theme.minWidth.md} {
    padding: 30px 0 15px;
  }
`;

const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  color: #666;
  font-family: "Söhne Buch", sans-serif;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  grid-column: 1 / span 12;

  @media ${(props) => props.theme.minWidth.md} {
    grid-column: 1 / span 3;
    font-size: 15px;
    overflow-x: visible;
  }

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  a {
    color: #666;
    text-decoration: none;
    transition: color 0.2s ease;
    display: inline-block;
    font-family: "Söhne Buch", sans-serif;
    vertical-align: bottom;
    white-space: nowrap;

    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }

  span {
    margin: 0 8px;
    color: #999;
    user-select: none;
    display: inline;
    font-family: "Söhne Buch", sans-serif;
  }

  .current {
    color: #333;
    display: inline-block;
    font-family: "Söhne Buch", sans-serif;
    white-space: nowrap;
    vertical-align: bottom;
  }
`;

const Breadcrumb = ({ items }) => {
  // items = [{ label, url }, ...]
  // Last item should not have a url (current page)

  if (!items || items.length === 0) return null;

  // Filter out items without labels to prevent empty slots
  const validItems = items.filter(item => item && item.label && item.label.trim() !== '');

  if (validItems.length === 0) return null;

  const siteUrl = "https://www.tlmr-avocats.com";

  // Generate Schema.org BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url ? `${siteUrl}${item.url}` : undefined,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Visual breadcrumb navigation */}
      <BreadcrumbContainer>
        <BreadcrumbWrapper aria-label="Fil d'Ariane">
          {validItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.url ? (
                <Link to={item.url}>{item.label}</Link>
              ) : (
                <span className="current" aria-current="page">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbWrapper>
      </BreadcrumbContainer>
    </>
  );
};

export default Breadcrumb;
