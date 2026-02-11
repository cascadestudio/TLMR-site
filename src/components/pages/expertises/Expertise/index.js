import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Title from "components/global/Title";
import Grid from "components/global/Grid";
import Accordion from "../Accordion";
import Paragraph from "components/global/Paragraph";
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
const StyledContentGrid = styled.div`
  display: block;
  border-top: ${(props) => props.theme.border.black};
  padding-top: 7px;
  @media ${(props) => props.theme.minWidth.md} {
    border-top: none;
    padding-top: 0;
    display: flex;
    gap: ${(props) => props.theme.columnGap.mobile};
    align-items: flex-start;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    gap: ${(props) => props.theme.columnGap.desktop};
  }
`;

const StyledLeftColumn = styled.div`
  @media ${(props) => props.theme.minWidth.md} {
    flex: 0 0 calc(50% - 12px);
    & > *:first-child {
      border-top: ${(props) => props.theme.border.black};
      padding-top: 7px;
    }
  }
  @media ${(props) => props.theme.minWidth.xl} {
    flex: 0 0 calc(50% - 22px);
  }
`;

const StyledRightColumn = styled.div`
  @media ${(props) => props.theme.minWidth.md} {
    flex: 0 0 calc(50% - 12px);
  }
  @media ${(props) => props.theme.minWidth.xl} {
    flex: 0 0 calc(50% - 22px);
  }
`;
const StyledMoneyPagesSection = styled.div`
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
`;

const MoneyPagesGrid = styled.div`
  padding-top: 7px;
  border-top: ${(props) => props.theme.border.black};
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media ${(props) => props.theme.minWidth.sm} {
    padding-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${(props) => props.theme.columnGap.mobile};
    gap: 12px;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    grid-column-gap: ${(props) => props.theme.columnGap.desktop};
  }
`;

const MoneyPageCard = styled(Link)`
  display: block;
  padding: 16px 20px;
  background: #fff;
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    transform: translateY(-2px);
    border-color: #888888;
  }
`;

const CardTitle = styled.h3`
  font-family: "Söhne Kräftig";
  font-size: 15px;
  line-height: 1.4;
  color: #000;
  margin: 0 0 4px;
  @media ${(props) => props.theme.minWidth.xl} {
    font-size: 16px;
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CardArrow = styled.span`
  display: inline-block;
  margin-right: 6px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  ${MoneyPageCard}:hover & {
    transform: translateX(4px);
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

const Expertise = ({ expertise, moneyPages = [] }) => {
  const [accordionSectionIndex, setAccordionSectionIndex] = useState(null);

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
        <StyledLeftColumn>
          <div>
            {expertise.description.map((paragraph) => (
              <StyledParagraph
                key={paragraph}
                html={{ __html: paragraph }}
                size="xl"
              ></StyledParagraph>
            ))}
          </div>
          {moneyPages && moneyPages.length > 0 && (
            <StyledMoneyPagesSection>
              <h2>Nos services</h2>
              <MoneyPagesGrid>
                {moneyPages.map((page) => (
                  <MoneyPageCard
                    key={page.slug.current}
                    to={`/expertises/${page.slug.current}`}
                  >
                    <CardTitle>
                      <CardContent>
                        <CardArrow>→</CardArrow>
                        <span>{page.customH1}</span>
                      </CardContent>
                    </CardTitle>
                  </MoneyPageCard>
                ))}
              </MoneyPagesGrid>
            </StyledMoneyPagesSection>
          )}
        </StyledLeftColumn>
        <StyledRightColumn>
          <StyledAccordionContainer>
            {expertise.accordion.map(({ title, content, useCases }, index) => (
              <Accordion
                key={title}
                title={title}
                content={content}
                useCases={useCases}
                index={index}
                toggle={handleAccordion}
                isOpen={accordionSectionIndex === index}
              />
            ))}
          </StyledAccordionContainer>
        </StyledRightColumn>
      </StyledContentGrid>
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
    </StyledContainer>
  );
};

export default Expertise;
