import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function NewsReadMore_Overlay({ close ,newsToEdit }) {

  const navigate = useNavigate();
 
 
  const [data, setData] = useState({
          header: "",
          image: "",
          description: ""
  });

  useEffect(() => {
    if (newsToEdit) {
        setData(newsToEdit);
    }
}, []);


  function handleClose(e) {
      if (e.target.classList.contains('newsReadModal')) {
          close();
      }
  }

  
  const getImage = (path) => {
    return process.env.REACT_APP_API_URL + '/api/uploads/' + path
}
  return (
      <div className="newsModal"  onClick={handleClose}>
            <div className="newsModalContainer read_more_container">

                    <div className='Addnewslec'>
                        <div className='closee_button c' onClick={close}> <IoIosClose /> </div>
                            <div className='Addnewwslec n'>
                              
                               <p className='description_paragraph'>{data.header}</p> 
                                <img className ="image_overlay" src={getImage(data.image)} alt="" />
                                <p className=' ne'>{data.description}</p>
                                      
                            
                                </div>
                            
                    </div>

                
            </div>
  </div>
  );
}

export default NewsReadMore_Overlay;
