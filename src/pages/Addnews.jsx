import React,{useState, useEffect} from 'react';
import Addnewsposter from '../images/Addnewsposter.svg';
import '../Styles/profilecss.css';
import Addnewscomponent from '../components/AddnewOverlay';
import { IoMdAdd } from "react-icons/io";
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';







function Addnews() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newss, setNewss] = useState([]);
  const [newsToEdit, setNewsToEdit] = useState(null);
  const token = localStorage.getItem('token') || '';
 
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          navigate('/');
      }
  }, [navigate]);


  useEffect(() => {
      if (token) {
          Axios.get('https://graduation-project-273e.onrender.com/api/news', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(res => {
              // Extract the array of events from the response
              const newssArray = res.data.data.news;
              if (Array.isArray(newssArray)) {
                  setNewss(newssArray);
              } else {
                  console.error('Fetched news data is not an array:', res.data);
              }
          })
          .catch(error => {
              console.error('Error fetching news:', error);
          });
      }
  }, [token]);

  const closeAddNewssModal = () => {
      setShowModal(false);
      setNewsToEdit(null); 
  };


  const addNews = (news) => {
      setNewss([...newss, news]);
  };

  const editNews= (news) => {
      setNewsToEdit(news);
      setShowModal(true);
  };

const deleteNews = (eventId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this event?");
  
  if (confirmDelete) {
      Axios.delete( )
          .then(() => {
              const updatedEvents = newss.filter(event => event.id !== eventId);
              setNewss(updatedEvents);
          })
          .catch(error => {
              console.error('Error deleting event:', error);
          });
  }
};

const updateNews = (updatedNews) => {
  const updatedNewss = newss.map(news => {
      if (news.id === updatedNews.id) {
          return updatedNews;
      }
      return news;
  });
  setNewss(updatedNewss);
};



  return (

     
      <div className='manageevents_maincontainer'>
          <p className='paragraph_in_manage_events'>Please press the below button to add Qestion</p>
          <div className='manageevents_container'>
              <div className='managequestions_component'>
                  {newss.map(news => (
                      <div key={news.id} className="question">
                          

                          <div className='questionBoxContainer' >
                              <div className='boxof_qestion'> <span className='the_qestion'>{news.header} </span>   </div>
                              <div className='boxof_answer'> <span className='the_answer' >{news.image}</span>    </div>
                              <div className='boxof_answer'> <span className='the_answer' >{news.description}</span>    </div>
                          </div>

                      </div>
                  ))}
                  {showModal && (
                      <Addnewscomponent close={closeAddNewssModal} addNews={addNews} newsToEdit={newsToEdit} updateNews={updateNews} />
                  )}
                  <button className='add_button' onClick={() => setShowModal(true)}><IoMdAdd /></button>
              </div>
          </div>
      </div>
      
  );
}

export default Addnews;


