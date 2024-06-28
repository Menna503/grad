
import React, { useState, useEffect,useContext } from 'react';
import AddEvents from '../components/EventsOverlay';
import { useTranslation } from 'react-i18next';
import { IoMdAdd } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useLocation } from 'react-router-dom';
import { getToken, englishToArabicNumber } from '../utils/authentication';

 function Events() {
     
    
     const { user} = useContext(UserContext);
     const { t, i18n } = useTranslation();
     const navigate = useNavigate();
     const [showModal, setShowModal] = useState(false);
     const [events, setEvents] = useState([]);
     const [eventToEdit, setEventToEdit] = useState(null);
     const token = getToken() || '';
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
   const convertToArabic = (number) => {
        return i18n.language === 'ar' ? englishToArabicNumber(number.toString()) : number;
    };



 
     return (

       
         <div className='manageevents_maincontainer' >
             <p className={i18n.language === 'ar' ? 'paragraph_in_manage_events align' : 'paragraph_in_manage_events'}>{t('Please press the below button to add event')}</p>
             <div className='manageevents_container'>
                 <div  className='manageevents_component'>
                     {events.map(event => (
                         <div key={event.id} className={i18n.language === 'ar' ? 'event rotate_y' : 'event'} >
                             <div className={i18n.language === 'ar' ? 'theTitleOfEvent rotate_y ' : 'theTitleOfEvent'}> <p className={i18n.language === 'ar' ? 'titleofevent font_size' : 'titleofevent'}>{t(event.type)}</p> </div>

                              <div className={i18n.language === 'ar' ? 'startevent font_size' : 'startevent'} >
                                 <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y font_size' : 'PofmanageEvents'} >{t('start')}</p>
                                 <div className='boxof_start '> <p className={i18n.language === 'ar' ? 'start_date rotate_y ' : 'start_date'}>{convertToArabic (new Date(event.start).toLocaleDateString())} </p> <span  className={i18n.language === 'ar' ? 'calender_date rotate_y' : 'calender_date'}><IoCalendarClearOutline /></span>  </div>
                             </div>

                             <div className='startevent' >
                                 <p className={i18n.language === 'ar' ? 'PofmanageEvents rotate_y font_size_end' : 'PofmanageEvents'} >{t('end')}</p>
                                 <div className='boxof_start'> <p className={i18n.language === 'ar' ? 'start_date rotate_y' : 'start_date'}>{ convertToArabic (new Date(event.end).toLocaleDateString())}</p> <span className={i18n.language === 'ar' ? 'calender_date rotate_y' : 'calender_date'} ><IoCalendarClearOutline /></span>   </div>
                             </div>

                         </div>
                     ))}
                     {showModal && (
                         <AddEvents close={closeAddEventsModal} addEvent={addEvent} eventToEdit={eventToEdit} updateEvent={updateEvent} />
                     )}
                 </div>
             </div>
             {user.role === "MANAGER" && (
                         <button className={i18n.language === 'ar' ? 'add_button left' : 'add_button'} onClick={() => setShowModal(true)}>
                             <IoMdAdd />
                         </button>
                     )}
         </div>
        
     );
 }

 export default Events;
