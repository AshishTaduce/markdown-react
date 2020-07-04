import React, {useState} from 'react';
import './App.scss';

function App() {
    let [input, setInput] = useState('');
    let lines = Array(input.split('\n').length).fill(1);
    let lineCount = lines.map((line, index) => `#${index + 1}\n`);
    lineCount = lineCount.join('');
    let lineNumber = lineCount;
    // console.log(lineNumber);

    function processInput(input) {
        let captureNewLines = new RegExp(/(^\n)/, "gm");
        let captureHeader3 = new RegExp(/^#{3} (.*)/, "gm");
        let captureHeader2 = new RegExp(/^#{2} (.*)/, "gm");
        let captureHeader1 = new RegExp(/^# (.*)/, "gm");
        let captureLine = new RegExp(/(^---\n)/, "gm");
        let captureListItem = new RegExp(/^- (.*)/, "gm");

        input = input.replace(captureHeader3, (capturedText, group1) => `<h3>${group1}</h3>`);
        input = input.replace(captureHeader2, (capturedText, group1) => `<h2>${group1}</h2>`);
        input = input.replace(captureHeader1, (capturedText, group1) => `<h1>${group1}</h1>`);
        input = input.replace(captureLine, () => `<hr>`);
        input = input.replace(captureListItem, (capturedText, group1) => `<li>${group1}</li>`);
        input = input.replace(captureNewLines, () => `<br/>`)
        return <div dangerouslySetInnerHTML={{ __html: input }} />;
    }
    function preetifyInput(input) {
        input = input.split(`\n`);
        input = input.map(element => {
            if(element.substring(0,2) === ("# ")) return <div className={"header preety-div"}>{element}</div>
            if(element.substring(0,4) ===("---")) return <div className={"horizontal-line preety-div"}>{element}</div>
            if(element === "") return <p className={"preety-div"}> </p>
            if(element.substring(0,2) === ("* ")) return <div className={"list-item preety-div"}><span style={{color: "#3ff1f1"}}>*</span> {element.substring(1)}</div>
            return <div className={"preety-div"}>{element}</div>
        });
        // console.log("After: ",input);
        return input;
    }
  return (
    <div className="App">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300&display=swap');
        </style>
        <header className="App-header">
          <div className={'input-div'}>
              <div>
                  <div className={'preety-text'}>{preetifyInput(input).map(divs => divs)}</div>
              </div>
              <div className={"huh"}>
                  <textarea name="" id="" className={'input-area'} rows={Math.max(30 , input.split('\n').length)} onChange={async (text) => {
                      setInput(`${text.target.value}`);
                  }} wrap={"hard"}>
                {input}
            </textarea>
              </div>
          </div>
          <div className={'result'}>
                {processInput(input)}
          </div>
      </header>
    </div>
  );
}

export default App;