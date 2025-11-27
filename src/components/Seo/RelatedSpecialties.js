import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import nbspPonctuation from "components/utils/nbspPonctuation";

const SpecialtiesWrapper = styled.section`
  margin: 80px 0;
  padding: 60px 0;
  background: #f9f9f9;

  @media ${(props) => props.theme.minWidth.md} {
    margin: 100px 0;
    padding: 80px 0;
  }

  @media ${(props) => props.theme.minWidth.lg} {
    margin: 120px 0;
    padding: 100px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  line-height: 34px;
  margin-bottom: 40px;
  font-family: "Söhne Kräftig";
  text-align: center;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 32px;
    line-height: 38px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 36px;
    line-height: 42px;
    margin-bottom: 50px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
`;

const Card = styled(Link)`
  position: relative;
  padding: 35px 30px;
  background: #fff;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 160px;

  @media ${(props) => props.theme.minWidth.md} {
    padding: 40px 35px;
    min-height: 180px;
  }

  &:hover {
    border-color: #000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &::after {
    content: "→";
    position: absolute;
    bottom: 30px;
    right: 30px;
    font-size: 24px;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateX(-10px);

    @media ${(props) => props.theme.minWidth.md} {
      bottom: 35px;
      right: 35px;
    }
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(0);
  }
`;

const CardTitle = styled.h3`
  font-size: 19px;
  line-height: 26px;
  font-family: "Söhne Kräftig";
  margin: 0;
  padding-right: 30px;

  @media ${(props) => props.theme.minWidth.sm} {
    font-size: 20px;
    line-height: 27px;
  }

  @media ${(props) => props.theme.minWidth.md} {
    font-size: 21px;
    line-height: 28px;
  }
`;

const RelatedSpecialties = ({ items, title = "Nos autres expertises" }) => {
  if (!items || items.length === 0) return null;

  return (
    <SpecialtiesWrapper>
      <Container>
        <Title dangerouslySetInnerHTML={{ __html: nbspPonctuation(title) }} />

        <Grid>
          {items.map((item, index) => {
            // Use customH1 if available, otherwise use title
            const displayTitle = item.customH1 || item.title;

            return (
              <Card key={index} to={`/expertises/${item.slug.current}`}>
                <CardTitle
                  dangerouslySetInnerHTML={{
                    __html: nbspPonctuation(displayTitle),
                  }}
                />
              </Card>
            );
          })}
        </Grid>
      </Container>
    </SpecialtiesWrapper>
  );
};

export default RelatedSpecialties;
