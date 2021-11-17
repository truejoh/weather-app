import styled from 'styled-components';

export const Container = styled.div<{ bgColor: string }>`
  width: 100wv;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
`;
