import { useEffect, useState } from 'react';
import Values from "values.js";
import convertRGBtoHex from './rgbToHex';
import { AiFillCopy } from "react-icons/ai";
import './App.css';
function App() {
  const [color,setColor]=useState("#fac231");
  const [list,setList]=useState([]);
  const [error,setError]=useState(false);
  const [copied,setCopied]=useState(false);
  const [copiedIndex,setCopiedIndex]=useState()
  const handleSubmit=(event)=>{
    event.preventDefault();
    try{
      const arr=new Values(color).all(10);
      console.log(arr);
      setList(arr)
      setError(false)
    }catch(err){
      setError(true)
      console.log(err)
    }
  }
  useEffect(()=>{
    try {
      const arr = new Values(color).all(10);
      console.log(arr);
      setList(arr);
      setError(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  },[])
  const copyToClipboard=(bcg)=>{
    navigator.clipboard.writeText(bcg);
    setCopied(true)
  }
  useEffect(()=>{
    let setTime=setTimeout(()=>{
      setCopied(false);
      setCopiedIndex();
    },2000)
    return ()=>clearTimeout(setTime)
  },[copied])
  return (
    <>
      <div className="container">
        <header className="header">
          <h2>Color Generator</h2>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="hex"
                id="hex"
                className={error?"error":null}
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
              <button type="submit" className="btn">
                submit
              </button>
            </form>
          </div>
        </header>
        <section className="section-center">
          {list.map((singleColor,index)=>{
            const {rgb,weight}=singleColor;
            let bcg=convertRGBtoHex(...rgb)
            return (
              <article
                className="color-container"
                key={index}
                style={{ backgroundColor: `rgb(${rgb})` }}
              >
                <p className={index > 10 ? "setColor" : null}>{weight}%</p>
                <p className={index > 10 ? "setColor" : null}>{bcg}</p>
                <AiFillCopy
                  className={index > 10 ? "setColor copy" : "copy"}
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(bcg);
                    setCopiedIndex(index);
                  }}
                />
                {copied && copiedIndex==index && (
                  <div className="alert">
                    <p className={index > 10 ? "setColor" : null}>
                      Copied to Clipboard
                    </p>
                  </div>
                )}
              </article>
            );
          })}
          
         
        </section>
      </div>
    </>
  );
}

export default App;
