import { createGlobalStyle } from "styled-components/macro";
import SohneBuch from "assets/fonts/soehne-buch.woff2";
import SöhneBreitBuch from "assets/fonts/soehne-breit-buch.woff2";
import SöhneKräftig from "assets/fonts/soehne-kraftig.woff2";
import SignifierLight from "assets/fonts/signifier-light.woff2";
import SignifierLightItalic from "assets/fonts/signifier-light-italic.woff2";
import SignifierMedium from "assets/fonts/signifier-medium.woff2";

export default createGlobalStyle`

@font-face {
  font-family: "Söhne Buch";
  src: url(${SohneBuch}) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Söhne Kräftig";
  src: url(${SöhneKräftig}) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "SöhneBreit Buch";
  src: url(${SöhneBreitBuch}) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Signifier Light";
  src: url(${SignifierLight}) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Signifier Light Italic";
  src: url(${SignifierLightItalic}) format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "Signifier Medium";
  src: url(${SignifierMedium}) format("woff2");
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
}

html, body {
  overscroll-behavior-y: none;
  box-sizing: border-box;
}

body {
  width: 100%;
  position: relative;
  overflow-x: clip;
}

h1,
h2,
h3,
h4,
p,
a,
button,
div,
q,
input,
select,
textarea,
nav,
iframe { 
  margin: 0;
  padding: 0;
  font-family: "Söhne Buch", sans-serif;
  font-size: 16px;
  font-weight: 400;
  display: block;
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
  display: block;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.grey};
    & * {
      color: ${(props) => props.theme.colors.grey};
    }
  }
}

li {
  list-style: none;
}

button {
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.colors.black};
  &:hover {
    color: ${(props) => props.theme.colors.grey};
  }
}

main {
  width: 100%;
  box-sizing: border-box;
}

.pageAnimation {
  animation: pageAnimation 2s ${({ theme }) => theme.cubicBezier.base} forwards;
  opacity: 0;
}

@keyframes pageAnimation {
  100% {
    opacity: 1;
  }
}

.text-ordinal {
  font-variant-numeric: ordinal;
}

b {
  font-weight: normal;
  font-family: "Söhne Kräftig", sans-serif;
}
`;
