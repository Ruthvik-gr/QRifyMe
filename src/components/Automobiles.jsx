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
import "../Styles/FormInput.scss";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";

export const Automobiles = () => {
  const [fileInputs, setFileInputs] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Handler for file input change
  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    console.log(`File ${index + 1} selected:`, file);
    const reader = new FileReader();
    reader.onload = () => {
      const updatedInputs = [...fileInputs];
      updatedInputs[index] = { file: file, previewURL: reader.result };
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


  const handleUpload = async () => {
    if (user) {
      const storage = getStorage();
      const storageRef = ref(storage, `/Automobile/${user.uid}`);
      for (const input of fileInputs) {
        if (input && input.file) {
          const fileRef = ref(storageRef, input.file.name);
          await uploadBytes(fileRef, input.file);
        }
      }
      console.log("Files uploaded to Firebase Storage!");
      const files = await listAll(storageRef);
      const newImageUrls = await Promise.all(
        files.items.map((item) => getDownloadURL(item))
      );
      const encodedImageUrls = newImageUrls.map((url) =>
        encodeURIComponent(url)
      );
      setQrCodeData(
        `https://qrifyme.netlify.app/imagegallery?data=[${encodedImageUrls.join(",")}]`
        //`http://localhost:5173/imagegallery?data=[${encodedImageUrls.join(",")}]`

      );
      setImageUrls(newImageUrls);
      console.log(newImageUrls);
    } else {
      console.error("User not authenticated.");
    }
  };

  console.log(qrCodeData);

  return (
    <div className="main">
      <h1>AutoMobiles</h1>
      <div className="choosefile">
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
      <div className="buttons-container">
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
      </div>
      {qrCodeData && (
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <h2>QR Code:</h2>
          <QRCode value={qrCodeData} />
        </div>
      )}
    </div>
  );
};

