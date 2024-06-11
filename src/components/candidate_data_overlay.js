import React from 'react';
import { IoIosClose } from "react-icons/io";

function NewsReadMore_Overlay({ close, image }) {
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
            <img className="image_overlay" src={image} alt="Document" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsReadMore_Overlay;
