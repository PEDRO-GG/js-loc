import { useState } from "react";
const FileContents = ({ contents, physicalLOC }) => {
  let logicalLOC = 0;
  console.log(contents);
  const [totalCost, setTotalCost] = useState(0);
  const [activeLink, setActiveLink] = useState({
    type: "costs",
    content: "none",
    amount: "none",
  });

  const handleClick = (e) => {
    setActiveLink({
      type: e.target.name,
      content: e.target.name == "costs" ? "none" : contents[e.target.id],
      amount: e.target.name == "costs" ? "none" : contents[e.target.id].length,
    });
  };

  const handleChange = (e) => {
    setTotalCost(e.target.value);
  };

  if (activeLink.type === "costs") {
    contents.forEach((arr) => {
      logicalLOC += arr.length;
    });
  }
  return (
    <>
      <nav>
        <a onClick={handleClick} name="costs">
          Costs
        </a>
        <a onClick={handleClick} id="0" name="variables">
          Variables
        </a>
        <a onClick={handleClick} id="1" name="functions">
          Functions
        </a>
        <a onClick={handleClick} id="2" name="conditionals">
          Conditionals
        </a>
      </nav>
      <section className={"content"}>
        {activeLink.type === "costs" ? (
          <>
            <h3>Total logical lines of code: {logicalLOC}</h3>
            <h3>Total physical lines of code: {physicalLOC}</h3>
            <div className="calculate-rate">
              <p>
                If the total cost for this project was $
                <input onChange={handleChange} type="number" placeholder="0" />,
              </p>
              <p>
                then the cost per line of code is: $
                {(totalCost / physicalLOC).toFixed(2)} per line
              </p>
            </div>
          </>
        ) : (
          <>
            <h3>
              Total number of {activeLink.type}: {activeLink.amount}
            </h3>
            <article className="grid">
              {activeLink.content.map((element, idx) => {
                return (
                  <div key={idx} className="grid-item">
                    <span>{idx})</span> {element}
                  </div>
                );
              })}
            </article>
          </>
        )}
      </section>
    </>
  );
};
export default FileContents;
