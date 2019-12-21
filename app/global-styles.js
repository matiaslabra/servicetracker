import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: subpixel-antialiased;

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

  p,
  label {
    font-size:1.5em;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
