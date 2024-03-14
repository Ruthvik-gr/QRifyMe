// // ImageGallery.js
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export const ImageGallery = () => {
//   const location = useLocation();
//   const [imageUrls, setImageUrls] = useState([]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const dataParam = urlParams.get("data");

//     if (dataParam) {
//       const decodedData = JSON.parse(decodeURIComponent(dataParam));
//       if (Array.isArray(decodedData)) {
//         setImageUrls(decodedData);
//       } else {
//         console.error("Invalid data format. Expected an array of image URLs.");
//       }
//     }
//   }, [location.search]);

//   return (
//     <div className="image-gallery">
//       <h1>Image Gallery</h1>
//       {imageUrls.length > 0 ? (
//         imageUrls.map((url, index) => (
//           <img key={index} src={url} alt={`Image ${index + 1}`} />
//         ))
//       ) : (
//         <p>No images to display.</p>
//       )}
//     </div>
//   );
// };



// ImageGallery.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ImageGallery = () => {
  const location = useLocation();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const dataParam = urlParams.get("data");

    if (dataParam) {
      const decodedData = JSON.parse(decodeURIComponent(dataParam));
      if (Array.isArray(decodedData)) {
        setImageUrls(decodedData);
      } else {
        console.error("Invalid data format. Expected an array of image URLs.");
      }
    }
  }, [location.search]);

  return (
    <div className="image-gallery">
      <h1>Image Gallery</h1>
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index + 1}`} />
        ))
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
};
