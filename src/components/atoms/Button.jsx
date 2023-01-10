import styled from 'styled-components';

const color = {
  green: '#4ADE80',
  blue: '#60A5FA',
  red: '#FA4639',
  gray: '#64748B',
};

export const Button = styled.button`
  padding:0.7em 2em;
  background-color:${({ type }) => color[type]};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  font-size: 1em;
  color: #FFFFFF;
`;
