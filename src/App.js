import React, { useState } from "react";
import FileUpload from "./scenes/fileupload";
import UploadedFiles from "./scenes/fileview";

export default function App() {
  const [isUploadComp, setUpload] = useState(false);
  const [dataList, setDataList] = useState([]);
  return (
    <div>
      Paytm Insider!
      {isUploadComp ? (
        <UploadedFiles dataList={dataList} />
      ) : (
        <FileUpload
          showUpload={(dataList) => {
            setUpload(true);
            setDataList(dataList);
          }}
        />
      )}
    </div>
  );
}
