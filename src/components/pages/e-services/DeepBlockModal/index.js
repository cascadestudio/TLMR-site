import React, { useEffect } from "react";
import styled from "styled-components";
import Paragraph from "components/global/Paragraph";
import croix from "assets/icons/croix.svg";

const StyledContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all ${({ theme }) => theme.transitionTime}s
    ${({ theme }) => theme.baseCubicBezier};
  z-index: 2;
  @media ${(props) => props.theme.minWidth.md} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledModal = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 9px;
  overflow-y: scroll;
  position: relative;
  padding: 55px 15px env(safe-area-inset-bottom);
  height: 100vh;
  @media ${(props) => props.theme.minWidth.md} {
    width: 850px;
    padding: 55px 0 0;
    height: 650px;
  }
  header {
    background-color: white;
    padding: 15px 15px 10px 0;
    position: absolute;
    top: 0;
    @media ${(props) => props.theme.minWidth.md} {
      padding: 15px 15px 10px 25px;
    }
    button {
      cursor: pointer;
    }
  }
  iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
    margin-bottom: 100px;
    @media ${(props) => props.theme.minWidth.md} {
      margin-bottom: 0;
    }
  }
`;

const DeepBlockModal = ({ isVisible, handleModal }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isVisible]);

  return (
    <StyledContainer isVisible={isVisible}>
      <StyledModal>
        <header>
          <button type="button" onClick={handleModal}>
            <img src={croix} alt="" />
          </button>
        </header>
        <iframe
          title="Deep Block"
          src="https://form.openlogs.fr/form?token=6184f83054bf3d3aa550d43e10ba309fc30ddc4c6b568f508b7d7b9d0f872847"
        ></iframe>
      </StyledModal>
    </StyledContainer>
  );
};

export default DeepBlockModal;
