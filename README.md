# Image-Format-Converter

## **Overview**
This project is a web-based image converter that allows users to upload any type of image file (e.g., HEIC, JPEG, PNG, GIF) and convert it into another format. The project features drag-and-drop file upload, file previews, and an interactive image sample slider for users to test conversions. A visually appealing interface, smooth transitions, and support for various image formats make this tool user-friendly and functional.

## **Features**
- Convert **any image format** to other formats (e.g., HEIC, JPEG, PNG, GIF, BMP).
- **Drag-and-drop** functionality for seamless file uploads.
- **Image format dropdown** to select the desired output format.
- **Preview of converted image** before downloading.
- **Sample images slider** for users to test the website functionality.
- **Animated GIF background** for an engaging user experience.

## **Technologies and Libraries Used**
1. **HTML**: For the structure of the web application.
2. **CSS**: To style the UI elements and implement animations.
3. **JavaScript**: To handle file uploads, image conversions, and user interactions.
4. **heic2any**: A library for converting HEIC images to other formats.
5. **Browser APIs**:
   - **FileReader**: To read uploaded files.
   - **URL.createObjectURL**: To generate preview URLs for images.
   - **Blob**: To handle image conversion results.

---

## **How to Use**
1. Clone the repository or download the files.
2. Open the `index.html` file in your browser.
3. Drag and drop an image file or click "Select File" to upload.
4. Choose the desired output format from the dropdown menu.
5. Click "Download" to save the converted file.

---

## **Code Explanation**

### **JavaScript Breakdown**
```javascript
let currentBlobUrl = null; // Stores the current blob URL to avoid memory leaks
```
- Declares a variable to store the URL of the current converted image.  
- Prevents multiple unnecessary URLs from being created.

```javascript
function handleFile(file) {
  if (!file) return; // Exit if no file is provided
```
- The `handleFile` function is called when a file is uploaded or dragged.
- If the `file` is `null` or `undefined`, the function exits without doing anything.

```javascript
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl); // Frees up memory by revoking the old blob URL
  }
```
- Releases resources by revoking the URL of the previous image before creating a new one.

```javascript
  const toType = document.getElementById('format-select').value; // Get the desired output format
```
- Retrieves the format chosen by the user in the dropdown menu.

```javascript
  heic2any({ blob: file, toType }) // Use heic2any to convert the image to the selected format
    .then((blob) => {
      currentBlobUrl = URL.createObjectURL(blob); // Generate a URL for the converted image
```
- **`heic2any`**: Converts the input image into the desired format.
- **`then` block**: Creates a URL from the resulting blob to preview and download the image.

```javascript
      const previewImage = document.getElementById('image-preview');
      previewImage.src = currentBlobUrl; // Set the image preview
      document.querySelector('.preview').classList.remove('hidden');
```
- Updates the preview section with the converted image by setting the `src` attribute.

```javascript
      const downloadBtn = document.getElementById('download-btn');
      downloadBtn.classList.remove('hidden'); // Show the download button
      downloadBtn.onclick = () => {
        const link = document.createElement('a'); // Create a hidden download link
        link.href = currentBlobUrl;
        link.download = file.name.replace(/\.[^/.]+$/, '') + '.' + toType.split('/')[1];
        link.click(); // Trigger the download
      };
    })
    .catch((error) => {
      alert('Error converting image: ' + error.message); // Error handling
    });
}
```
- Adds an `onclick` handler to the download button to download the converted file with the correct format and extension.
- If the conversion fails, an error message is displayed.

---

### **File Input Event Listener**
```javascript
document.getElementById('file-upload').addEventListener('change', (event) => {
  const file = event.target.files[0]; // Get the selected file
  handleFile(file); // Call handleFile to process the file
});
```
- Detects when a user selects a file and passes it to the `handleFile` function for processing.

---

### **Drag-and-Drop Functionality**
```javascript
const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault(); // Prevent default behavior to allow dropping
  dropZone.classList.add('dragover'); // Add styling for dragover state
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover'); // Remove styling when dragging leaves
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault(); // Prevent default behavior for drop
  dropZone.classList.remove('dragover');
  const file = event.dataTransfer.files[0]; // Get the dropped file
  handleFile(file); // Process the file
});
```
- Adds interactivity to the drag-and-drop zone.
- Listens for drag and drop events, changes styling for visual feedback, and processes the dropped file.

---

### **Sample Slider Toggle**
```javascript
function toggleSlider() {
  const slider = document.getElementById('sample-slider');
  slider.classList.toggle('hidden'); // Show or hide the slider
}
```
- Toggles the visibility of the sample slider using the `hidden` class.

---

### **GIF Background Transition**
```javascript
const gifs = ['/img/1.gif', '/img/2.gif', '/img/3.gif', '/img/4.gif', '/img/5.gif', '/img/6.gif', '/img/7.gif'];
let currentGifIndex = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url(${gifs[currentGifIndex]})`;
  currentGifIndex = (currentGifIndex + 1) % gifs.length; // Loop through GIFs
}

setInterval(changeBackground, 5000); // Change background every 5 seconds
```
- Cycles through background GIFs every 5 seconds for a dynamic visual experience.

---

## **Conclusion**
This project provides a robust solution for converting image files in a browser without requiring software installation. Developers can explore the `heic2any` library, understand browser APIs like `Blob` and `URL`, and implement interactive features such as drag-and-drop. The code is modular, easy to maintain, and expandable for additional functionalities.
