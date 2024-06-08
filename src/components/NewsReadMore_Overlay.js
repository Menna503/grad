import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addnewsposter from '../images/Addnewsposter.svg';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function NewsReadMore_Overlay({ close }) {

  const navigate = useNavigate();
 
 
  const [data, setData] = useState({
          header: "",
          image: "",
          description: ""
  });


  function handleClose(e) {
      if (e.target.classList.contains('newsReadModal')) {
          close();
      }
  }

  

  return (
      <div className="newsModal"  onClick={handleClose}>
            <div className="newsModalContainer">

                    <div className='Addnewslec'>
                        <div className='closee_button' onClick={close}> <IoIosClose /> </div>
                            <div className='Addnewwslec'>
                                <div className='page_img_addnews' ><img src={Addnewsposter} alt=""  /> </div> 
                                      <div className='bigboxofAddnews' >
                                         <input  id="header"  placeholder='Add Title Of The News' type='text' value={data.header} className='box_of_Addnews'></input>
                                      </div>

                                        <div className='bigboxofAddnewsupload' >
                                           <input  id="image"   placeholder='Add Image Of The News' type='file' value={data.image}  className='box_of_upload'></input>
                                        </div>
                                        

                                        <div className='bigboxofAddnewarea' >
                                          <textarea   id="description"  placeholder='News......' type='text' value={data.description}  className='box_of_Addnewsarea'></textarea>
                                        </div> 
                            
                                </div>
                            
                    </div>

                
            </div>
  </div>
  );
}

export default NewsReadMore_Overlay;
