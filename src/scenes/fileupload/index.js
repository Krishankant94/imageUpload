import React, { useState } from "react";
import FileModal from "./FileModal";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function FileUpload({ showUpload }) {
  const [file, setFileData] = useState(null);
  const [modal, setModal] = useState(false);
  const [imageType, setImageType] = useState({
    type: "",
    height: 200,
    width: 200,
  });

  const [imgDataList, setImgDataList] = useState([
    { name: "Horizontal", height: 450, width: 755, isCropped: false },
    { name: "Vertical", height: 450, width: 365, isCropped: false },
    { name: "Horizontal-small", height: 212, width: 365, isCropped: false },
    { name: "gallery", height: 380, width: 380, isCropped: false },
  ]);

  const validateImage = (file) => {
    let _URL = window.URL || window.webkitURL;
    let img;
    if (file) {
      img = new Image();
      let objectUrl = _URL.createObjectURL(file);
      img.onload = function () {
        if (this.width === 1024 && this.height === 1024) {
          setFileData(img);
        } else {
          alert("image has to be exactly 1024 x 1024.");
        }
      };
      img.src = objectUrl;
    }
  };

  const handleFileUpload = (e) => {
    validateImage(e.target.files[0]);
  };

  const cardClickHandler = (imgType) => {
    setModal(true);
    setImageType({
      name: imgType.name,
      height: imgType.height,
      width: imgType.width,
    });
  };

  const onItemSave = (item, url) => {
    let index = imgDataList.findIndex((img) => img.name === item.name);
    let tempArr = imgDataList;
    tempArr.splice(index, 1, { ...item, isCropped: true, url: url });
    setImgDataList(tempArr);
  };

  const renderCards =
    file &&
    imgDataList.map((item, index) => (
      <Card
        key={index}
        selected={item.isCropped}
        imgSrc={file.src}
        onClick={() => cardClickHandler(item)}
        data={item}
      />
    ));

  const notCompleted = imgDataList.filter((item) => item.isCropped === false);
  console.log(notCompleted);
  return (
    <div className="file-upload">
      <h2 className="title">Upload File</h2>
      <div className="upload-box">
        <div className="title">
          <input
            type="file"
            onChange={handleFileUpload}
            className="file-input"
            accept="image/*"
          />
        </div>
      </div>
      {file && (
        <>
          <div className="size-container">
            <h2 className="title">Select Image Sizes</h2>
            <div className="processed-files">{renderCards}</div>
          </div>
          <FileModal
            file={file}
            show={modal}
            onItemSave={onItemSave}
            imageType={imageType}
            handleClose={() => {
              setModal(false);
            }}
          />
        </>
      )}
      {notCompleted.length === 0 && (
        <Button onClick={() => showUpload(imgDataList)}>Review</Button>
      )}
    </div>
  );
}
