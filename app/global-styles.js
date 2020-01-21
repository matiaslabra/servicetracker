import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *,
  *::after,
  *::before {
    margin: 0px;
    padding: 0px;
  }


  html {
    height: 100%;
    width: 100%;
    font-size: 16px;
    line-height: 1.6;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: subpixel-antialiased;
    box-sizing: border-box;
    height: 100%;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    height: 100%;
    min-width: 100%;
    background-color: #fff;
  }

  article {
    flex: 1 1 auto;
    position: relative;
    overflow-y: auto;
    padding: 0em 2.5em 5em;
  }

`;

export default GlobalStyle;
