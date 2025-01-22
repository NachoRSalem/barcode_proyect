import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = () => {
  const [barcodeValue, setBarcodeValue] = useState(null); 
  const webcamRef = useRef(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const initializeScanner = () => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: webcamRef.current?.video, 
            constraints: {
              facingMode: 'environment', //usar cámara trasera
            },
          },
          decoder: {
            readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'upc_reader',
              'upc_e_reader',
            ], //tipos de códigos de barras
          },
        },
        (err) => {
          if (err) {
            console.error('Error inicializando Quagga:', err);
          } else {
            Quagga.start(); //inicia el escaneo
          }
        }
      );

      //resultados del escaneo
      Quagga.onDetected((data) => {
        const scannedCode = data?.codeResult?.code;
        if (scannedCode) {
          setBarcodeValue(scannedCode); //guarda el código escaneado
          Quagga.stop(); //detiene el escaneo
          navigate(`/home?code=${scannedCode}`); //redirige
        }
      });
    };

    initializeScanner(); 

   
    return () => {
      Quagga.stop(); 
      Quagga.offDetected(); 
    };
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div
        className="position-relative"
        style={{ width: '90%', maxWidth: '400px', height: 'auto' }}
      >
        {/* Contenedor de la cámara */}
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            width: '80%',
            height: 'auto',
            border: '2px solid #003366',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            width="100%"
            height="100%"
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'environment', //camara trasera, defecto
            }}
            style={{ borderRadius: '10px' }}
          />
        </div>

       
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            width: '80%',
            borderTop: '4px solid red',
            opacity: 0.7,
          }}
        ></div>
      </div>

     
      {barcodeValue && (
        <div
          className="position-absolute bottom-0 w-100 text-center py-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <h2 className="text-white">Código detectado: {barcodeValue}</h2>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;

