// js/qr-scanner.js
// Uses the jsQR library (loaded via CDN script tag in scan.html) to decode
// QR codes from the live camera feed.

let videoStream = null;

/**
 * Starts the camera and continuously scans for a QR code.
 * @param {HTMLVideoElement} videoEl - the <video> element to stream camera into
 * @param {HTMLCanvasElement} canvasEl - hidden canvas used to grab video frames
 * @param {(decodedText: string) => void} onSuccess - callback fired once a QR code is found
 * @param {(error: Error) => void} onError - callback fired on camera/permission errors
 */
export async function startQrScanner(videoEl, canvasEl, onSuccess, onError) {
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    videoEl.srcObject = videoStream;
    await videoEl.play();

    const canvasCtx = canvasEl.getContext("2d");
    let scanning = true;

    function tick() {
      if (!scanning) return;

      if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
        canvasEl.height = videoEl.videoHeight;
        canvasEl.width = videoEl.videoWidth;
        canvasCtx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);

        const imageData = canvasCtx.getImageData(0, 0, canvasEl.width, canvasEl.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          scanning = false;
          stopQrScanner();
          onSuccess(code.data);
          return;
        }
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  } catch (err) {
    onError(err);
  }
}

/** Stops the camera stream. Call this when leaving the scan page. */
export function stopQrScanner() {
  if (videoStream) {
    videoStream.getTracks().forEach((track) => track.stop());
    videoStream = null;
  }
}