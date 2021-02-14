import { useState } from "react";
import FilePrompt from "./FilePrompt";
import FileContents from "./FileContents";
function App() {
  const [variables, setVariables] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [arrowFunctions, setArrowFunctions] = useState([]);
  const [forLoops, setForLoops] = useState([]);
  const [whileLoops, setWhileLoops] = useState([]);
  const [ifStatements, setIfStatements] = useState([]);
  const [physicalLOC, setPhysicalLOC] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>JS L.O.C</h1>
      {isLoaded ? (
        <FileContents
          contents={[
            variables,
            functions.concat(arrowFunctions),
            forLoops.concat(whileLoops, ifStatements),
          ]}
          physicalLOC={physicalLOC}
        />
      ) : (
        <FilePrompt
          stateFunctions={[
            setVariables,
            setFunctions,
            setArrowFunctions,
            setForLoops,
            setWhileLoops,
            setIfStatements,
          ]}
          setLoading={setLoading}
          setIsLoaded={setIsLoaded}
          setPhysicalLOC={setPhysicalLOC}
        />
      )}
    </>
  );
}

export default App;
