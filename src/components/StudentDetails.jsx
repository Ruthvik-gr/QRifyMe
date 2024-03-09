import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import Button from "react-bootstrap/Button";
// import {ImageGallery} from "./ImageGallery";
import "../Styles/FormInput.scss";
import QRCode from 'qrcode.react';


export const Studentdetails = () => {
  const [fileInputs, setFileInputs] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

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

  // Handler for submitting the form and uploading files to Firebase Storage
  const handleUpload = async () => {
    if (user) {
      const storage = getStorage();
      const storageRef = ref(storage, `/Studentdetails/${user.uid}`);

      // Loop through fileInputs and upload each file
      for (const input of fileInputs) {
        if (input && input.file) {
          const fileRef = ref(storageRef, input.file.name);
          await uploadBytes(fileRef, input.file);
        }
      }

      console.log("Files uploaded to Firebase Storage!");

      // Generate QR code data
      const files = await listAll(storageRef);
      const newImageUrls = await Promise.all(
        files.items.map((item) => getDownloadURL(item))
      );
      setQrCodeData(JSON.stringify(newImageUrls));
      setImageUrls(newImageUrls); // Set the image URLs for later use
    } else {
      console.error("User not authenticated.");
    }
  };

  // ... (rest of the code)

  return (
    <div className="main">
      <h1>Studentdetails</h1>
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
      <Button className="PlusBtn" onClick={handleAddFileInput}>
        +
      </Button>
      <Button
        className="SubmitBtn"
        as="input"
        type="submit"
        value="Submit"
        onClick={handleUpload}
      />
      {qrCodeData && (
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <h2>QR Code:</h2>
          <QRCode value={qrCodeData} />
        </div>
      )}
      {/* {imageUrls.length > 0 && <ImageGallery imageUrls={imageUrls} />} */}
    </div>
  );
};
