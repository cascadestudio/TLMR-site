import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";
import nbspPonctuation from "components/utils/nbspPonctuation";

// Shine animation for the button (matching sidebar CTA)
const shineAnimation = keyframes`
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
`;

const CTAWrapper = styled.div`
  margin: 50px 0;
  padding: 24px 20px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;

  @media ${(props) => props.theme.minWidth.sm} {
    padding: 28px 28px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    padding: 32px 40px;
    margin: 60px 0;
  }
`;

const CTAHeading = styled.h3`
  font-size: 20px;
  line-height: 26px;
  font-family: "Söhne Kräftig";
  color: #000;

  /* Override parent StyledContent margin with higher specificity */
  && {
    margin-bottom: ${(props) => (props.$hasDescription ? "12px" : "30px")};
  }

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 22px;
    line-height: 28px;

    && {
      margin-bottom: ${(props) => (props.$hasDescription ? "14px" : "32px")};
    }
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 16px;
    line-height: 20px;

    && {
      margin-bottom: ${(props) => (props.$hasDescription ? "12px" : "24px")};
    }
  }
`;

const CTADescription = styled.p`
  font-family: "Signifier Light";
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 24px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  color: #333;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 16px;
    line-height: 24px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 20px;
  }
`;

// Shared button styles
const buttonStyles = `
  border-radius: 100px;
  padding: 12px 24px;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
  font-family: "Söhne Kräftig";
  line-height: 1.4;
  white-space: nowrap;
  background-color: #000;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
`;

const CTAButtonInternal = styled(Link)`
  /* Override parent StyledContent styles with higher specificity */
  &&& {
    ${buttonStyles}

    @media ${(props) => props.theme.minWidth.sm} {
      padding: 14px 28px;
    }

    @media ${(props) => props.theme.minWidth.md} {
      padding: 14px 32px;
    }

    /* Shine animation */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: ${shineAnimation} 3s infinite;
    }

    &:hover {
      background-color: #222;
      transform: scale(1.02);
    }
  }
`;

const CTAButtonExternal = styled.a`
  /* Override parent StyledContent styles with higher specificity */
  &&& {
    ${buttonStyles}

    @media ${(props) => props.theme.minWidth.sm} {
      padding: 14px 28px;
    }

    @media ${(props) => props.theme.minWidth.md} {
      padding: 14px 32px;
    }

    /* Shine animation */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: ${shineAnimation} 3s infinite;
    }

    &:hover {
      background-color: #222;
      transform: scale(1.02);
    }
  }
`;

// Helper to detect external URLs
const isExternalUrl = (url) =>
  url?.startsWith("http://") || url?.startsWith("https://");

const CTASection = ({
  heading,
  description,
  buttonText,
  buttonLink,
  style = "primary",
}) => {
  if (!buttonText || !buttonLink) return null;

  const isExternal = isExternalUrl(buttonLink);

  return (
    <CTAWrapper>
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

      {isExternal ? (
        <CTAButtonExternal
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonText}
        </CTAButtonExternal>
      ) : (
        <CTAButtonInternal to={buttonLink}>{buttonText}</CTAButtonInternal>
      )}
    </CTAWrapper>
  );
};

export default CTASection;
