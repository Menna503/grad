import React, { useState } from 'react';
import Axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import Addnewsposter from '../images/Addnewsposter.svg';
import { IoIosClose } from "react-icons/io";


function Addnewscomponent({ close ,addNewsCards}){
    
  const url = "http://localhost:3001/news";

  const [data, setData] = useState({
      titleOfNews: "",
      imageOfNews: "",
      news: ""
  });

  function Submit(e) {
    e.preventDefault();
   
        Axios.post(url, data)
            .then(res => {
                console.log(res.data);
                addNewsCards(res.data);
                close();
            })
            .catch(error => {
                console.error('Error adding event:', error);
            });
   
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
    <div className="newsModal" >
       <div className="newsModalContainer">
       <form  onSubmit={Submit}>

         <div className='Addnewslec'>

         <div className='closee_button' onClick={close}> <IoIosClose /> </div>

         <div className='Addnewwslec'>

        <div className='page_img_addnews' ><img src={Addnewsposter} alt=""  /> </div> 

        <div className='bigboxofAddnews' >
         <input  id="titleOfNews" onChange={handle} placeholder='Add Title Of The News' type='text' value={data.titleOfNews} className='box_of_Addnews'></input>
        </div>

           <div className='bigboxofAddnewsupload' >
         <input  id="imageOfNews"  onChange={handle} placeholder='Add Image Of The News' type='file' value={data.imageOfNews}  className='box_of_upload'></input>
        </div>
        

        <div className='bigboxofAddnewarea' >
         <textarea   id="news" onChange={handle} placeholder='News......' type='text' value={data.news}  className='box_of_Addnewsarea'></textarea>
        </div> 
    
          </div>
        <button className='adddd_button' type="submit">Add</button> 
        </div>

        
       </form>
       </div>
    </div>
  );
}

export default Addnewscomponent;

// import React, { useState } from 'react';
// import Axios from 'axios';
// import { IoIosClose } from "react-icons/io";
// import Addnewsposter from '../images/Addnewsposter.svg';

// function Addnewscomponent({ close, addNewsCards }) {
//   const url = "http://localhost:3001/news";
//   const [data, setData] = useState({
//     titleOfNews: "",
//     imageOfNews: "",
//     news: ""
//   });

//   function Submit(e) {
//     e.preventDefault();
//     Axios.post(url, data)
//       .then(res => {
//         addNewsCards(res.data);
//         close();
//       })
//       .catch(error => {
//         console.error('Error adding news:', error);
//       });
//   }

//   function handle(e) {
//     const { id, value } = e.target;
//     setData(prevData => ({
//       ...prevData,
//       [id]: value
//     }));
//   }

//   return (
//     <div className="newsModal">
//       <div className="newsModalContainer">
//         <form onSubmit={Submit}>
//           <div className='Addnewslec'>
//             <div className='closee_button' onClick={close}><IoIosClose /></div>
//             <div className='Addnewwslec'>
//               <div className='page_img_addnews'><img src={Addnewsposter} alt="" /></div>
//               <div className='bigboxofAddnews'><input id="titleOfNews" onChange={handle} placeholder='Add Title Of The News' type='text' value={data.titleOfNews} className='box_of_Addnews'></input></div>
//               <div className='bigboxofAddnewsupload'><input id="imageOfNews" onChange={handle} placeholder='Add Image Of The News' type='file' value={data.imageOfNews} className='box_of_upload'></input></div>
//               <div className='bigboxofAddnewarea'><textarea id="news" onChange={handle} placeholder='News......' type='text' value={data.news} className='box_of_Addnewsarea'></textarea></div>
//             </div>
//             <button className='adddd_button' type="submit">Add</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Addnewscomponent;