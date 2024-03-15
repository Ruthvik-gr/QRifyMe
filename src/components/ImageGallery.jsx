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





import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ImageGallery = () => {
  const location = useLocation();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="image-gallery">
      <h1>Image Gallery</h1>
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => {
          // Extract filename from URL
          const filename = url.split("/").pop();
          // Encode filename
          const encodedFilename = encodeURIComponent(filename);
          // Construct URL with encoded filename
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/qrifyme-e45a9.appspot.com/o/Studentdetails/6gLETSkvbDa7WlWU83CSXRJtkdu1/${encodedFilename}?alt=media`;

          return (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              onError={(e) => { console.error('Error loading image:', e); }}
            />
          );
        })
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
};
