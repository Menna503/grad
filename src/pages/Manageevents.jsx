
import React, { useState, useEffect } from 'react';
import AddEvents from '../components/AddEvents';
import "../Styles/profilecss.css";
import { IoMdAdd } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Manageevents() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null);
    const token = localStorage.getItem('token') || '';
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);
    
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

// const deleteEvent = (eventId) => {
//     // Display a confirmation dialog
//     const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    
//     if (confirmDelete) {
//         Axios.delete( )
//             .then(() => {
//                 const updatedEvents = events.filter(event => event.id !== eventId);
//                 setEvents(updatedEvents);
//             })
//             .catch(error => {
//                 console.error('Error deleting event:', error);
//             });
//     }
// };

const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map(event => {
        if (event.id === updatedEvent.id) {
            return updatedEvent;
        }
        return event;
    });
    setEvents(updatedEvents);
};


// useEffect(() => {
//     Axios.get('https://graduation-project-273e.onrender.com/api/event', {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     .then(res => setEvents(res.data))
//     .catch(error => console.error('Error fetching events:', error));
// }, [token]);
Axios.get('https://graduation-project-273e.onrender.com/api/event', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res => {
    // Ensure `res.data` is an array before updating `events`
    if (Array.isArray(res.data)) {
        setEvents(res.data);
    } else {
        console.error('Fetched events data is not an array:', res.data);
    }
})
.catch(error => console.error('Error fetching events:', error));

 
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
                                <div className='boxof_start'> <span >{event.start} </span>  <span className='spanofevent'><CiCalendar /></span>  </div>
                            </div>

                            <div className='startevent' >
                                <p className='PofmanageEvents'>End</p>
                                <div className='boxof_start'> <span >{event.end}</span>  <span className='spanofevent'><CiCalendar /></span>  </div>
                            </div>

                            <div className='EditAndDelete'>
                                <button className='Editevent_button' onClick={() => editEvent(event)}> Edit </button>
                                {/* <button className='deleteevent_button' onClick={() => deleteEvent(event.id)}> Delete </button> */}
                            </div>
                        </div>
                    ))}
                    {showModal && (
                        <AddEvents close={closeAddEventsModal} addEvent={addEvent} eventToEdit={eventToEdit} updateEvent={updateEvent} />
                    )}
                    <button className='add_button' onClick={() => setShowModal(true)}><IoMdAdd /></button>
                </div>
            </div>
        </div>
        
    );
}

export default Manageevents;