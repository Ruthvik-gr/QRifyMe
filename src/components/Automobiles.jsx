import { React, useState } from "react";
import "../Styles/FormInput.scss";

export function Automobiles() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="main">
      <h1 className="Headeing">AutoMobiles Documents</h1>
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </div>
  );
}
