import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import GlobalStyle from "styles/globalStyle";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CTASticky from "components/Seo/CTASticky";

const StyledContainer = styled.div`
  position: relative;
  padding: 0 15px;
  @media ${(props) => props.theme.minWidth.sm} {
    padding: 0 24px;
  }
  @media ${(props) => props.theme.minWidth.lg} {
    padding: 0 32px;
  }
  @media ${(props) => props.theme.minWidth.xl} {
    padding: 0 45px;
  }
`;

const Layout = ({ children, breadcrumb }) => {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation />
        {breadcrumb && <StyledContainer>{breadcrumb}</StyledContainer>}
        <StyledContainer>
          {children}
          <Footer />
        </StyledContainer>

        {/* Global Sticky CTA - appears on mobile/tablet only, on all pages */}
        <CTASticky
          text="Réservez un rendez-vous avec un avocat"
          to="/contact"
        />
      </ThemeProvider>
    </main>
  );
};

export default Layout;
