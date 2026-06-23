function onScanSuccess(decodedText, decodedResult) {

    console.log("SCANNED:", decodedText);

    alert("QR Scanned Successfully!");

    document.getElementById("status").innerHTML =
        "✅ QR Scanned Successfully: " + decodedText;
}

function onScanFailure(error) {
    
}

const html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 20, qrbox: 300 }
);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);