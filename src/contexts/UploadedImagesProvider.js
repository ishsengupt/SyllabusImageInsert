import React, { useState } from 'react'
// import merge from 'lodash.merge'
import UploadedImages from './UploadedImages'

const UploadedImagesProvider = ({ children }) => {
  /**
   * User details state / controls
   */
  const setUploadedImages = ({
    base64,
    ocrResultsRaw,
    ocrResults,
    loading,
    createdAt
  }) => {
    updateUploaded(prevState => {
      // console.log(prevState)
      // let newImage = {
      //   images: uploaded.images.concat(images)
      // }
      return {
        ...prevState,
        base64,
        ocrResultsRaw,
        ocrResults,
        loading,
        createdAt
      }
    })
  }

  const imagesState = {
    images:[],
    base64:'',
    ocrResultsRaw:'',
    ocrResults:'',
    loading:false,
    createdAt: '',
    setUploadedImages
  }

  const [uploaded, updateUploaded] = useState(imagesState)

  return (
    <UploadedImages.Provider value={uploaded}>
      {children}
    </UploadedImages.Provider>
  )
}

export default UploadedImagesProvider
