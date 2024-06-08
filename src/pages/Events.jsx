
import React, { useState, useEffect,useContext } from 'react';
import AddEvents from '../components/EventsOverlay';
import "../Styles/profilecss.css";
import { IoMdAdd } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useLocation } from 'react-router-dom';

function Events() {
     
    
    const { user} = useContext(UserContext);
    
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null);
    const token = localStorage.getItem('token') || '';
    const location = useLocation();
    


    useEffect(() => {
        if (token) {
            Axios.get('event', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
              
                const eventsArray = res.data.data.events;
                if (Array.isArray(eventsArray)) {
                    setEvents(eventsArray);
                } else {
                    console.error('Fetched events data is not an array:', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
        }
    }, [location.pathname]);

    const closeAddEventsModal = () => {
        setShowModal(false);
        setEventToEdit(null); 
    };


    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    const editEvent = (event) => {
        setEventToEdit(event);
        setShowModal(true);
    };



const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map(event => {
        if (event.id === updatedEvent.id) {
            return updatedEvent;
        }
        return event;
    });
    setEvents(updatedEvents);
};



 
    return (

       
        <div className='manageevents_maincontainer'>
            <p className='paragraph_in_manage_events'>Please press the below button to add an event</p>
            <div className='manageevents_container'>
                <div className='manageevents_component'>
                    {events.map(event => (
                        <div key={event.id} className="event">
                            <div className='theTitleOfEvent'> <p className='titleofevent'>{event.type}</p> </div>

                            <div className='startevent' >
                                <p className='PofmanageEvents'>Start</p>
                                <div className='boxof_start'> <p className='start_date'>{new Date(event.start).toLocaleDateString()} </p> <span className='calender_date'><IoCalendarClearOutline /></span>  </div>
                            </div>

                            <div className='startevent' >
                                <p className='PofmanageEvents'>End</p>
                                <div className='boxof_start'> <p className='start_date'>{new Date(event.end).toLocaleDateString()}</p> <span className='calender_date'><IoCalendarClearOutline /></span>   </div>
                            </div>

                        </div>
                    ))}
                    {showModal && (
                        <AddEvents close={closeAddEventsModal} addEvent={addEvent} eventToEdit={eventToEdit} updateEvent={updateEvent} />
                    )}
                   {user.role === "MANAGER" && (
                        <button className='add_button' onClick={() => setShowModal(true)}>
                            <IoMdAdd />
                        </button>
                    )}
                    
                </div>
            </div>
        </div>
        
    );
}

export default Events;