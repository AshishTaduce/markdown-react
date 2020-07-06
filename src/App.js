import React, {useState} from 'react';
import './App.scss';
import CodeBlock from "./Components/code-block/code-block";

function App() {
    let [input, setInput] = useState('');

    function processInput(input) {
        let captureNewLines = new RegExp(/(^\n)/, "gm");
        let captureHeader3 = new RegExp(/^#{3} (.*)/, "gm");
        let captureHeader2 = new RegExp(/^#{2} (.*)/, "gm");
        let captureHeader1 = new RegExp(/^# (.*)/, "gm");
        let captureLine = new RegExp(/(^---\n)/, "gm");
        let captureListItem = new RegExp(/^- (.*)/, "gm");
        let captureImages = new RegExp(/^! (\[.*\])(\(.*\))/, "gm");
        let captureCode = new RegExp(/^`.*`/, "gm");

        input = input.replace(captureImages, (capturedText, group1, group2) => {
            let link = group2.toString().substring(1, group2.length - 1);
            let name = group1.toString().substring(1, group1.length - 1);
            console.log(name, link);
            return `<img src= ${link} alt= ${name} className = {"image-div"}/>`;
        });
        input = input.replace(captureCode, (capturedText, group1) => `<CodeBlock className={"code-block"} >${capturedText}</CodeBlock>`);
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
            if(element.substring(0,2) === ("! ")) return <div className={"image preety-div"}>{element}</div>
            if(element[0] === ("`") && element[element.length-1] === ("`")) return <div className={"code preety-div"}>{element}</div>
            if(element.substring(0,2) === ("# ")) return <div className={"header preety-div"}>{element}</div>
            if(element.substring(0,3) === ("## ")) return <div className={"header preety-div"}>{element}</div>
            if(element.substring(0,4) === ("### ")) return <div className={"header preety-div"}>{element}</div>
            if(element.substring(0,4) ===("---")) return <div className={"horizontal-line preety-div"}>{element}</div>
            if(element === "") return <div className={"preety-div empty-div"}>{"Empty Line Here"}</div>
            if(element.substring(0,2) === ("* ")) return <div className={"list-item preety-div"}><span style={{color: "#66d9ef"}}>*</span> {element.substring(1)}</div>;

            return <div className={"preety-div"}>{element}</div>
        });
        // console.log("After: ",input);
        return input;
    }

    function processImage(image_data){
        if(image_data.includes())
        return <div className={"image preety-div"}>{image_data}</div>
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