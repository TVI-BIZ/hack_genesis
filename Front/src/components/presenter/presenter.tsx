import styled from "styled-components";

const Container = styled.div`
  min-width: 50px;
  min-height: 70px;
  width: 17vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; ;
`;

const Header = styled.h2``;

const Window = styled.div`
  border-radius: 2vw;
  background-color: rgba(255, 254, 254, 0.18);
  height: 40vh;
  width: 100%;
  align-items: center;
  overflow: scroll;
  overflow-wrap: break-word;
  padding: 2vw 0;
`;

const Presenter = ({ data, header }: { data: any; header: string }) => {
  return (
    <Container>
      <Header>{header}</Header>
      <Window>{JSON.stringify(data)}</Window>
    </Container>
  );
};

export default Presenter;
