// // QRCodeScanner.js
// import React, { useState } from "react";
// import QrReader from "react-qr-reader";

// export const QRCodeScanner = () => {
//   const [result, setResult] = useState("");

//   const handleScan = (data) => {
//     if (data) {
//       setResult(data);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div>
//       <h2>QR Code Scanner</h2>
//       <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: "100%" }}
//       />
//       {result && <p>Scanned QR Code: {result}</p>}
//     </div>
//   );
// };
