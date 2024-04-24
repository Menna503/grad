import React, { useState, useEffect } from 'react';
import HelpOverlay from '../components/HelpOverlay';
import "../Styles/profilecss.css";
import { IoMdAdd } from "react-icons/io";
import {FaRegEdit}from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Help() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionToEdit, setQuestionToEdit] = useState(null);
    const token = localStorage.getItem('token') || '';
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const fetchQuestions = () => {
        if (token) {
            axios.get('https://graduation-project-273e.onrender.com/api/question', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const questionsArray = res.data.data.questions;
                if (Array.isArray(questionsArray)) {
                    setQuestions(questionsArray);
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


    const addQuestion = (newQuestion) => {
        fetchQuestions(); 
    };

    const closeAddQuestionsModal = () => {
        setShowModal(false);
        setQuestionToEdit(null); 
    };

    const editQuestion = (question) => {
        setQuestionToEdit(question);
        setShowModal(true);
    };

    const updateQuestion = (updatedQuestion) => {
        fetchQuestions(); 
    };
   

const deleteQuestion = (iid) => {
    console.log('Deleting question with ID:', iid);
  
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
        const token = localStorage.getItem('token'); 

        if (token) {
            
            const url = `https://graduation-project-273e.onrender.com/api/question/${iid}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
           
            axios.delete('url', config)
                .then(() => {
                   
                    const updatedQuestions = questions.filter(question => question._id !== iid);
                    setQuestions(updatedQuestions);
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
                    {questions.map(question => (
                        <div key={question._id} className="question">
                            

                            <div className='questionBoxContainer' >
                                <div className='boxof_qestion'> <span className='the_qestion'>{question.question} </span>   </div>
                                <div className='boxof_answer'> <span className='the_answer' >{question.answer}</span>    </div>
                            </div>
                            <div className='EditAndDeleteforHelp'>
                                
                                <button className='delete_icon  delete_edit_ic' onClick={() => deleteQuestion(question._id)}><RiDeleteBin6Fill />  </button>
                                <button className='edit_icon delete_edit_ic' onClick={() => editQuestion(question)}><FaRegEdit /> </button>
                            </div>

                           
                        </div>
                    ))}
                    {showModal && (
                        <HelpOverlay close={closeAddQuestionsModal} addQuestion={addQuestion} questionToEdit={questionToEdit} updateQuestion={updateQuestion} />
                    )}
                    <button className='add_button' onClick={() => setShowModal(true)}><IoMdAdd /></button>
                </div>
            </div>
        </div>
        
    );
}

export default Help;
