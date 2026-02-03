import React, { useState } from "react";
import styled from "styled-components";
import Title from "components/global/Title";
import Grid from "components/global/Grid";
import Accordion from "../Accordion";
import Paragraph from "components/global/Paragraph";
import Cta from "components/global/Cta";
import Dot from "components/global/Dot";

const StyledContainer = styled.div`
  padding-top: 7px;
  border-top: ${(props) => props.theme.border.black};
`;
const StyledPoint = styled.aside`
  margin-bottom: 40px;
  display: flex;
  align-items: baseline;
  @media ${(props) => props.theme.minWidth.sm} {
    margin-bottom: 60px;
  }
  & > div {
    flex: 0 0 10px;
  }
  & > span {
    margin-left: 10px;
  }
  br {
    display: none;
    @media ${(props) => props.theme.minWidth.sm} {
      display: block;
    }
  }
`;
const StyledParagraph = styled(Paragraph)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
const StyledAccordionContainer = styled.div`
  margin-top: 40px;
  @media ${(props) => props.theme.minWidth.md} {
    margin-top: 0;
  }
`;
const StyledTitleGrid = styled(Grid)`
  h1 {
    margin-bottom: 20px;
  }
  & > * {
    grid-column: 1 / 13;
    @media ${(props) => props.theme.minWidth.md} {
      grid-column: 1 / 8;
    }
  }
`;
const StyledContentGrid = styled(Grid)`
  display: block;
  border-top: ${(props) => props.theme.border.black};
  padding-top: 7px;
  @media ${(props) => props.theme.minWidth.md} {
    border-top: none;
    padding-top: 0;
    display: grid;
    grid-template-rows: repeat(2, auto);
    & > * {
      &:nth-child(1) {
        grid-column: 1 / 7;
        border-top: ${(props) => props.theme.border.black};
        padding-top: 7px;
      }
      &:nth-child(2) {
        grid-column: 7 / 13;
        grid-row: 1 / span 2;
      }
      &:nth-child(3) {
        align-self: start;
        grid-column: 1 / 7;
      }
    }
  }
`;
const StyledUseCases = styled.div`
  margin-top: 40px;
  padding-bottom: 70px;
  @media ${(props) => props.theme.minWidth.sm} {
    padding-bottom: 0px;
  }
  & > h2 {
    margin-bottom: 7px;
    @media ${(props) => props.theme.minWidth.sm} {
      margin-bottom: 10px;
    }
  }
  & > div {
    padding-top: 7px;
    border-top: ${(props) => props.theme.border.black};
    @media ${(props) => props.theme.minWidth.sm} {
      padding-top: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: ${(props) => props.theme.columnGap.mobile};
    }
    @media ${(props) => props.theme.minWidth.xl} {
      grid-column-gap: ${(props) => props.theme.columnGap.desktop};
    }
    & > ul {
      &:last-of-type {
        display: ${({ isSeeMoreUseCases }) =>
          isSeeMoreUseCases ? "block" : "none"};
        @media ${(props) => props.theme.minWidth.sm} {
          display: block;
        }
      }
      li {
        font-size: 15px;
        @media ${(props) => props.theme.minWidth.xl} {
          font-size: 16px;
        }
      }
      & > div {
        display: flex;
        margin-bottom: 10px;
        display: ${({ isSeeMoreUseCases }) =>
          isSeeMoreUseCases ? "flex" : "none"};
        @media ${(props) => props.theme.minWidth.sm} {
          margin-bottom: 15px;
          display: flex;
        }
        & > aside {
          margin-right: 7px;
        }
        &:nth-child(1),
        &:nth-child(2) {
          display: flex;
        }
      }
    }
  }
  & > button {
    margin-left: 17px;
    font-size: 15px;
    @media ${(props) => props.theme.minWidth.sm} {
      display: none;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 16px;
    }
  }
`;
const StyledAdditionalSection = styled.section`
  background-color: ${(props) => props.theme.colors.greyLighter};
  grid-column: 1 / span 12;
  padding-top: 35px;
  padding: 15px 15px 70px;
  margin: 0 -15px 95px;
  @media ${(props) => props.theme.minWidth.sm} {
    margin: 45px -24px 0;
    padding: 24px 24px 170px;
  }
  @media ${(props) => props.theme.minWidth.md} {
    margin-top: 60px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    margin: 80px -32px;
    padding: 24px 32px 170px;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    margin: 90px -45px 0;
    padding: 24px 45px 170px;
  }
  & > div {
    border-top: ${(props) => props.theme.border.black};
    padding-top: 7px;
    aside {
      margin-bottom: 25px;
      @media ${(props) => props.theme.minWidth.sm} {
        grid-column: 1 / span 6;
      }
    }
    p {
      margin-bottom: 20px;
      @media ${(props) => props.theme.minWidth.sm} {
        grid-column: 7 / span 6;
      }
    }
  }
`;

const Expertise = ({ expertise }) => {
  const [isSeeMoreUseCases, setIsSeeMoreUseCases] = useState(false);
  const [accordionSectionIndex, setAccordionSectionIndex] = useState(null);

  const handleSeeMoreUseCases = () => {
    setIsSeeMoreUseCases(!isSeeMoreUseCases);
  };

  const handleAccordion = (index) => {
    setAccordionSectionIndex(accordionSectionIndex !== index && index);
  };

  return (
    <StyledContainer>
      <StyledTitleGrid>
        <Title
          type="h1"
          lowercase
          size="expertise"
          html={{ __html: expertise.title }}
        ></Title>
      </StyledTitleGrid>
      <StyledPoint>
        <Dot />
        <Paragraph size="sm">
          Leaders League & Le Point&nbsp;
          <Paragraph size="sm" as="span" color="greyLight">
            Le cabinet est classé parmi les meilleurs
            <br /> cabinets français pour son expertise
          </Paragraph>
        </Paragraph>
      </StyledPoint>
      <StyledContentGrid>
        <div>
          {expertise.description.map((paragraph) => (
            <StyledParagraph
              key={paragraph}
              html={{ __html: paragraph }}
              size="xl"
            ></StyledParagraph>
          ))}
        </div>
        <StyledAccordionContainer>
          {expertise.accordion.map(({ title, content }, index) => (
            <Accordion
              key={title}
              title={title}
              content={content}
              index={index}
              toggle={handleAccordion}
              isOpen={accordionSectionIndex === index}
            />
          ))}
        </StyledAccordionContainer>
        {expertise?.useCases && (
          <StyledUseCases isSeeMoreUseCases={isSeeMoreUseCases}>
            <h2>Exemples de cas traités</h2>
            <div>
              <ul>
                {expertise?.useCases[0]?.map((li, index) => (
                  <div key={index}>
                    <aside>→</aside>
                    <Paragraph
                      color="greyLight"
                      as="li"
                      html={{ __html: li }}
                    ></Paragraph>
                  </div>
                ))}
              </ul>
              <ul>
                {expertise?.useCases[1]?.map((li, index) => (
                  <div key={index}>
                    <aside>→</aside>
                    <Paragraph
                      color="greyLight"
                      as="li"
                      html={{ __html: li }}
                    ></Paragraph>
                  </div>
                ))}
              </ul>
            </div>
            <Cta as="button" onClick={handleSeeMoreUseCases}>
              Voir {isSeeMoreUseCases ? "moins" : "plus"}
            </Cta>
          </StyledUseCases>
        )}
        {expertise.additionalSection && (
          <StyledAdditionalSection>
            <Grid>
              <StyledPoint>
                <Dot />
                <Paragraph
                  size="md"
                  as="h2"
                  html={{ __html: expertise.additionalSection.title }}
                ></Paragraph>
              </StyledPoint>
              {expertise.additionalSection.description.map((paragraph) => (
                <Paragraph
                  key={paragraph}
                  size="md"
                  html={{ __html: paragraph }}
                ></Paragraph>
              ))}
            </Grid>
          </StyledAdditionalSection>
        )}
      </StyledContentGrid>
    </StyledContainer>
  );
};

export default Expertise;
