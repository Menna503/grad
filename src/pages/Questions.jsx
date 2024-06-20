import React, { useState, useEffect, useContext } from 'react';
import HelpOverlay from '../components/HelpOverlay';
import "../Styles/profilecss.css";
import { IoMdAdd } from "react-icons/io";
import Model from '../model/model';
import {FaRegEdit}from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import axios from 'axios';



function Help() {
    
    const [showModal, setShowModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [questionToEdit, setQuestionToEdit] = useState(null);
    const token = localStorage.getItem('token') || '';
    const { t, i18n } = useTranslation();
   

    const fetchQuestions = () => {
        if (token) {
            axios.get('question', {
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
   
    const confirmDeleteQuestion = (question) => {
        setQuestionToDelete(question);
        setShowDeleteModal(true);
    };

    const deleteQuestion = () => {
        if (questionToDelete) {
            if (token) {
                const url = `question/${questionToDelete._id}`;
                axios.delete(url, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(() => {
                    const updatedQuestions = questions.filter(q => q._id !== questionToDelete._id);
                    setQuestions(updatedQuestions);
                    setShowDeleteModal(false);
                    setQuestionToDelete(null);
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
            <p className={i18n.language === 'ar' ? 'paragraph_in_manage_events align' : 'paragraph_in_manage_events'}>{t('Please press the below button to add Qestion')}</p>
            <div className='manageevents_container'>
                <div className='managequestions_component'>
                    {questions.map(question => (
                        <div key={question._id} className="question">
                            

                            <div className='questionBoxContainer' >
                                <div className='boxof_qestion'> <span className='the_qestion'>{question.question} </span>   </div>
                                <div className='boxof_answer'> <span className='the_answer' >{question.answer}</span>    </div>
                            </div>
                            
                            <div className='EditAndDeleteforHelp'>
                                <button className='delete_icon  delete_edit_ic' onClick={() => confirmDeleteQuestion(question)}><RiDeleteBin6Fill />  </button>
                                <button className='edit_icon delete_edit_ic' onClick={() => editQuestion(question)}><FaRegEdit /> </button>
                            </div>

                           
                        </div>
                    ))}
                    {showModal && (
                        <HelpOverlay close={closeAddQuestionsModal} addQuestion={addQuestion} questionToEdit={questionToEdit} updateQuestion={updateQuestion} />
                    )}
                       {showDeleteModal && (
                        <Model delete_model={true} close_model={() => setShowDeleteModal(false)} onDelete={deleteQuestion}/>
                         )}
                    
                </div>
            </div>
            <button className={i18n.language === 'ar' ? 'add_button left' : 'add_button'} onClick={() => setShowModal(true)}><IoMdAdd /></button>
        </div>
        
    );
}

export default Help;
