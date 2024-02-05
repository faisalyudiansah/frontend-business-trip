import React, { useState } from 'react'

const GalleryImages = ({ dataDetailBusiness }) => {
  let [selectedImageIndex, setSelectedImageIndex] = useState(0)

  let changeImage = (index) => {
    setSelectedImageIndex(index)
  }

  return (
    <>
      <div className="h-64 md:h-80 rounded-lg mb-4">
        {dataDetailBusiness?.photos?.map((imageUrl, index) => (
          <div
            key={index}
            style={{ display: selectedImageIndex === index ? 'block' : 'none' }}
            className="h-64 md:h-80 rounded-lg mb-4 flex items-center justify-center"
          >
            <img
              src={imageUrl}
              alt={`Business ${dataDetailBusiness.name} Image ${index + 1}`}
              className="w-full h-64 md:h-80 rounded-lg object-cover border-base-content border"
            />
          </div>
        ))}
      </div>
      <div className="flex -mx-2 mb-4 mt-5">
        {dataDetailBusiness?.photos?.map((imageUrl, index) => (
          <div className="flex-1 px-2" key={index}>
            <img
              onClick={() => changeImage(index)}
              src={imageUrl}
              alt={`Business ${dataDetailBusiness.name} Small Image ${index + 1}`}
              className={`border border-base-content cursor-pointer focus:outline-none w-full rounded-lg h-24 md:h-32 object-cover ${selectedImageIndex === index ? 'shadow-lg selected-image hover:shadow-lg scale-110 border-4' : ''}`}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default GalleryImages