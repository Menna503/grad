import React, { useState, useEffect } from 'react';
import AddEvents from '../components/AddEvents';
import "../Styles/profilecss.css";
import { IoMdAdd } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import Axios from 'axios';

function Manageevents() {
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null);

    // Define the close function
    const closeAddEventsModal = () => {
        setShowModal(false);
        setEventToEdit(null); // Reset the event to edit after closing the modal
    };

    // Function to add an event to the events state
    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    // Function to edit an event
    const editEvent = (event) => {
        setEventToEdit(event);
        setShowModal(true);
    };

const deleteEvent = (eventId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    
    if (confirmDelete) {
        Axios.delete(`http://localhost:3001/events/${eventId}`)
            .then(() => {
                const updatedEvents = events.filter(event => event.id !== eventId);
                setEvents(updatedEvents);
            })
            .catch(error => {
                console.error('Error deleting event:', error);
            });
    }
};

    useEffect(() => {
        // Fetch events from the JSON server when the component mounts
        Axios.get("http://localhost:3001/events")
            .then(res => {
                setEvents(res.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Function to update event data after editing
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
                            <div className='theTitleOfEvent'> <p className='titleofevent'>{event.titleOfEvent}</p> </div>

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
                                <button className='deleteevent_button' onClick={() => deleteEvent(event.id)}> Delete </button>
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

export default Manageevents;