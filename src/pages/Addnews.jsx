import React,{useState, useEffect} from 'react';
import Profe from '../components/Profe';
import Addnewsposter from '../images/Addnewsposter.svg';
import '../Styles/profilecss.css';
import Addnewscomponent from '../components/Addnewscomponent';
import { IoMdAdd } from "react-icons/io";
import  Axios  from 'axios';

function Addnews() {

  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsss, setNewsss] = useState([]);

  const closeAddEventsModal = () => {
    setShowNewsModal(false);
    };

    const addNewsCards = (newsCards) => {
      setNewsss([...newsss , newsCards ]);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/news")
        .then(res => {
          setNewsss(res.data);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}, []);
  return (
  
    
   
    <div className='manageevents_maincontainer'>
    <p className='paragraph_in_manage_events'>Please press the below button to add news</p>
    <div className='manageevents_container'>
        <div className='manageevents_component'>
                 {newsss.map(newsCards => (
                        <div key={newsCards.id} className="newsCard">

                            <div className='imagenewsCard'>
                                <img src="" alt=""  /> 
                            </div>

                            <div className='titleofevent'>
                            <p className='titleofevent'></p>
                            <button className='button_of_readmore' > Read More </button>
                            </div>

                            <div className='EditAndDelete'>
                                <button className='Editevent_button' > Edit </button>
                                <button className='deleteevent_button' > Delete </button>
                            </div>

                        </div>
                     ))}
                     {showNewsModal && (
                           <Addnewscomponent   close={closeAddEventsModal} addNewsCards={addNewsCards}/>
                      )}
                    <button className='add_button'  onClick={() => setShowNewsModal(true)}><IoMdAdd /></button>

        </div>
    </div>
    </div>
    
  );
}



 export default Addnews;

// import React, { useState, useEffect } from 'react';
// import Addnewsposter from '../images/Addnewsposter.svg';
// import '../Styles/profilecss.css';
// import Addnewscomponent from '../components/Addnewscomponent';
// import { IoMdAdd } from "react-icons/io";
// import Axios from 'axios'; // Import Axios without curly braces

// function Addnews() {
//   const [showNewsModal, setShowNewsModal] = useState(false);
//   const [newsss, setNewsss] = useState([]);

//   const closeAddEventsModal = () => {
//     setShowNewsModal(false);
//   };

//   const addNewsCards = (newsCards) => {
//     setNewsss([...newsss, newsCards]);
//   };

//   useEffect(() => {
//     Axios.get("http://localhost:3001/news")
//       .then(res => {
//         setNewsss(res.data);
//       })
//       .catch(error => {
//         console.error('Error fetching news:', error);
//       });
//   }, []);

//   return (
//     <div className='manageevents_maincontainer'>
//       <p className='paragraph_in_manage_events'>Please press the below button to add news</p>
//       <div className='manageevents_container'>
//         <div className='manageevents_component'>
//           {newsss.map(newsCards => (
//             <div key={newsCards.id} className="newsCard">
//               <div className='imagenewsCard'>
//                 <img src={newsCards.imageOfNews} alt="News" />
//               </div>
//               <div className='titleofevent'>
//                 <p className='titleofevent'>{newsCards.titleOfNews}</p>
//                 <button className='button_of_readmore'>Read More</button>
//               </div>
//               <div className='EditAndDelete'>
//                 <button className='Editevent_button'>Edit</button>
//                 <button className='deleteevent_button'>Delete</button>
//               </div>
//             </div>
//           ))}
//           {showNewsModal && (
//             <Addnewscomponent close={closeAddEventsModal} addNewsCards={addNewsCards} />
//           )}
//           <button className='add_button' onClick={() => setShowNewsModal(true)}><IoMdAdd /></button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Addnews;