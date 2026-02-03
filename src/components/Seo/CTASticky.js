import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "gatsby";

// Shine animation for the button
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

const StickyWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(${(props) => (props.$isVisible ? "0" : "120%")});
  z-index: 1000;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: ${(props) => (props.$isVisible ? "1" : "0")};
  width: calc(100vw - 32px);
  max-width: 320px;
  box-sizing: border-box;

  @media ${(props) => props.theme.minWidth.sm} {
    width: calc(100vw - 56px);
  }

  @media ${(props) => props.theme.minWidth.md} {
    display: none;
  }
`;

// Shared button styles
const buttonStyles = `
  display: block;
  padding: 12px 24px;
  border-radius: 100px;
  background-color: #000;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-family: "Söhne Kräftig";
  font-size: 14px;
  line-height: 1.4;
  white-space: normal;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
`;

const StickyButtonInternal = styled(Link)`
  ${buttonStyles}

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
  }

  @media ${(props) => props.theme.minWidth.sm} {
    padding: 14px 28px;
  }
`;

const StickyButtonExternal = styled.a`
  ${buttonStyles}

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
  }

  @media ${(props) => props.theme.minWidth.sm} {
    padding: 14px 28px;
  }
`;

// Helper to detect external URLs
const isExternalUrl = (url) =>
  url?.startsWith("http://") || url?.startsWith("https://");

const CTASticky = ({ text = "Prendre rendez-vous", to = "/contact" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isExternal = isExternalUrl(to);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when footer is visible
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;
        setIsVisible(!isFooterVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StickyWrapper $isVisible={isVisible}>
      {isExternal ? (
        <StickyButtonExternal
          href={to}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </StickyButtonExternal>
      ) : (
        <StickyButtonInternal to={to}>{text}</StickyButtonInternal>
      )}
    </StickyWrapper>
  );
};

export default CTASticky;
