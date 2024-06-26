
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getToken } from '../utils/authentication';

function AddEvents({ close, addEvent, eventToEdit }) {
    const url = "event";
    const roundUrl = "event/round";
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [data, setData] = useState({
        type: "",
        start: "",
        end: ""
    });

    const [round, setround] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = getToken();
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`event/round`, config)
                .then(res => {
                    setround(res.data.round);
                    console.log('round status:', res.data.round);
                   
                })
                .catch(error => {
                    console.error('Error fetching new round status:', error);
                });
        } else {
            navigate('/');
        }
    }, [navigate]);

    function Submit(e) {
        e.preventDefault();
        const token = getToken();

        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const endpoint = data.type === "elections" && round ? roundUrl : url;

            axios.post(endpoint, data, config)
                .then(res => {
                    console.log(res.data);
                    addEvent(res.data);
                    close();
                })
                .catch(error => {
                    console.error('Error adding event:', error);
                    if (error.response && error.response.data && error.response.data.message) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage("An error occurred. Please try again.");
                    }
                });
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
        if (e.target.classList.contains('eventModal')) {
            close();
        }
    }

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="eventModal" onClick={handleClose}>
            <div className="eventModalContainer">
                <form onSubmit={Submit}>
                    <div className='Addnelec'>
                        <div className='close_button' onClick={close}> <IoIosClose /> </div>
                        <div className={i18n.language === 'ar' ? 'Addeventslec rotate_y' : 'Addeventslec'}>
                            <div className="bigboxofAddevents">
                                <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y' : 'PofmanageEvents'}>{t('title')}</p>
                                <select value={data.type} id="type" onChange={handle} className={i18n.language === 'ar' ? 'dropdownlist rotate_y' : 'dropdownlist'}>
                                    <option value="" hidden>{t('select title')}</option>
                                    {round ? (
                                        <option value="elections">{t('elections')}</option>
                                    ) : (
                                        <>
                                            <option value="nomination">{t('nomination')}</option>
                                            <option value="candidates">{t('candidates')}</option>
                                            <option value="elections">{t('elections')}</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            {data.type === "elections" && round ? (
                                <>
                                    <div className={i18n.language === 'ar' ? 'bigboxofAddevents dropdown_padding' : 'bigboxofAddevents'}>
                                        <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y' : 'PofmanageEvents'}>{t('start')}</p>
                                        <input onChange={handle} id="start" placeholder='' type='date' className={i18n.language === 'ar' ? 'box_of_Addevents rotate_y' : 'box_of_Addevents'} value={data.start}></input>
                                    </div>
                                    <div className="bigboxofAddevents">
                                        <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y' : 'PofmanageEvents'}>{t('end')}</p>
                                        <input onChange={handle} id="end" placeholder='' type='date' className={i18n.language === 'ar' ? 'box_of_Addevents rotate_y' : 'box_of_Addevents'} value={data.end}></input>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={i18n.language === 'ar' ? 'bigboxofAddevents dropdown_padding' : 'bigboxofAddevents'}>
                                        <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y' : 'PofmanageEvents'}>{t('start')}</p>
                                        <input onChange={handle} id="start" placeholder='' type='date' className={i18n.language === 'ar' ? 'box_of_Addevents rotate_y' : 'box_of_Addevents'} value={data.start}></input>
                                    </div>
                                    <div className="bigboxofAddevents">
                                        <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y' : 'PofmanageEvents'}>{t('end')}</p>
                                        <input onChange={handle} id="end" placeholder='' type='date' className={i18n.language === 'ar' ? 'box_of_Addevents rotate_y' : 'box_of_Addevents'} value={data.end}></input>
                                    </div>
                                </>
                            )}
                        </div>
                        <button className={i18n.language === 'ar' ? 'addd_button button_font_size' : 'addd_button'} type="submit">{t('add')}</button>
                        {errorMessage && <div className="error_message" >{errorMessage}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEvents;



