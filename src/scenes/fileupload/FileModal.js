import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactCrop from "react-image-crop";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import "react-image-crop/lib/ReactCrop.scss";

export default function FileModal({
  file,
  handleClose,
  imageType,
  show,
  onItemSave,
}) {
  const [crop, setCrop] = useState({
    unit: "px", // default, can be 'px' or '%'
    width: 100,
    height: 100,
  });
  const [loadedImg, setLoadedImg] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setCrop((prev) => ({
      ...prev,
      width: imageType.width,
      height: imageType.height,
    }));
  }, [imageType]);

  const onImageLoaded = (image) => {
    setLoadedImg(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (loadedImg && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(
        loadedImg,
        crop,
        `newFile${crop.width}_${crop.height}.jpeg`
      );
      setCroppedImage(croppedImage);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          alert("Canvas is empty");
          return;
        }
        blob.name = fileName;
        blob.lastModifiedDate = new Date();
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const uploadToServer = () => {
    let formdata = new FormData();
    formdata.append("file", croppedImage);
    formdata.append("upload_preset", "insider");
    setLoader(true);
    axios
      .post("https://api.cloudinary.com/v1_1/dr10hyki1/image/upload", formdata)
      .then((res) => {
        console.log("DATA", res.data);
        onItemSave(imageType, res.data.url);
        setLoader(false);
        handleClose();
      })
      .catch((err) => {
        setLoader(false);
        alert(err);
      });
  };

  const handleSave = () => {
    if (croppedImage) {
      uploadToServer();
    } else {
      alert("Crop Image!");
    }
  };

  const modalClass = show ? "show-modal" : "hide-modal";

  return (
    <div className={`file-modal-container ${modalClass}`}>
      <div className="modal-content">
        <Loader show={loader} />

        <ReactCrop
          locked
          src={file.src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />

        {!loader && (
          <>
            <Button onClick={handleSave} secondary>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </>
        )}
      </div>
    </div>
  );
}
