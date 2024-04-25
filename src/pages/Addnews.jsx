import React,{useState, useEffect} from 'react';
import '../Styles/profilecss.css';
import Addnewscomponent from '../components/newsOverlay';
import { IoMdAdd } from "react-icons/io";
import  axios  from 'axios';
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


  const fetchQuestions = () => {
    if (token) {
        axios.get('news', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const questionsArray = res.data.data.news;
            if (Array.isArray(questionsArray)) {
                setNewss(questionsArray);
            } else {
                console.error('Fetched questions data is not an array:', res.data);
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
    }
};


useEffect(() => {
    fetchQuestions();
}, [token]);


  const closeAddNewssModal = () => {
      setShowModal(false);
      setNewsToEdit(null); 
  };


  const addNews = (newNews) => {
    fetchQuestions(); 
};


const editNews = (news) => {
    setNewsToEdit(news);
    setShowModal(true);
};

const updateNews = (updatedNews) => {
    fetchQuestions(); 
};

const deleteNews = (iid) => {
    console.log('Deleting question with ID:', iid);
  
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
        const token = localStorage.getItem('token'); 

        if (token) {
            
            const url = `news/${iid}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
           
            axios.delete(url, config)
                .then(() => {
                   
                    const updatedNews = newss.filter(news => news._id !== iid);
                    setNewss(updatedNews);
                })
                .catch(error => {
                    console.error('Error deleting question:', error);
                });
        } else {
            console.error('Authorization token is missing. Deletion cannot proceed.');
        }
    }
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
                         
                          <div className='EditAndDeleteforHelp'>
                                <button className='delete_icon  delete_edit_ic' onClick={() => deleteNews(news._id)}>Delete </button>
                                <button className='edit_icon delete_edit_ic' onClick={() => editNews(news)}>Edit</button>
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