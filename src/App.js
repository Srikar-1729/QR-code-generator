import React,{useState,useEffect} from "react";
import './App.css';
import QRCode from 'qrcode'
import './index.css'; 

function App(){
  const [url,setURL] = useState("Enter the url");
  

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.style.opacity = 0.3;
    QRCode.toCanvas(canvas, "Enter the url", { width: 425,margin:1 }, function (error) {
      if (error) console.error(error);
      console.log("QR Code generated!");
    });
    console.log("Component rendered!");

    return () => console.log("Component unmounted!");
    }, []);


  function handleChange(event){
    const val = event.target.value;
    setURL(val);
  }

  function generate() {
    const canvas = document.getElementById("canvas");
  
    
    const width = window.innerWidth <= 480 ? 200 : window.innerWidth <= 768 ? 300 : 425;
    const height = width; 
  
  
    canvas.width = width;
    canvas.height = height;
  
  
    canvas.style.opacity = 0;
    QRCode.toCanvas(canvas, url, { width, margin: 1 }, function (error) {
      if (error) console.error(error);
      console.log("QR Code generated!");
    });
    canvas.style.opacity = 1;
  }

  function downloadQRCode(type) {
    const canvas = document.getElementById("canvas");

    const imageUrl = canvas.toDataURL("image/"+type);

  
    const link = document.createElement("a");
    link.href = imageUrl;
    if(type=="png")
    link.download = "qr-code.png"; 
    else
    link.download = "qr-code.jpg"; 

    link.click();
}
    

  return(
    <div className="container">
      <div className="contents">
        <h1 className="heading">QR Code Generator</h1>
        <input className="link-box" type="url"
        id="url" placeholder="Enter the url" onChange={handleChange}></input>
        <button className="btn" id="generate" onClick={generate}>Generate QR</button>
        <canvas id = 'canvas' class="qr"/>
        <div className="download">
            <button className="btn" onClick={()=>downloadQRCode("png")}>Download as png</button>
            <button className="btn" onClick={()=>downloadQRCode("jpg")}>Download as jpg</button>
        </div>
      </div>
    </div>
  );
}

export default App;
