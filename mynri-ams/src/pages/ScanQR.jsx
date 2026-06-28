import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Scan(){

const navigate=useNavigate();

useEffect(()=>{

const scanner=new Html5QrcodeScanner(
"reader",
{
fps:10,
qrbox:250
},
false
);

scanner.render(

(decodedText)=>{

alert("QR Scanned Successfully");

scanner.clear();

navigate("/fingerprint");

},

(error)=>{}

);

return()=>{

scanner.clear().catch(()=>{});

};

},[]);

return(

<div className="dashboard">

<h1>Scan QR Code</h1>

<div id="reader"></div>

</div>

);

}

export default Scan;