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
import {
  FaRegEdit
}from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Model from '../model/model';
import axios from 'axios';
import {FaRegEdit}from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Model from '../model/model';

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
    axios.get('http://localhost:3000/users')
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
