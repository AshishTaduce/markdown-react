import React, {useState} from 'react';
import './App.css';

function App() {
    let [input, setInput] = useState('');
    let lines = Array(200).fill(1);
    let lineCount = lines.map((line, index) => `#${index + 1}\n`);
    lineCount = lineCount.join('');
    console.log('lineCXountr = ' ,lineCount)
    let lineNumber = lineCount;
    console.log(lineNumber);


    function processInput(input) {
        let captureNewLines = new RegExp(/(\n)/, "gm");
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

        console.log(input);
        return <div dangerouslySetInnerHTML={{ __html: input }} />;
    }
  return (
    <div className="App">
      <header className="App-header">
          <textarea key={input.length} name="" id="" cols = '5' rows={200} className={'line-number'}>
            {lineNumber}
          </textarea>
          <div className={'input-div'}>
            <textarea name="" id="" className={'input-area'} rows={200} onChange={async (text) => {
                    setInput(`${text.target.value}`);
                }}>
                {input}
            </textarea>
          </div>
          <div className={'result'}>
                {processInput(input)}
          </div>
      </header>
    </div>
  );
}

export default App;
