import React, { useState, useEffect } from "react";

export default function UploadedFiles({ dataList }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(dataList);
  }, [dataList]);

  const renderImages = list.map((item, i) => (
    <div className="img-details">
      <img src={item.url} alt={item.name} />
    </div>
  ));

  return <div>{renderImages}</div>;
}
