const FilePrompt = ({
  stateFunctions,
  setLoading,
  setIsLoaded,
  setPhysicalLOC,
}) => {
  /* findPatternInText finds variables, functions, loops, etc.
    depending on what 'pattern' is and what the 'stateFunction' is */
  const findPatternInText = (text, stateFunction, pattern) => {
    let found = text.match(pattern);
    stateFunction(found || []);
  };

  /* handleChange is invoked when the user selects what file they want to upload */
  const handleChange = (e) => {
    const patterns = [
      /(const|let|var) .+ = .+;/g, //Variables
      /function .+\(.*\) */g, //Functions
      /(const|let|var) *\w+ *= *(async)? *(<.*>)?\(.*\)(:[ \w.<>()\[\]"'\n={}]*)? *=>/g, //Arrow Functions
      /for[\s]*\(((?:[^\(\)]|(?:\([^\)]*\)))+)\)[\s]*((?:\{(?:[^\}\{]|(?:\{[^\}]*\}))*\})|(?:[^;]*;))/g, //For Loops
      /while[\s]*\(((?:[^\(\)]|(?:\([^\)]*\)))+)\)[\s]*((?:\{(?:[^\}\{]|(?:\{[^\}]*\}))*\})|(?:[^;]*;))/g, //While Loops
      /if[\s]*\(((?:[^\(\)]|(?:\([^\)]*\)))+)\)[\s]*((?:\{(?:[^\}\{]|(?:\{[^\}]*\}))*\})|(?:[^;]*;))/g, //If Statements
    ];

    const reader = new FileReader();
    reader.onload = () => {
      setLoading(true);
      setPhysicalLOC(reader.result.match(/\n/g).length);
      let index = 0;
      stateFunctions.forEach((stateFunction) => {
        findPatternInText(reader.result, stateFunction, patterns[index]);
        index += 1;
      });
      setLoading(false);
      setIsLoaded(true);
    };
    reader.readAsText(e.target.files[0]);
  };
  return (
    <main>
      <h2>File To Analyze: </h2>
      <input
        type="file"
        name="file"
        id="file"
        className="input-file"
        accept=".js"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="file">Choose a file</label>
    </main>
  );
};
export default FilePrompt;
