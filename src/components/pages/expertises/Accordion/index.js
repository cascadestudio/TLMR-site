import React, { useState, useRef } from "react";
import styled from "styled-components";
import ToggleBtn from "./ToggleBtn";
import Paragraph from "components/global/Paragraph";

const StyledContainer = styled.section`
  &:last-child {
    border-bottom: ${(props) => props.theme.border.black};
  }
  h3,
  p {
    font-size: 15px;
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 16px;
    }
  }
`;
const StyledHeader = styled.div`
  padding: 7px 0;
  @media ${(props) => props.theme.minWidth.sm} {
    padding: 9px 0;
  }
  border-top: ${(props) => props.theme.border.black};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    & > h3 {
      color: ${(props) => props.theme.colors.grey};
    }
  }
  & > div {
    position: relative;
    top: -1px;
  }
`;
const StyledContent = styled.div`
  padding-bottom: ${(props) => (props.isSectionOpen ? "10px" : "0")};
  opacity: ${(props) => (props.isSectionOpen ? "1" : "0")};
  transition: all 400ms ${(props) => props.theme.cubicBezier.base};
  height: ${(props) =>
    props.isSectionOpen ? props.contentHeight + 20 + "px" : "0"};
  overflow-y: hidden;
`;

const StyledUseCasesList = styled.div`
  margin-top: 15px;
  padding-top: 12px;
  border-top: 1px solid ${(props) => props.theme.colors.greyLight};
`;

const UseCasesTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.grey};
  @media ${(props) => props.theme.minWidth.xl} {
    font-size: 14px;
  }
`;

const UseCaseItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Arrow = styled.span`
  margin-right: 8px;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.greyLight};
`;

const Accordion = ({ title, content, useCases, isOpen, toggle, index, children }) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleSection = () => {
    setContentHeight(contentRef.current.scrollHeight);
    toggle(index);
  };

  return (
    <StyledContainer>
      <StyledHeader onClick={toggleSection}>
        <Paragraph as="h3" html={{ __html: title }}></Paragraph>
        <ToggleBtn isSectionOpen={isOpen} />
      </StyledHeader>
      <StyledContent
        isSectionOpen={isOpen}
        contentHeight={contentHeight}
        ref={contentRef}
      >
        {children ? (
          children
        ) : (
          <>
            <Paragraph color={"greyLight"} html={{ __html: content }}></Paragraph>
            {useCases && useCases.length > 0 && (
              <StyledUseCasesList>
                <UseCasesTitle>Exemples de cas traités</UseCasesTitle>
                {useCases.map((useCase, idx) => (
                  <UseCaseItem key={idx}>
                    <Arrow>→</Arrow>
                    <Paragraph
                      color="greyLight"
                      as="span"
                      html={{ __html: useCase }}
                    />
                  </UseCaseItem>
                ))}
              </StyledUseCasesList>
            )}
          </>
        )}
      </StyledContent>
    </StyledContainer>
  );
};

export default Accordion;
