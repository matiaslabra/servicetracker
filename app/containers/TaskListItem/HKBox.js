import styled from 'styled-components';

const HKBox = styled.div`
  margin: 5px;
  border: 1px solid;
  color: '#fff';
  background-color: ${props => props.theme.colors.hk.task.bg[props.hkKey]};
  border-color: ${props => props.theme.colors.hk.task.bg[props.hkKey]};
  ${'' /* room number non selectable */}
  user-select: none;
  ${'' /* vertically align content */}
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 50px;
  position: relative;
  border-radius: 5px;
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

export default HKBox;
