import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "../Styles/profilecss.css";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function AddEvents({ close, addEvent, eventToEdit, updateEvent }) {
    const url = "https://graduation-project-273e.onrender.com/api/event";


    const navigate = useNavigate();
   
   
    const [data, setData] = useState({
        type: "",
        start: "",
        end: ""
         
    });
    

    useEffect(() => {
        if (eventToEdit) {
            setData(eventToEdit);
        }
    }, [eventToEdit]);



    function Submit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            
            if (eventToEdit) {
                Axios.patch(`${url}/${eventToEdit.id}`, data, config)
                    .then(res => {
                        console.log(res.data);
                        updateEvent(res.data);
                        close();
                    })
                    .catch(error => {
                        console.error('Error editing event:', error);
                    });

                    if (eventToEdit) {
                        console.log('eventToEdit object:', eventToEdit);
                        console.log('Editing event with ID:', eventToEdit.id);
                    } else {
                        console.log('eventToEdit is undefined or null');
                    }
            } else {
                Axios.post(url, data, config)
                    .then(res => {
                        console.log(res.data);
                        addEvent(res.data);
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
        if (e.target.classList.contains('eventModal')) {
            close();
        }
    }

    

    return (
        <div className="eventModal" onClick={handleClose}>
            <div className="eventModalContainer">
                <form onSubmit={Submit}>
                    <div className='Addnelec'>

                        <div className='close_button' onClick={close}> <IoIosClose /> </div>
                        <div className='Addeventslec'>

                         <div className='bigboxofAddevents' >
                                <p className='PofmanageEvents'>title</p>
                                <select value={data.type} id="type" onChange={handle} className='dropdownlist'>
                                   <option value="" hidden>Select title</option>
                                    <option value="nomination">nomination</option>
                                    <option value="candidates"> candidates</option>
                                    <option value="elections" >elections</option>
                                </select>
                                
                            </div>  


                            <div className='bigboxofAddevents' >
                                <p className='PofmanageEvents'>Start</p>
                                <input onChange={handle} id="start" placeholder='' type='date' className='box_of_Addevents' value={data.start}></input>
                            </div>

                            <div className='bigboxofAddevents' >
                                <p className='PofmanageEvents'>End</p>
                                <input onChange={handle} id="end" placeholder='' type='date' className='box_of_Addevents' value={data.end}></input>
                            </div>

                        </div>
                        <button className='addd_button' type="submit">{eventToEdit ? "Edit" : "Add"}</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddEvents;
