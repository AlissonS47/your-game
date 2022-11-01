import './Gallery.css'

import React from 'react'
import { useState } from 'react'

import GalleryImage from './GalleryImage'

const Gallery = ({ images }) => {
  const [fullImage, setFullImage] = useState(null);

  return (
    <div className='gallery'>
      <div className="gallery__images flex-row flex-wrap flex-jc flex-g1">
        {images.map((image) =>
          <GalleryImage
            key={image.id}
            image={image.image}
            alt="Game Screenshots"
            setImage={setFullImage} />)
        }
      </div>
      {fullImage &&
        <div className="gallery__full-image flex-row flex-jc flex-ac">
          <img src={fullImage} alt="Game Screenshot" />
          <button onClick={() => setFullImage(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      }
    </div>
  )
}

export default Gallery