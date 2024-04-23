import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import Addnewsposter from '../images/Addnewsposter.svg';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function Addnewscomponent({ close , addNews , newsToEdit , updateNews}) {
  const url = "https://graduation-project-273e.onrender.com/api/news";


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
              Axios.patch(`${url}/${newsToEdit.id}`, data, config)
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
                      console.log('Editing event with ID:', newsToEdit.id);
                  } else {
                      console.log('eventToEdit is undefined or null');
                  }
          } else {
              Axios.post(url, data, config)
                  .then(res => {
                      console.log(res.data);
                      addNews(res.data);
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

      // const { id, value } = e.target;
      // let formattedValue = value;
  
      // if (id === "start" || id === "end") {
      //     // Format the date value to match the required format
      //     formattedValue = format(new Date(value), "yyyy-MM-dd");
      // }
  
      // setData(prevData => ({
      //     ...prevData,
      //     [id]: formattedValue,
      // }));
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
        <button className='addd_button' type="submit">{newsToEdit ? "Edit" : "Add"}</button>
      </div>

      
     </form>
     </div>
  </div>
  );
}

export default Addnewscomponent;

