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
        console.log("dataParam:", dataParam);

        // Assuming dataParam is trustworthy and sanitized
        setImageUrls(dataParam.split(","));
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
        imageUrls.map((imageUrl, index) => (
          <div key={index} className="image-container">
            <img
              src={imageUrl} // Directly use dataParam values
              alt={`Image ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
};
