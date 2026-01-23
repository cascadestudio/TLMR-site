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
  padding: 28px 24px;
  background-color: ${(props) => props.theme.colors.blackLight};
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  text-align: center;

  @media ${(props) => props.theme.minWidth.sm} {
    padding: 32px 32px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    padding: 40px 48px;
    margin: 60px 0;
  }
`;

const CTAHeading = styled.h3`
  font-size: 20px;
  line-height: 26px;
  margin-bottom: ${(props) => (props.$hasDescription ? "12px" : "20px")};
  font-family: "Söhne Kräftig";
  color: white;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 22px;
    line-height: 28px;
    margin-bottom: ${(props) => (props.$hasDescription ? "14px" : "22px")};
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 24px;
    line-height: 30px;
    margin-bottom: ${(props) => (props.$hasDescription ? "16px" : "24px")};
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
  color: rgba(255, 255, 255, 0.85);

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
    padding: 12px 24px;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    display: inline-block;
    max-width: 320px;
    font-family: "Söhne Kräftig";
    line-height: 1.4;
    background-color: white;
    color: ${(props) => props.theme.colors.blackLight};
    position: relative;
    overflow: hidden;
    transition: background-color 0.2s ease, transform 0.2s ease;

    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 17px;
      padding: 14px 28px;
    }

    @media ${(props) => props.theme.minWidth.md} {
      font-size: 18px;
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
        rgba(255, 255, 255, 0.5),
        transparent
      );
      animation: ${shineAnimation} 3s infinite;
    }

    &:hover {
      background-color: #f0f0f0;
      transform: scale(1.02);
    }
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

      <CTAButton to={buttonLink}>
        {buttonText}
      </CTAButton>
    </CTAWrapper>
  );
};

export default CTASection;
