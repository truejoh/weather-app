import styled from 'styled-components';

export const Container = styled.div<{ bgColor?: string }>`
  position: relative;
  width: 100wv;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || '#ffffff'};

  .slider {
    position: absolute;
    bottom: 50px;
    width: 300px;
  }
`;

export const Error = styled.div`
  font-size: 24px;
  color: red;
`;

export const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
