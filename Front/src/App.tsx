import { ReactElement, useState } from "react";
import Layout from "./components/layout/layout";
import styled from "styled-components";
import "./App.css";
import { ReactComponent as AddSVGButton } from "./assets/add.svg";
import Loading from "./components/loading/loading";
import Presenter from "./components/presenter/presenter";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const InvisibleInput = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const AddFile = (props: any) => (
  <>
    <label htmlFor="uploadFile">
      <AddSVGButton />
      <p>Add File</p>
    </label>
    <InvisibleInput
      onChange={(e) => {
        console.log(e.target.files !== null ? e.target.files[0] : null);
        sendfile(
          props.resultingDataWriter,
          props.inputDataWriter,
          props.loadingFunc,
          e.target.files !== null ? e.target.files[0] : null
        );
      }}
      id="uploadFile"
      name="avatar"
      placeholder="Choose avatar"
      type="file"
    />
  </>
);

const sendfile = (
  resultingDataWriter: any,
  inputDataWriter: any,
  loadingFunc: any,
  file?: any
) => {
  loadingFunc(true);
  const reader = new FileReader();
  const formData = new FormData();
  reader.onload = (event) => inputDataWriter(event.target!.result);
  reader.readAsText(file);
  formData.append("file", file);
  const request = new Request("http://localhost:8080/api/upload_document", {
    method: "POST",
    body: formData,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  fetch(request)
    .then((response) => {
      response.json().then((json) => resultingDataWriter(json));
      loadingFunc(false);
    })
    .catch((e) => {
      loadingFunc(false);
      resultingDataWriter(e.toString());
    });
};

function App(): ReactElement {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [resultingData, setResultingData] = useState<any>(null);
  const [inputData, setInputData] = useState<any>(null);

  if (resultingData) {
    return (
      <Container className="App">
        <header className="App-header"></header>
        <Layout type="presentData">
          <Presenter header="Input Data" data={inputData} />
          <Presenter header="Analytics" data={resultingData} />
        </Layout>
      </Container>
    );
  }

  if (!isLoading) {
    return (
      <Container className="App">
        <header className="App-header"></header>
        <Layout type="addFile">
          <AddFile
            loadingFunc={setIsLoading}
            inputDataWriter={setInputData}
            resultingDataWriter={setResultingData}
          />
        </Layout>
      </Container>
    );
  }
  return (
    <Container className="App">
      <header className="App-header"></header>
      <Layout type="loading">
        <Loading />
      </Layout>
    </Container>
  );
}

export default App;
