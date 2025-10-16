const video = document.getElementById("video-feed");
const placeholder = document.getElementById("placeholder");
const scanButton = document.getElementById("scan-button");
const outputText = document.getElementById("converted-text");
const toggleCameraButton = document.getElementById("toggle-camera-button");

let videoStream = null;

async function startCamera() {
  if (videoStream) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    videoStream = stream;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      placeholder.style.display = "none";
      video.play();
      scanButton.disabled = false;
      toggleCameraButton.classList.remove(
        "bg-red-500",
        "hover:bg-red-600",
        "focus:ring-red-400"
      );
      toggleCameraButton.classList.add(
        "bg-cyan-500",
        "hover:bg-cyan-600",
        "focus:ring-cyan-400"
      );
    };
  } catch (err) {
    console.error("Error accessing camera: ", err);
    placeholder.innerHTML = `<p class="text-red-400">Error: Could not access camera. Please grant permission and refresh.</p>`;
  }
}

function stopCamera() {
  if (!videoStream) return;
  videoStream.getTracks().forEach((track) => track.stop());
  video.srcObject = null;
  videoStream = null;
  placeholder.style.display = "flex";
  placeholder.querySelector("p").textContent = "Camera is off.";
  scanButton.disabled = true;
  toggleCameraButton.classList.remove(
    "bg-cyan-500",
    "hover:bg-cyan-600",
    "focus:ring-cyan-400"
  );
  toggleCameraButton.classList.add(
    "bg-red-500",
    "hover:bg-red-600",
    "focus:ring-red-400"
  );
}

toggleCameraButton.addEventListener("click", () => {
  if (videoStream) stopCamera();
  else startCamera();
});

scanButton.addEventListener("click", () => {
  outputText.textContent = "Scanning...";
  setTimeout(() => {
    const signs = ["Hello!", "How are you?", "Thank you.", "I love this."];
    outputText.textContent = signs[Math.floor(Math.random() * signs.length)];
  }, 1000);
});

window.addEventListener("load", startCamera);