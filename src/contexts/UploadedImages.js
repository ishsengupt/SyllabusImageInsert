import React from 'react'

const UploadedImages = React.createContext({
  images: [],
  base64:'',
  ocrResultsRaw:'',
  ocrResults:'',
  createdAt: '',
  loading:false,
  setUploadedImages: () => {},
})

export default UploadedImages
