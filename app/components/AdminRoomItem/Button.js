import styled from 'styled-components';

const Button = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-size: 0.85em;
  font-weight: 300;
  color: ${props => (props.status ? '#fff' : '#000')};
  background-color: ${props =>
    props.status === true ? 'transparent' : '#e5e6e6'};
  border-bottom: 1px solid white;
`;

export default Button;
