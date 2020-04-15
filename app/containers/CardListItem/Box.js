import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 75px;
  height: 100%;
  position: relative;
  float: left;
  justify-content: center;
  text-align: center;
  border-right: 1px solid white;

  background: ${props => {
    if (props.hkKey == 0) {
      return '#f0932b';
    }
    if (props.hkKey == 2) {
      return '#eb4d4b';
    }
    if (props.hkKey == 3) {
      return '#f9ca24';
    }
    if (props.hkKey == 4) {
      return '#f0932b';
    }
    if (props.hkKey == 5) {
      return '#eb4d4b';
    }
  }};
`;

export default Box;
