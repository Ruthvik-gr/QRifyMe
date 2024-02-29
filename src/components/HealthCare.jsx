import React, { useState } from "react";

// HealthCare component representing a single file input
export const HealthCare = () => {
  const [fileInputs, setFileInputs] = useState([]);

  // Handler for file input change
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];

    // Handle file change logic here
    console.log(`File ${index + 1} selected:`, file);

    // Read the file and update state with a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const updatedInputs = [...fileInputs];
      updatedInputs[index] = {
        file: file,
        previewURL: reader.result,
      };
      setFileInputs(updatedInputs);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handler for plus mark click to add a new file input
  const handleAddFileInput = () => {
    setFileInputs((prevInputs) => [...prevInputs, null]);
  };

  return (
    <>
      <div>
        {fileInputs.map((input, index) => (
          <div key={index}>
            <input
              type="file"
              onChange={(event) => handleFileChange(index, event)}
            />
            {input && input.previewURL && (
              <img
                src={input.previewURL}
                alt={`Preview ${index + 1}`}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAddFileInput}
        style={{ color: "black", cursor: "pointer", marginTop: "10px" }}
      >
        +
      </button>
    </>
  );
};
