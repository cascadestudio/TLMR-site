import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import nbspPonctuation from "components/utils/nbspPonctuation";

const CTAWrapper = styled.div`
  margin: 50px 0;
  padding: 36px 0;
  border-top: ${(props) => props.theme.border.black};
  border-bottom: ${(props) => props.theme.border.black};
  text-align: center;
  transition: border-color 0.2s ease;

  @media ${(props) => props.theme.minWidth.sm} {
    padding: 40px 0;
  }

  @media ${(props) => props.theme.minWidth.md} {
    padding: 48px 0;
    margin: 60px 0;
  }

  /* Style variants - matching e-services page style */
  ${(props) =>
    props.$variant === "primary" &&
    `
    background: transparent;
    color: #000;
  `}

  ${(props) =>
    props.$variant === "secondary" &&
    `
    background: transparent;
    color: #000;
  `}

  ${(props) =>
    props.$variant === "subtle" &&
    `
    background: transparent;
    color: #000;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  `}
`;

const CTAHeading = styled.h3`
  font-size: 20px;
  line-height: 26px;
  margin-bottom: ${(props) => (props.$hasDescription ? "12px" : "24px")};
  font-family: "Söhne Kräftig";

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 22px;
    line-height: 28px;
    margin-bottom: ${(props) => (props.$hasDescription ? "14px" : "26px")};
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 24px;
    line-height: 30px;
    margin-bottom: ${(props) => (props.$hasDescription ? "16px" : "28px")};
  }
`;

const CTADescription = styled.p`
  font-family: "Signifier Light";
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 24px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 16px;
    line-height: 24px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 17px;
    line-height: 26px;
    margin-bottom: 28px;
  }
`;

const CTAButton = styled(Link)`
  /* Override parent StyledContent styles with higher specificity */
  &&& {
    width: 100%;
    border-radius: 100px;
    padding: 5px 15px 6px;
    text-align: center;
    font-size: 18px;
    text-decoration: none;
    display: inline-block;
    max-width: 500px;
    font-family: "Signifier Light";
    line-height: normal;

    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 20px;
    }

    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 22px;
    }

    /* Primary variant (default) - matches :nth-child(1) from e-services */
    background-color: ${(props) => props.theme.colors.blackLight};
    color: white;

    &:hover {
      background-color: ${(props) => props.theme.colors.grey};
    }

    /* Secondary/Subtle variants - matches :nth-child(2) from e-services */
    ${(props) =>
      (props.$variant === "secondary" || props.$variant === "subtle") &&
      `
      background-color: ${(props) => props.theme.colors.greyLightest};
      color: #000;

      &:hover {
        color: white;
        background-color: ${(props) => props.theme.colors.grey};
      }
    `}
  }
`;

const CTASection = ({
  heading,
  description,
  buttonText,
  buttonLink,
  style = "primary",
}) => {
  if (!buttonText || !buttonLink) return null;

  return (
    <CTAWrapper $variant={style}>
      {heading && (
        <CTAHeading
          $hasDescription={!!description}
          dangerouslySetInnerHTML={{ __html: nbspPonctuation(heading) }}
        />
      )}

      {description && (
        <CTADescription
          dangerouslySetInnerHTML={{ __html: nbspPonctuation(description) }}
        />
      )}

      <CTAButton to={buttonLink} $variant={style}>
        {buttonText}
      </CTAButton>
    </CTAWrapper>
  );
};

export default CTASection;
