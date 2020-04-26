import styled from 'styled-components';

const Box = styled.div`
  ${'' /* children stick to parent border radio */}
  overflow: hidden;
  color: '#fffff';
  border: 1px solid;
  border-radius: 5px;
  border-color: ${props => props.theme.colors.assign.room.bg[props.assignKey]};
  background-color: ${props => props.theme.colors.hk.room.bg[props.hkKey]};
  background-position: center;
  text-align: center;
  height: 10rem;
  width: 7.5rem;
  margin: 10px;

  ${'' /* Room number non selectable */}
  -webkit-touch-callout: none;
  user-select: none;

  ${'' /* vertically align content */}
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  @media (min-width: 768px) {
    &:hover {
      transform: scale(1.15, 1.15);
    }
  }
  @media (max-width: 600px) {
    &:hover {
      background: white radial-gradient(circle, transparent 1%, $focus-color 1%)
        center/15000%;
    }
    &:active {
      background-color: white;
      background-size: 100%;
      transition: background 0s;
    }
  }
`;

export default Box;
