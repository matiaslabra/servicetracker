import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  box-sizing: border-box;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;

  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid #e5e6e6;
  ${props =>
    props.disabled
      ? css`
          color: #e5e6e6;
        `
      : css`
          color: 'black';
          cursor: pointer;
        `};
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover:enabled {
    background: #22a6b3;
    color: #fff;
    border: 2px solid #22a6b3;
  }
`;

export default StyledButton;
