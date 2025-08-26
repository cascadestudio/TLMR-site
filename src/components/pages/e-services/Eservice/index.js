import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Grid from "components/global/Grid";
import Title from "components/global/Title";
import Paragraph from "components/global/Paragraph";

const StyledContainer = styled(Grid)`
  padding-bottom: 90px;
  padding-top: 15px;
  border-top: ${(props) => props.theme.border.black};
  @media ${(props) => props.theme.minWidth.sm} {
    padding-top: 20px;
    padding-bottom: 30px;
  }
  @media ${(props) => props.theme.minWidth.md} {
    padding-top: 35px;
  }
  & > .gatsby-image-wrapper {
    max-height: 600px;
    grid-column: 1 / span 12;
    aspect-ratio: 1.12;
    @media ${(props) => props.theme.minWidth.sm} {
      aspect-ratio: 1.85;
    }
    @media ${(props) => props.theme.minWidth.md} {
      aspect-ratio: 1.1;
      grid-column: 1 / span 6;
    }
    @media ${(props) => props.theme.minWidth.xl} {
      width: 100%;
    }
    @media ${(props) => props.theme.minWidth.xxl} {
      grid-column: 1 / span 7;
    }
  }
  & > div:last-of-type {
    grid-column: 1 / span 12;
    @media ${(props) => props.theme.minWidth.md} {
      grid-column: 8 / span 6;
      position: relative;
      top: -8px;
    }
    @media ${(props) => props.theme.minWidth.xxl} {
      grid-column: 9 / 13;
    }
    & > h1 {
      margin-top: 10px;
      margin-bottom: 40px;
      @media ${(props) => props.theme.minWidth.sm} {
        margin-top: 20px;
      }
      @media ${(props) => props.theme.minWidth.md} {
        margin-top: 0px;
        font-size: 22px;
        line-height: 27px;
      }
      @media ${(props) => props.theme.minWidth.lg} {
        font-size: 25px;
        line-height: 30px;
        margin-bottom: 50px;
      }
      @media ${(props) => props.theme.minWidth.xl} {
        margin-bottom: 55px;
        font-size: 30px;
        line-height: 35px;
      }
    }
    & > p {
      margin-top: 35px;
      @media ${(props) => props.theme.minWidth.md} {
        font-size: 15px;
        line-height: 19px;
      }
      &:first-of-type {
        margin-top: -10px;
      }
    }
    & > ol {
      margin-top: 55px;
      @media ${(props) => props.theme.minWidth.sm} {
        margin-top: 40px;
      }
      li {
        display: flex;
        padding-top: 8px;
        border-top: ${(props) => props.theme.border.black};
        margin-bottom: 10px;
        & > p {
          font-size: 15px;
        }
        & > aside {
          font-family: "SöhneBreit Buch", sans-serif;
          font-size: 50px;
          margin-right: 30px;
          position: relative;
          top: -15px;
          flex: 0 0 50px;
          @media ${(props) => props.theme.minWidth.sm} {
            flex: 0 0 200px;
          }
          @media ${(props) => props.theme.minWidth.md} {
            flex: 0 0 80px;
            font-size: 60px;
            top: -15px;
          }
        }
      }
    }
    div {
      & > a,
      button {
        width: 100%;
        border-radius: 100px;
        padding: 5px 15px 6px;
        text-align: left;
        font-size: 14px;
        &:nth-child(1) {
          background-color: ${(props) => props.theme.colors.blackLight};
          color: white;
          margin: 35px 0 10px;
          @media ${(props) => props.theme.minWidth.md} {
            margin: 60px 0 10px;
          }
          &:hover {
            background-color: ${(props) => props.theme.colors.grey};
          }
        }
        &:nth-child(2) {
          background-color: ${(props) => props.theme.colors.greyLightest};
          &:hover {
            color: white;
            background-color: ${(props) => props.theme.colors.grey};
          }
        }
      }
    }
    & > aside {
      margin-top: 50px;
      font-size: 12px;
      padding: 5px 0;
      border-top: ${(props) => props.theme.border.greyLightest};
      border-bottom: ${(props) => props.theme.border.greyLightest};
    }
  }
`;

const Eservice = ({
  title,
  description,
  points,
  btns,
  handleDeepBlockModal,
  handleSeraphinLegalModal,
  handleContactModal,
}) => {
  return (
    <>
      <StyledContainer>
        {title === "Protection des créations" ? (
          <StaticImage
            src="../../../../assets/imgs/ESERVICES/protection.jpg"
            alt="TLMR - L’excellence accessible"
            objectPosition="43% 50%"
          />
        ) : title === "Signature électronique" ? (
          <StaticImage
            src="../../../../assets/imgs/ESERVICES/signature.jpg"
            alt="TLMR - L’excellence accessible"
          />
        ) : title ===
          "Générateur de politique de confidentialité conforme RGPD" ? (
          <StaticImage
            src="../../../../assets/imgs/ESERVICES/rgpd.jpg"
            alt="TLMR - L’excellence accessible"
            objectPosition="100% 50%"
          />
        ) : title === "Legal design" ? (
          <StaticImage
            src="../../../../assets/imgs/ESERVICES/legaldesign.jpg"
            alt="TLMR - L’excellence accessible"
          />
        ) : title === "Consultation juridique" ? (
          <StaticImage
            src="../../../../assets/imgs/ESERVICES/consultation.jpg"
            alt="TLMR - L’excellence accessible"
          />
        ) : null}
        <div>
          <Title size="xs" type="h1">
            {title}
          </Title>
          {description.map((paragraph) => (
            <Paragraph key={paragraph} html={{ __html: paragraph }}></Paragraph>
          ))}
          <ol>
            {points?.map((point, index) => (
              <li key={point}>
                <aside>{index + 1}</aside>
                <Paragraph>{point}</Paragraph>
              </li>
            ))}
          </ol>
          <div>
            {btns?.map((btn) =>
              btn.contactModal ? (
                <button
                  key={btn.name}
                  onClick={() => handleContactModal(title)}
                >
                  {btn.name}
                </button>
              ) : btn.deepBlock ? (
                <button key={btn.name} onClick={() => handleDeepBlockModal()}>
                  {btn.name}
                </button>
              ) : btn.seraphinLegal ? (
                <button
                  key={btn.name}
                  onClick={() => handleSeraphinLegalModal()}
                >
                  {btn.name}
                </button>
              ) : btn.externlink ? (
                <a
                  href={btn.link}
                  key={btn.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {btn.name}
                </a>
              ) : (
                <Link to={btn.link} key={btn.name}>
                  {btn.name}
                </Link>
              )
            )}
          </div>
          {title === "Protection des créations" && (
            <aside>
              Service fourni par Deep Block™, opérateur de Blockchain Légale.
            </aside>
          )}
          {title === "Signature électronique" && (
            <aside className="vitalsign">
              Signature Minute est une Solution de la Societé DeepBlock,
              LegalTech française qui vous garantit un haut niveau de
              confidentialité.
            </aside>
          )}
        </div>
      </StyledContainer>
    </>
  );
};

export default Eservice;
