import React from "react";
import styled from "styled-components";
import Layout from "components/Layout";

const StyledIframe = styled.iframe`
  width: 100%;
  margin-top: 72px;
  height: 100vh;
  border: 0;
  @media ${({ theme }) => theme.minWidth.md} {
    margin-top: 0;
  }
`;

const Consultation = () => {
  return (
    <Layout>
      <StyledIframe
        title="consultation"
        src="https://site.tlmr-avocats.com/consultation/"
      ></StyledIframe>
    </Layout>
  );
};

export default Consultation;
