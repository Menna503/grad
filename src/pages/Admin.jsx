// import React, { useEffect, useState } from 'react';
// import { IoMdAdd } from "react-icons/io";
// import {
//   FaRegEdit
// }from "react-icons/fa";
// import { RiDeleteBinLine } from "react-icons/ri";
// import Model from '../model/model';
// import axios from 'axios';

// const Admin = () => {
//   const [editModel, setEditModel] = useState(false);
//   const [addModel, setAddModel] = useState(false);
//   const [deleteCandidateModel, setDeleteCandidateModel] = useState(false);

//   const [data, setData] = useState([]);
 
//   const[editId,setEditId]=useState(-1);
//   useEffect(() => {
//     fetchData();
//   }, []);
// // add new admin
//   const fetchData = () => {
//     axios.get('http://localhost:3000/users')
//       .then(res => setData(res.data))
//       .catch(err => console.log(err));
//   };

//   const updateData = (newData) => {
//     setData([...data, newData]);
//   };
//   //edit admin information
//   // const handleEdit =(id)=>{
//   //        setEditId(id)
//   // }
//   const handleEdit = (id) => {
//     setEditId(id); // تحديث مؤشر العنصر المحدد
//     setEditModel(true); // فتح نافذة التحرير
//   };

 

//   return (
//     <>
//       <Model
//        edit_model={editModel}
//         add_model={addModel}
//         delete_model={deleteCandidateModel}
//         close_model={() => { setEditModel(false); setAddModel(false); setDeleteCandidateModel(false) }}
//          update={updateData}
//         //  item={editModel}
//         item={data.find(item => item.id === editId)}

//         // editingItem={editingItem} 
//         // onSubmitEdit={handleSubmitEdit} 
//         // updatefieldData={ updatefieldData}
//       />
//       <div className='top'>
//         <div className='continer_table'>
//           <table>
//             <tbody>
//               {data.map((item, i) => (
              
//                 <tr key={i}>
//                   <td ><div><img src="/admin_picture.svg" /></div></td>
//                   <td>{item.name}</td>
//                   <td>{item.id}</td>
//                   <td>  
//                     <div>
//                     <button className='edit_icon delete_edit_ic'  onClick={() => handleEdit(item.id)}><FaRegEdit /></button>

//                       <button className='delete_icon  delete_edit_ic' onClick={() => setDeleteCandidateModel(true)}><RiDeleteBinLine /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
         
//         </div>
//         <button className='add' onClick={() => setAddModel(true)}> <IoMdAdd /></button>
//       </div>
//     </>
//   );
// };

// export default Admin;
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';
import {FaRegEdit}from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Model from '../model/model';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWM0ZjJlN2FhMzJkNWNhMzc1YWU5OSIsIm5hbWUiOiJ0YWhlciIsIm5hdGlvbmFsSWQiOjMwMjA5MjMxMzAxMTQ0LCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTM1NTA1ODMsImV4cCI6MTcxNjE0MjU4M30.dkqM6CgK9W2LJyNVd3paJe0Y2FWIuEHqZjy8CrgVLGA";
const Admin = () => {
  const [editModel, setEditModel] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [deleteCandidateModel, setDeleteCandidateModel] = useState(false);

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);

   const fetchData = () => {
  //   axios.get('https://graduation-project-273e.onrender.com')
  //     .then(res => setData(res.data))
  //     .catch(err => console.log(err));
  // };
  axios.get('https://graduation-project-273e.onrender.com/api/controller/add', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
.then(res => setData(res.data))
.catch(err => console.log(err));
   };

  const updateData = (newData) => {
    setData([...data, newData]);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEditModel(true);
  };

  return (
    <>
      <Model
        edit_model={editModel}
        add_model={addModel}
        delete_model={deleteCandidateModel}
        close_model={() => { setEditModel(false); setAddModel(false); setDeleteCandidateModel(false) }}
        update={updateData}
        item={data.find(item => item.id === editId)}
        data={data}
        setData={setData}
      />
      <div className='top'>
        <div className='continer_table'>
          <table>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td><div><img src="/admin_picture.svg" /></div></td>
                  <td>{item.name}</td>
                  <td>{item.id}</td>
                  <td>
                    <div>
                      <button className='edit_icon delete_edit_ic' onClick={() => handleEdit(item.id)}><FaRegEdit /></button>
                      <button className='delete_icon  delete_edit_ic' onClick={() => setDeleteCandidateModel(true)}><RiDeleteBinLine /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='add' onClick={() => setAddModel(true)}> <IoMdAdd /></button>
      </div>
    </>
  );
};

export default Admin;
