import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addnewsposter from '../images/Addnewsposter.svg';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function Addnewscomponent({ close , addNews , newsToEdit , updateNews}) {

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
  }, [newsToEdit]);





  function Submit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        
        if (newsToEdit) {
            if (token) {
            axios.patch(`${'news'}/${newsToEdit._id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
            axios.post('question', data, config)
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
    } else {
        console.error('Token not found, redirecting to login');
        navigate('/');
    }
}


  function handle(e) {
      const { id, value } = e.target;
      setData(prevData => ({
          ...prevData,
          [id]: value
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
                                           <input  id="image"  onChange={handle} placeholder='Add Image Of The News' type='file' value={data.image}  className='box_of_upload'></input>
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