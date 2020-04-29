import styled from 'styled-components';

const AssignBox = styled.li`
  margin: 5px;
  border-bottom: 1px solid #ccc;
  color: ${props => (props.assignKey === 0 ? '#000' : '#fff')};
  background-color: ${props =>
    props.theme.colors.assign.task.bg[props.assignKey]};
  ${'' /* Room numer non selectable */}
  user-select: none;
  text-transform: uppercase;
  font-size: 1rem;
  ${'' /* to vertically align content */}
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  height: 50px;

  position: relative;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
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
    transform: scale(1.05, 1.05);
  }
  &:hover::after {
    opacity: 1;
  }
`;

/**
 * Colors:
 * green: #6ab04c
 * red : eb4d4b
 * yellow: f9ca24
 * orange: f0932b
 */

export default AssignBox;
