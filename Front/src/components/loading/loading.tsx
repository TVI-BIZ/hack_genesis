import styled from "styled-components";

const SVGLoader = styled.div`
  display: flex;
  position: relative;
  align-content: space-around;
  justify-content: center;
  z-index: 1000;
`;

const SVGContainer = styled.svg``;

const LoaderSVG = styled.circle`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  stroke: rgb(64, 0, 148);
`;

const LoaderSVGBG = styled(LoaderSVG)`
  stroke-width: 8px;
  stroke: rgb(207, 205, 245);
`;

const LoaderSVGAnimated = styled(LoaderSVG)`
  stroke-dasharray: 242.6;
  animation: fill-animation 1s cubic-bezier(1, 1, 1, 1) 0s infinite;

  @keyframes fill-animation {
    0% {
      stroke-dasharray: 40 242.6;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 141.3;
      stroke-dashoffset: 141.3;
    }
    100% {
      stroke-dasharray: 40 242.6;
      stroke-dashoffset: 282.6;
    }
  }
`;

const Loading = () => (
  <SVGLoader>
    <SVGContainer height="100" width="100" viewBox="0 0 100 100">
      <LoaderSVGBG cx="50" cy="50" r="45"></LoaderSVGBG>
      <LoaderSVGAnimated cx="50" cy="50" r="45"></LoaderSVGAnimated>
    </SVGContainer>
  </SVGLoader>
);

export default Loading;
