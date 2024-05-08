import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject // Import deleteObject function
} from "firebase/storage";
import Button from "react-bootstrap/Button";
import "../Styles/FormInput.scss";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const Automobiles = () => {
  const [fileInputs, setFileInputs] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [fetchedImageUrls, setFetchedImageUrls] = useState([]); // State to hold fetched image URLs
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

  // Handler for deleting a file input
  const handleDeleteFileInput = (index) => {
    const updatedInputs = [...fileInputs];
    updatedInputs.splice(index, 1);
    setFileInputs(updatedInputs);
  };

  // Handler for fetching images from the database
  const handleFetchImages = async () => {
    if (user) {
      const storage = getStorage();
      const storageRef = ref(storage, `/Automobile/${user.uid}`);
      const files = await listAll(storageRef);
      const newImageUrls = await Promise.all(
        files.items.map((item) => getDownloadURL(item))
      );
      setFetchedImageUrls(newImageUrls);
    } else {
      console.error("User not authenticated.");
    }
  };

  // Handler for deleting an image from the database
  const handleDeleteImage = async (imageUrl) => {
    if (user) {
      const storage = getStorage();
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log("Image deleted from Firebase Storage!");
      // Fetch images again after deletion
      handleFetchImages();
    } else {
      console.error("User not authenticated.");
    }
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
              <React.Fragment>
                <img
                  src={input.previewURL}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "120px",
                    marginTop: "10px",
                    borderRadius: "10px",
                  }}
                />
                <Button
                  variant="danger"
                  onClick={() => handleDeleteFileInput(index)}
                  style={{ marginLeft: "20px", right: "0px" }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </React.Fragment>
            )}
          </div>
        ))}
      </div>

      {qrCodeData && (
        <div style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "30px" }}>
          <h2>QR Code:</h2>
          <QRCode value={qrCodeData} />
        </div>
      )}
      <div className="buttons-container">
        <Button className="PlusBtn" onClick={handleAddFileInput}>
          +
        </Button>
        <Button className="FetchBtn" onClick={handleFetchImages}>
          Fetch
        </Button>
        <Button
          className="SubmitBtn"
          as="input"
          type="submit"
          value="Submit"
          onClick={handleUpload}
        />
      </div>
      {fetchedImageUrls.length > 0 && (
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
          <h2>Fetched Images:</h2>
          {fetchedImageUrls.map((url, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <img
                src={url}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100px",
                  Height: "100px",
                  marginRight: "10px",
                  borderRadius: "10px",
                }}
              />
              <Button
                variant="danger"
                onClick={() => handleDeleteImage(url)}
                style={{ right: "20px" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};