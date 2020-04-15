import styled from 'styled-components';

const Additional = styled.div`
  position: absolute;
  width: 75px;
  height: 100%;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  z-index: 2;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 10%;
    right: -2px;
    height: 80%;
  }

  &:hover {
    width: 100%;
  }
`;

export default Additional;
