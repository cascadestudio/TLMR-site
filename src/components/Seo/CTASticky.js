import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StickyButton = styled(Link)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  background-color: ${(props) => props.theme.colors.blackLight};
  color: white;
  text-align: center;
  text-decoration: none;
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 24px;
  z-index: 1000;
  border-top: ${(props) => props.theme.border.black};
  transition: transform 0.3s ease, background-color 0.2s ease;
  transform: translateY(${(props) => (props.$isVisible ? "0" : "100%")});

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 18px;
    padding: 14px 24px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    display: none; // Mobile and tablet only
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.grey};
  }
`;

const CTASticky = ({
  text = "Réservez un rendez-vous avec un avocat",
  to = "/contact",
}) => {
  const [isVisible, setIsVisible] = useState(true);

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
    <StickyButton to={to} $isVisible={isVisible}>
      {text}
    </StickyButton>
  );
};

export default CTASticky;
