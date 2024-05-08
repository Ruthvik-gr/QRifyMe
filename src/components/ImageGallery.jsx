import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../Styles/imagegallery.scss'
export const ImageGallery = () => {
  const location = useLocation();
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);3
        const dataParam = urlParams.get("data");
        console.log("dataParam:", dataParam);

        // Assuming dataParam is trustworthy and sanitized
        const urls = dataParam
          .slice(1, -1) // Remove enclosing square brackets (if present)
          .split(",") // Split by commas
          .map((url) => url.trim()) // Trim leading/trailing whitespace
          .filter((url) => url.length > 0); // Filter out empty strings

        setImageUrls(urls);
        console.log("imageUrls:", imageUrls); // Log for verification
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchData();
  }, [location.search]);

  return (
    <div className="imagegallery">
      <h1>Image Gallery</h1>
      {imageUrls.length > 0 ? (
        imageUrls.map((imageUrl, index) => (
          <div key={index} className="imagecontainer">
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="gallery-image"
              onError={(event) => {
                // Optional error handling for image loading issues
                console.error("Error loading image:", imageUrl);
                event.target.src = "fallback-image.png"; // Set a fallback image on error (optional)
              }}
            />
          </div>
        ))
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
};
