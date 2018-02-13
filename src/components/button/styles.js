import styled from 'styled-components';
import { SMALLER } from '../../styles/sizes.js';

const Wrapper = styled.div`
  margin: top: 1rem;
  width: 100%;
  height: 2rem;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
	background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
  border: 0 none;
  text-transform: uppercase;
  padding: ${SMALLER} 1rem;
  font-weight: 700;
  border-radius: 5px;
  transition: color linear 0.2s, background-color linear 0.2s;

  &:disabled {
    color: ${props => props.theme.disabledColor};
    background-color: ${props => props.theme.disabledBackgroundColor};
  }

  &:hover {
    color: ${props => props.theme.hoverColor};
    background-color: ${props => props.theme.hoverBackgroundColor};
    cursor: pointer;
  }

  &:disabled:hover {
    color: ${props => props.theme.disabledColor};
    background-color: ${props => props.theme.disabledBackgroundColor};
    cursor: default
  }
`;

export { Wrapper, Button };
