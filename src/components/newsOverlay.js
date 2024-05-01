import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addnewsposter from '../images/Addnewsposter.svg';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function Addnewscomponent({ close , addNews , newsToEdit , updateNews}) {

  const navigate = useNavigate();
 
 
  const [data, setData] = useState({
          header: "",
          image: null,
          description: ""
  });



  useEffect(() => {
      if (newsToEdit) {
          setData(newsToEdit);
      }
  }, [newsToEdit]);





  function Submit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not found, redirecting to login');
        navigate('/');
        return;
    }
       

        const formData = new FormData();
        formData.append('header', data.header);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'  
            }
        };
        
        if (newsToEdit) {
            if (token) {
            axios.patch(`${'news'}/${newsToEdit._id}`, formData, config)
                .then(res => {
                    console.log(res.data);
                    updateNews(res.data);
                    close();
                })
                .catch(error => {
                    console.error('Error editing event:', error);
                });

                if (newsToEdit) {
                    console.log('eventToEdit object:', newsToEdit);
                    console.log('Editing event with ID:', newsToEdit._id);
                } else {
                    console.log('eventToEdit is undefined or null');
                }
        }} else {
            axios.post('news', formData, config)
                .then(res => {
                    addNews(res.data);
                    console.log(res.data);
                    
                    close();
                })
                .catch(error => {
                    console.error('Error adding event:', error);
                    console.error('Response error data:', error.response?.data);
                });
        }
    
}

function handle(e) {
    const { id, type } = e.target;
    let fieldValue = e.target.value;

    if (type === 'file') {
        // Handle file input differently
        fieldValue = e.target.files[0];
    }

    setData(prevData => ({
        ...prevData,
        [id]: fieldValue,
    }));
} 

  function handleClose(e) {
      if (e.target.classList.contains('newsModal')) {
          close();
      }
  }

  

  return (
      <div className="newsModal"  onClick={handleClose}>
            <div className="newsModalContainer">
                <form  onSubmit={Submit}>

                    <div className='Addnewslec'>
                        <div className='closee_button' onClick={close}> <IoIosClose /> </div>
                            <div className='Addnewwslec'>
                                <div className='page_img_addnews' ><img src={Addnewsposter} alt=""  /> </div> 
                                      <div className='bigboxofAddnews' >
                                         <input  id="header" onChange={handle} placeholder='Add Title Of The News' type='text' value={data.header} className='box_of_Addnews'></input>
                                      </div>

                                        <div className='bigboxofAddnewsupload' >
                                           <input  id="image"  onChange={handle} placeholder='Add Image Of The News' type='file' className='box_of_upload'></input>
                                        </div>
                                        

                                        <div className='bigboxofAddnewarea' >
                                          <textarea   id="description" onChange={handle} placeholder='News......' type='text' value={data.description}  className='box_of_Addnewsarea'></textarea>
                                        </div> 
                            
                                </div>
                            <button className='add_button_news' type="submit">{newsToEdit ? "Edit" : "Add"}</button>
                    </div>

                
                </form>
            </div>
  </div>
  );
}

export default Addnewscomponent;