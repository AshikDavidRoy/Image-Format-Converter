let currentBlobUrl = null; // Track the current blob URL to avoid multiple downloads
let currentBackgroundIndex = 1; // Index for background GIFs
const totalBackgrounds = 7; // Total number of background GIFs

// Background Transition
//setInterval(() => {
  //currentBackgroundIndex = (currentBackgroundIndex % totalBackgrounds) + 1;
  //document.body.style.backgroundImage = `url('img/${currentBackgroundIndex}.gif')`;
//}, 5000); // Change every 5 seconds

// Load Sample Images
const slider = document.getElementById('slider');
const sampleImages = ['1.jpeg', '4.png', '2.jpeg','3.jpeg','5.jpeg','6.jpeg']; // Example
sampleImages.forEach((image) => {
  const img = document.createElement('img');
  img.src = `sampleimg/${image}`;
  img.draggable = true;
  img.ondragstart = (event) => {
    event.dataTransfer.setData('image', img.src);
  };//
  slider.appendChild(img);
});

// File Conversion Logic
function handleFile(file) {
  if (!file) return;

  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl); // Revoke the previous blob URL
  }

  const outputFormat = document.getElementById('output-format').value;

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          currentBlobUrl = URL.createObjectURL(blob);
          document.getElementById('image-preview').src = currentBlobUrl;
          document.querySelector('.preview').classList.remove('hidden');
          const downloadBtn = document.getElementById('download-btn');
          downloadBtn.classList.remove('hidden');
          downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = currentBlobUrl;
            link.download = file.name.replace(/\.[^/.]+$/, '') + outputFormat.slice(6);
            link.click();
          };
        },
        outputFormat
      );
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

// Event Listeners for File Upload and Drag-and-Drop
document.getElementById('file-upload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  handleFile(file);
});

const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  handleFile(file);
});


function toggleSlider() {
    const slider = document.getElementById('sample-slider');
    slider.classList.toggle('hidden');
  }
  
