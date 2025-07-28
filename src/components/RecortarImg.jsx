import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

const RecortarImg = ({ file, onRecorteFinalizado }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState('');
  const [fondoTransparente, setFondoTransparente] = useState(true);
  const [previewRecorte, setPreviewRecorte] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const onCropComplete = useCallback((_, area) => {
    setCroppedAreaPixels(area);
  }, []);

  const hacerRecorte = useCallback(async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels, fondoTransparente);
    const previewURL = URL.createObjectURL(blob);
    setPreviewRecorte(previewURL);
    onRecorteFinalizado(blob);
  }, [imageSrc, croppedAreaPixels, fondoTransparente, onRecorteFinalizado]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-96">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={fondoTransparente}
          onChange={() => setFondoTransparente(!fondoTransparente)}
        />
        Fondo transparente (PNG)
      </label>

      <button
        type="button"
        onClick={hacerRecorte}
        className="bg-blue-600 text-white px-4 py-2 rounded w-fit"
      >
        Usar recorte
      </button>

      {previewRecorte && (
        <div className="mt-2 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">📤 Preview del recorte:</p>
          <img
            src={previewRecorte}
            alt="Recorte preview"
            className="w-32 h-32 rounded-full border object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default RecortarImg;
