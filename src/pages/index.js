import * as React from "react";
import Layout from "components/Layout";
import HeroSection from "components/pages/home/sections/HeroSection";
import VousProteger from "components/pages/home/sections/VousProteger";
import NosSolution from "components/pages/home/sections/NosSolution";
import VousFormer from "components/pages/home/sections/VousFormer";
import ALaUne from "components/pages/home/sections/ALaUne";
import VosExperts from "components/pages/home/sections/VosExperts";
import VosTemoignages from "components/pages/home/sections/VosTemoignages";
import DansLaPresse from "components/pages/home/sections/DansLaPresse";
import Seo from "components/Seo";
import styled from "styled-components";

const StyledALaUne = styled(ALaUne)`
  margin-top: 110px;
  @media ${(props) => props.theme.minWidth.md} {
    margin-top: 130px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    margin-top: 160px;
  }
`;

// Test comment

const IndexPage = () => {
  return (
    <>
      <Seo />
      <Layout>
        <div className="pageAnimation">
          <HeroSection />
          <VousProteger />
          <NosSolution />
          <VousFormer />
          <StyledALaUne />
          <VosExperts />
          <VosTemoignages />
          <DansLaPresse />
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
