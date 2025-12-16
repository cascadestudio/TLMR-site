import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const SidebarWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.minWidth.md} {
    display: block;
    position: fixed;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    transition: opacity 0.3s ease;
    opacity: ${(props) => (props.$isVisible ? "1" : "0")};
    pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
    width: auto;
    max-width: 120px;
  }

  @media ${(props) => props.theme.minWidth.lg} {
    left: 32px;
    max-width: 140px;
  }

  @media ${(props) => props.theme.minWidth.xl} {
    left: 45px;
    max-width: 160px;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

const SidebarTitle = styled.h3`
  font-family: "Söhne Kräftig";
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.black};
  margin: 0;
`;

const SidebarDescription = styled.p`
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.black};
  margin: 0;
  opacity: 0.9;
`;

const SidebarCTA = styled(Link)`
  display: inline-block;
  padding: 8px 16px 9px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.blackLight};
  color: white;
  text-decoration: none;
  font-family: "Signifier Light";
  font-size: 16px;
  line-height: 1.4;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
  word-wrap: break-word;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey};
    color: ${(props) => props.theme.colors.black};
  }
`;

const CTASidebarSticky = ({
  title,
  description,
  text = "Prendre rendez-vous",
  to = "/contact",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling down 300px
      const shouldShow = scrollY > 300;

      // Hide when near footer (within 200px of bottom)
      const nearBottom = scrollY + windowHeight > documentHeight - 200;

      setIsVisible(shouldShow && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SidebarWrapper $isVisible={isVisible}>
      <SidebarContent>
        {title && <SidebarTitle>{title}</SidebarTitle>}
        {description && <SidebarDescription>{description}</SidebarDescription>}
        <SidebarCTA to={to}>{text}</SidebarCTA>
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default CTASidebarSticky;
