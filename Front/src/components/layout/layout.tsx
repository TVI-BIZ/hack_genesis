import { ReactElement } from "react";
import styled from "styled-components";
import SwitcherBar from "../switcherBar/switcherBar";
import { ReactComponent as LogoComponent } from "../../assets/logo.svg";

const Main = styled.div`
  display: grid;
  place-items: center;
  width: 70vw;
  height: 70vh;
  border-radius: 2vw;
  background-color: rgba(255, 255, 255, 0.3);
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background: radial-gradient(
    100% 316.05% at 0% 0%,
    rgba(173, 85, 250, 0.7) 0%,
    rgba(79, 79, 255, 0.4) 100%
  );
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 12vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Layout = ({ children, type }: { children: any; type: string }) => {
  console.log(typeof children === "string");

  if (type === "presentData") {
    return (
      <Container>
        <LogoContainer>
          <LogoComponent />
        </LogoContainer>
        <Main>
          <FlexContainer>
            {children.map((child: any) => {
              return child;
            })}
          </FlexContainer>
        </Main>
      </Container>
    );
  } else {
    return (
      <Container>
        <LogoContainer>
          <LogoComponent />
        </LogoContainer>
        <Main>{children}</Main>
      </Container>
    );
  }
};

export default Layout;
