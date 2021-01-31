import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-top-left-radius: 2vw;
  border-top-right-radius: 2vw;
  filter: blur;
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.7);
  width: 20%;
`;

const SwitcherItem = styled.div`
  color: rgba(0, 0, 0, 0.43);
  padding: 5px;
`;

const ActiveSwitcherItem = styled(SwitcherItem)`
  color: #000000;
`;

const getButton = (type: String, isActive: Boolean) => {
  switch (type) {
    case "Upload":
      return isActive ? (
        <ActiveSwitcherItem>Upload</ActiveSwitcherItem>
      ) : (
        <SwitcherItem>Upload</SwitcherItem>
      );
    case "Analytics":
      return isActive ? (
        <ActiveSwitcherItem>Analytics</ActiveSwitcherItem>
      ) : (
        <SwitcherItem>Analytics</SwitcherItem>
      );
  }
};

const Switcher = () => {
  const [state, setState] = useState("Upload");
  return (
    <Container>
      {getButton("Upload", state === "Upload")}
      {getButton("Analytics", state === "Analytics")}
    </Container>
  );
};

export default Switcher;
