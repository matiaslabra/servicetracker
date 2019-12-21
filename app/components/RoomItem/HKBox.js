import styled from 'styled-components';

const HKBox = styled.div`
border: 2.5px solid;
border-color: ${props => {
  if(props.assignKey == 0){
    return '#fff';
  }else if(props.assignKey == 1){
    return '#22a6b3';
  }else if(props.assignKey == 2){
    return '#eb4d4b';
  }else if(props.assignKey == 3){
    return '#f9ca24';
  }else if(props.assignKey == 4){
    return '#f0932b';
  }else if(props.assignKey == 5){
    return '#eb4d4b';
  }
}};
  color: ${props => props.hkKey == 0 ? '#000' : '#fff'};
  text-align: center;
  height: 7em;
  width: 7em;
  margin: 10px;

  // Room numer non selectable
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  // to vertically align content
  display: flex;
  justify-content: center;
  flex-direction: column;

  position: relative;
  background-color:
    ${props => {
      if(props.hkKey == 0){
        return '#e5e6e6';
      }else if(props.hkKey == 1){
        return '#22a6b3';
      }else if(props.hkKey == 2){
        return '#22a6b3';
      }else if(props.hkKey == 3){
        return '#f0932b';
      }
    }};
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:after {
    content: "";
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover {
    -webkit-transform: scale(1.25, 1.25);
    transform: scale(1.25, 1.25);
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
