import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1rem;
  border-bottom: 1px solid transparent;
  margin: 0 1.5rem;
  transition: all 300ms linear 0s;
  text-decoration: none;
  cursor: pointer;
  z-index: 1;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;
