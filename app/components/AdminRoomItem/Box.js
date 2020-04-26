import styled from 'styled-components';

const Box = styled.div`
  ${'' /* children stick to parent border radio */}
  overflow: hidden;
  color: ${props => (props.assignKey === 0 ? '#000' : '#fff')};
  border: 1px solid;
  border-radius: 5px;
  border-color: ${props =>
    props.theme.colors.assign.room.border[props.assignKey]};
  background-color: ${props =>
    props.theme.colors.assign.room.bg[props.assignKey]};

  text-align: center;
  height: 7em;
  width: 7em;
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

  &:after {
    content: '';
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover {
    transform: scale(1.15, 1.15);
  }
  &:hover::after {
    opacity: 1;
  }
`;

export default Box;
