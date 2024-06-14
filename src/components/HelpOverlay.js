import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/profilecss.css";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Helpposter from '../images/helpposter.svg';
import { useTranslation } from 'react-i18next';


function HelpOverlay({ close , addQuestion , questionToEdit , updateQuestion  }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [data, setData] = useState({
        question: "",
        answer: ""
    });



    useEffect(() => {
        if (questionToEdit) {
            setData(questionToEdit);
        }
    }, [questionToEdit]);

 
    
    function Submit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            
            if (questionToEdit) {
                if (token) {
                axios.patch(`${'question'}/${questionToEdit._id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        updateQuestion(res.data);
                        close();
                    })
                    
                    .catch(error => {
                        console.error('Error editing event:', error);
                    });

                    if (questionToEdit) {
                        console.log('eventToEdit object:', questionToEdit);
                        console.log('Editing event with ID:', questionToEdit._id);
                    } else {
                        console.log('eventToEdit is undefined or null');
                    }
            }} else {
                axios.post('question', data, config)
                    .then(res => {
                        addQuestion(res.data);
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
        if (e.target.classList.contains('questionModal')) {
            close();
        }
    }

    

    return (
    <div className="newsModal"  onClick={handleClose}>
       <div className="helpModalContainer">
       <form  onSubmit={Submit}>

         <div className='Addnewslec'>
            <div className='closehelp_button' onClick={close}> <IoIosClose /> </div>
                <div className='Addnewwslec'>
                    <div className='page_img_addnews' ><img src={Helpposter} alt=""  /> </div> 
                            <div className='bigboxofAddnews' >
                                 <input  id="question" onChange={handle} placeholder={t('Please Add Qestion')} type='text' value={data.question}  className={i18n.language === 'ar' ? 'box_of_Addnews align_right' : 'box_of_Addnews'} ></input>
                            </div>

                            <div className='bigboxofAddnewarea' >
                                <textarea   id="answer" onChange={handle} placeholder={t('Answer.....')} type='text' value={data.answer}  className={i18n.language === 'ar' ? 'box_of_Addnewsarea align_right' : 'box_of_Addnewsarea'}></textarea>
                            </div> 
                </div>
                        <button className='addd_button_for_help' type="submit">{questionToEdit ? t('edit') : t('add')}</button>
            </div>

        
       </form>
       </div>
    </div>
    );
}

export default HelpOverlay;
