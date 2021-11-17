import styled from 'styled-components';

export const Container = styled.div<{ bgColor: string }>`
  position: relative;
  width: 100wv;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};

  .slider {
    position: absolute;
    bottom: 50px;
    width: 300px;
  }
`;

export const WeatherContainer = styled.div``;
