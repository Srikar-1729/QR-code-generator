import React,{useState,useEffect} from "react";
import './App.css';
import QRCode from 'qrcode'


function App(){
  const [url,setURL] = useState("Enter the url");
  

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.style.opacity = 0.3;
    QRCode.toCanvas(canvas, "Enter the url", { width: 425, margin:1 }, function (error) {
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

  function generate(){
        const canvas = document.getElementById("canvas");
        canvas.style.opacity = 0;
        QRCode.toCanvas(canvas, url, { width: 425, margin:1 }, function (error) {
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
    <div class="container">
      <div class="contents">
        <h1 class="heading">QR Code Generator</h1>
        <input class="link-box" type="url"
        id="url" placeholder="Enter the url" onChange={handleChange}></input>
        <button class="btn" id="generate" onClick={generate}>Generate QR</button>
        <canvas id = 'canvas' width = "500" height = "400" class="qr"/>
        <div class="download">
            <button class="btn" onClick={()=>downloadQRCode("png")}>Download as png</button>
            <button class="btn" onClick={()=>downloadQRCode("jpg")}>Download as jpg</button>
        </div>
      </div>
    </div>
  );
}

export default App;
