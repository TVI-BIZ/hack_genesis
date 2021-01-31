import { ReactElement } from "react";
import styled from "styled-components";
import Switcher from "./Switcher";

const Container = styled.div`
  width: 100%;
  height: 12%;
  min-height: 60px;
  max-height: 250px;
  background-color: rgba(255, 255, 255, 0.316);
  border-top-left-radius: 2vw;
  border-top-right-radius: 2vw;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.7);
`;

const SwitcherBar = (): ReactElement => (
  <Container>
    <Switcher />
  </Container>
);

export default SwitcherBar;
