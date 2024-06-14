import React from 'react';
import { IoIosClose } from "react-icons/io";

function CandidateDataOverlay({ close, image }) {
  const handleClose = (e) => {
    if (e.target.classList.contains('newsModal')) {
      close();
    }
  };

  console.log(`Overlay Image Path: ${image}`); // Debug: log overlay image path

  return (
    <div className="newsModal" onClick={handleClose}>
      <div className="newsModalContainer read_more_container">
        <div className='Addnewslec'>
          <div className='closee_button c' onClick={close}>
            <IoIosClose />
          </div>
          <div className='Addnewwslec n'>
            {image ? (
              <img className="image_overlay" src={image} alt="Document" />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDataOverlay;
