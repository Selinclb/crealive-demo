import { createGlobalStyle } from 'styled-components';
import FuturaLightFont from '../assets/fonts/Futura-Light.ttf';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Futura Light';
    src: url(${FuturaLightFont}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'DIN Next Light';
    src: url('/fonts/DIN-Next-LT-W04-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'DIN Neuzeit Grotesk';
    src: url('/fonts/DIN-Neuzeit-Grotesk-W01-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DIN Next Light', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background-color: #ffffff;
    color: #000000;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'DIN Neuzeit Grotesk', sans-serif;
    font-weight: bold;
  }

  p, span, a, div, input, textarea {
    font-family: 'DIN Next Light', sans-serif;
    font-weight: 300;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;