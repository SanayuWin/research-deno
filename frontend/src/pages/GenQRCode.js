import React, { useState, useEffect } from "react";



const GenQRCode = () => {
  const [qrCodeData, setQRCodeData] = useState(null);
  const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
  
  useEffect(() => {
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    try {
      const response = await fetch(BACKEND_SERVER + "genqrcode");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const qrCodeBuffer = await response.blob();
      setQRCodeData(URL.createObjectURL(qrCodeBuffer));
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  return (
    <div>
      {qrCodeData ? (
        <img src={qrCodeData} alt="QR Code" />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default GenQRCode;
