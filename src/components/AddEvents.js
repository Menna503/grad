import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "../Styles/profilecss.css";
import { IoIosClose } from "react-icons/io";

function AddEvents({ close, addEvent, eventToEdit, updateEvent }) {
    const url = "http://localhost:3001/events";

    const [data, setData] = useState({
        titleOfEvent: "",
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
        if (eventToEdit) {
            Axios.patch(`${url}/${eventToEdit.id}`, data)
                .then(res => {
                    console.log(res.data);
                    updateEvent(res.data);
                    close(); // Close the modal
                })
                .catch(error => {
                    console.error('Error editing event:', error);
                });
        } else {
            Axios.post(url, data)
                .then(res => {
                    console.log(res.data);
                    addEvent(res.data);
                    close();
                })
                .catch(error => {
                    console.error('Error adding event:', error);
                });
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
                                <input onChange={handle} id="titleOfEvent" placeholder='Name Of Event' type='text' className='box_of_Addevents' value={data.titleOfEvent}></input>
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
