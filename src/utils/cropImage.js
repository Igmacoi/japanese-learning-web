// src/utils/cropImage.js
export default function getCroppedImg(imageSrc, croppedAreaPixels, fondoTransparente = true) {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 300;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (fondoTransparente) {
        ctx.clearRect(0, 0, size, size);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
      }

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.clip();

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const sx = croppedAreaPixels.x * scaleX;
      const sy = croppedAreaPixels.y * scaleY;
      const sw = croppedAreaPixels.width * scaleX;
      const sh = croppedAreaPixels.height * scaleY;

      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, size, size);

      canvas.toBlob(resolve, fondoTransparente ? 'image/png' : 'image/jpeg');
    };
  });
}