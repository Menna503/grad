import React, { useState, useEffect } from 'react';
import '../Styles/profilecss.css';
import Addnewscomponent from '../components/newsOverlay';
import NewsReadMore_Overlay from '../components/NewsReadMore_Overlay';
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';
import egyptianFlag from "../images/egyptian_flag.svg";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function News() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showReadModal, setShowReadModal] = useState(false);
    const [news, setnews] = useState([]);
    const [newsToEdit, setNewsToEdit] = useState(null);
    const token = localStorage.getItem('token') || '';
    const location = useLocation();

    const fetchQuestions = () => {
        axios.get('news', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const questionsArray = res.data.data.news;
                console.log({ data: res.data.data })
                if (Array.isArray(questionsArray)) {
                    setnews(questionsArray);
                } else {
                    console.error('Fetched questions data is not an array:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    };


    useEffect(() => {
        fetchQuestions();
    }, [location.pathname]);


    const closeAddnewsModal = () => {
        setShowModal(false);
        setNewsToEdit(null);
    };

    const closeReadModal = () => {
        setShowReadModal(false);
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

                        const updatedNews = news.filter(news => news._id !== iid);
                        setnews(updatedNews);
                    })
                    .catch(error => {
                        console.error('Error deleting question:', error);
                    });
            } else {
                console.error('Authorization token is missing. Deletion cannot proceed.');
            }
        }
    };

    const getImage = (path) => {
        return process.env.REACT_APP_API_URL + '/api/uploads/' + path
    }

    return (

        <div className='manageevents_maincontainer'>
            <p className='paragraph_in_manage_events newsparagraph'>Please press the below button to add News</p>
            <div className='manageevents_container'>
                <div className='managequestions_component'>
                    {news.map(el => (
                        <div className="news">
                            <div className='newsBoxContainer' >
                                <div className='boxof_image'> <img src={getImage(el.image)} width='250px' height='300px' alt="" />    </div>
                                <div className='boxof_header'> <span className='the_header' > {el.header}</span>  </div>
                                <div className='boxof_description'> <button className='the_description' onClick={() => setShowReadModal(true)} >Read more</button>    </div>
                            </div>
                            <div className='Edit_and_Delete_News'>
                                <button className='delete_icon  delete_edit_ic' ><RiDeleteBin6Fill />  </button>
                                <button className='edit_icon delete_edit_ic' ><FaRegEdit /> </button>
                            </div>
                        </div>
                    ))}

                    {showModal && (
                        <Addnewscomponent close={closeAddnewsModal} addNews={addNews} newsToEdit={newsToEdit} updateNews={updateNews} />
                    )}
                    {showReadModal && (
                        <NewsReadMore_Overlay close={closeReadModal} />
                    )}
                    <button className='add_button' onClick={() => setShowModal(true)}><IoMdAdd /></button>
                </div>
            </div>
        </div>

    );
}

export default News;