import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Grid from "components/global/Grid";
import Dot from "components/global/Dot";
import { myContext } from "provider";
import { useLocation } from "@reach/router";

const StyledContainer = styled.section`
  display: none;
  @media ${(props) => props.theme.minWidth.lg} {
    transform: translateY(${({ isHidden }) => isHidden && `-` + 105}px);
    transition: transform
        ${({ theme, isPageChange }) =>
          isPageChange ? "0" : theme.transitionTime}s,
      top ${(props) => props.theme.transitionTime}s;
    ${(props) => props.theme.cubicBezier.base};
    position: sticky;
    top: ${({ theme, isNavHidden }) =>
      isNavHidden ? -21 : theme.headerHeight - 21}px;
    z-index: 1;
    background-color: white;
    display: block;
    margin: 100px -45px -40px;
    padding: 20px 45px 10px;
    overflow: hidden;
  }
`;
const StyledGrid = styled(Grid)`
  border-top: ${({ theme, isScrollToAnchorNav }) =>
    isScrollToAnchorNav ? "none" : theme.border.black};
  padding-top: 10px;
  grid-template-columns: repeat(6, 1fr);
  h3,
  span {
    font-size: 13px;
    display: none;
    @media ${(props) => props.theme.minWidth.lg} {
      display: block;
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
    }
  }
`;
const StyledNavLink = styled.a`
  text-align: left;
  display: flex;
  align-items: first baseline;
  color: ${(props) => props.theme.colors.greyLight};
  margin-bottom: 6px;
  &.active,
  &:hover {
    p {
      color: ${(props) => props.theme.colors.black};
    }
    & > div {
      background-color: ${(props) => props.theme.colors.black};
    }
  }
  & > div {
    flex: 0 0 10px;
    background-color: ${(props) => props.theme.colors.greyLight};
  }
  p {
    font-size: 13px;
  }
`;

const AnchorNavBar = ({ data, eservices, twoPointsSectionRef }) => {
  const [ScrollLink, setScrollLink] = useState(null);
  const [isPageChange, setIsPageChange] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrollToAnchorNav, setIsScrollToAnchorNav] = useState(false);
  const anchorNavRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    import("react-scroll")
      .then((mod) => {
        setScrollLink(() => mod.Link);
      })
      .catch(() => {
        setScrollLink(null);
      });
  }, []);

  useEffect(() => {
    setIsPageChange(true);
    setTimeout(() => {
      setIsPageChange(false);
    }, 200);
  }, [location]);

  useEffect(() => {
    const handleIsHidden = () => {
      const twoPointsSectionPosition =
        twoPointsSectionRef.current.getBoundingClientRect().top;
      twoPointsSectionPosition < 300 ? setIsHidden(true) : setIsHidden(false);
    };
    const handleIsScrollToAnchorNav = () => {
      let isAnchorNavReached = false;
      const anchorNavPosFromTop =
        anchorNavRef.current.getBoundingClientRect().top;
      if (anchorNavPosFromTop <= -20) {
        setIsScrollToAnchorNav(true);
        isAnchorNavReached = true;
      }
      if (isAnchorNavReached && anchorNavPosFromTop <= 51) {
        setIsScrollToAnchorNav(true);
      } else if (anchorNavPosFromTop > 51) {
        setIsScrollToAnchorNav(false);
      }
    };
    window.addEventListener("scroll", handleIsHidden);
    window.addEventListener("scroll", handleIsScrollToAnchorNav);
    return () => {
      window.removeEventListener("scroll", handleIsHidden);
      window.removeEventListener("scroll", handleIsScrollToAnchorNav);
    };
  }, [twoPointsSectionRef]);

  return (
    <myContext.Consumer>
      {(context) => (
        <StyledContainer
          isPageChange={isPageChange}
          isNavHidden={context?.isNavHidden}
          isHidden={isHidden}
          ref={anchorNavRef}
        >
          <StyledGrid isScrollToAnchorNav={isScrollToAnchorNav}>
            {eservices ? <h3>Solutions</h3> : <h3>Compétences</h3>}
            {data.map(({ title }, index) => (
              <StyledNavLink
                key={index}
                as={ScrollLink || "a"}
                {...(ScrollLink
                  ? {
                      offset: -40,
                      to: title,
                      activeClass: "active",
                      smooth: true,
                      spy: true,
                    }
                  : { href: `#${title}` })}
              >
                <Dot square={eservices} />
                <p dangerouslySetInnerHTML={{ __html: title }}></p>
              </StyledNavLink>
            ))}
          </StyledGrid>
        </StyledContainer>
      )}
    </myContext.Consumer>
  );
};

export default AnchorNavBar;
