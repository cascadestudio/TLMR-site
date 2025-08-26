import React, { useState } from "react";
import styled from "styled-components";
import Paragraph from "components/global/Paragraph";
import { StaticImage } from "gatsby-plugin-image";
import AccordionSection from "./AccordionSection";
import linkedinLogo from "assets/logos/linkedin.svg";

const StyledContainer = styled.div`
  margin-bottom: 80px;
  h3,
  aside {
    font-size: 22px;
    line-height: 26px;
    @media ${(props) => props.theme.minWidth.sm} {
      font-size: 25px;
      line-height: 30px;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      font-size: 30px;
      line-height: 34px;
    }
  }
  h3 {
    margin-top: 10px;
    @media ${(props) => props.theme.minWidth.lg} {
      margin-top: 20px;
    }
  }
  aside {
    color: ${(props) => props.theme.colors.grey};
    margin-bottom: 25px;
    @media ${(props) => props.theme.minWidth.md} {
      margin-bottom: 35px;
    }
  }
  p {
    margin-bottom: 30px;
  }
  a {
    margin-top: 10px;
    width: fit-content;
  }
`;

const TeammateCard = ({
  imgName,
  name,
  post,
  description,
  experiences,
  engagements,
  linkedinUrl,
}) => {
  const basePath = "../../../../assets/imgs/EQUIPE/";
  const [openAccordionSection, setOpenAccordionSection] = useState(null);

  const handleAccordion = (title) => {
    setOpenAccordionSection(openAccordionSection !== title && title);
  };

  return (
    <StyledContainer>
      {imgName === "henri" && (
        <StaticImage src={basePath + "henri.jpg"} alt={name} aspectRatio={1} />
      )}
      {imgName === "jean-philippe" && (
        <StaticImage src={basePath + "jean.jpg"} alt={name} aspectRatio={1} />
      )}
      {imgName === "elea" && (
        <StaticImage src={basePath + "elea.jpg"} alt={name} aspectRatio={1} />
      )}
      {imgName === "myriam" && (
        <StaticImage src={basePath + "myriam.jpg"} alt={name} aspectRatio={1} />
      )}
      {imgName === "camille" && (
        <StaticImage
          src={basePath + "camille.jpg"}
          alt={name}
          aspectRatio={1}
        />
      )}
      {imgName === "evanthia" && (
        <StaticImage
          src={basePath + "evanthia.jpg"}
          alt={name}
          aspectRatio={1}
        />
      )}
      {imgName === "emmeline" && (
        <StaticImage
          src={basePath + "emmeline.png"}
          alt={name}
          aspectRatio={1}
        />
      )}
      <h3>{name}</h3>
      <aside>{post}</aside>
      <Paragraph>{description}</Paragraph>
      <AccordionSection
        isOpen={handleAccordion}
        openAccordionSection={openAccordionSection}
        title="Formation et expérience"
        data={experiences}
      />
      <AccordionSection
        openAccordionSection={openAccordionSection}
        isOpen={handleAccordion}
        title="Engagements"
        data={engagements}
      />
      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noreferrer">
          <img src={linkedinLogo} alt="" />
        </a>
      )}
    </StyledContainer>
  );
};

export default TeammateCard;
