import React, { useState } from "react";

import FileUpload from "./components/FileUpload";

import UploadedImagesProvider from "./contexts/UploadedImagesProvider";

function UploadFile() {
  return (
    <>
      <UploadedImagesProvider>
        <FileUpload />
      </UploadedImagesProvider>
    </>
  );
}

export default UploadFile;
