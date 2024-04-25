
import Styles from'./model.css';
import'./model.css';
import { BsPersonGear, BsPersonX  } from "react-icons/bs";
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
import axios, { Axios } from 'axios';
import React, { useState,useEffect } from 'react';
import'../Styles/profilecss.css';
import { useNavigate } from 'react-router-dom';
const BackDrop=()=>{
  return <div className="backDrop"></div>
}


// const Overlayer_edit = ({ close, item,item_id, data, setData }) => {
//   console.log(item);
//   const [formData, setFormData] = useState({
//     name: '',
//     nationalId:''
//   });
  
//   // useEffect(() => {
//   //   setFormData({
//   //     name: item.name,
//   //     nationalId: item.nationalId
//   //   });
//   // }, [item_id]);
//   useEffect(() => {
//     setFormData({
//         name: item.name,
//         nationalId: item.nationalId
//     });
// }, [item._id]); // تحديث البيانات عندما يتغير item_id


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // اتبع الخطوات اللازمة لإرسال البيانات إلى الخادم
//   };
  
//   return (
//     <div className="overlay">
//       <button className='close_pop' onClick={close}><IoIosClose/></button>  
//       <div className='edit'>
//         <BsPersonGear className='edit_i_pop'/>
//         <h1 className='edit_h_pop'>Edit Admin</h1>
//       </div>
//       <div className='img_edit_pop'><img src='/edit_admin.svg'/></div> 
//       <form onSubmit={handleSubmit} className='form_continer'>
//         <div className='inputs_continer'>
//         <input
//           type='text'
//           className='input'
//           name='name'
//           value={formData.name}
//           onChange={handleChange}
//           placeholder='Enter Admin Name'
//         />
       
//         <input
//           type='text'
//           className='input'
//           name='nationalId'
//           value={formData.nationalId}
//           placeholder='Enter ID'
//           onChange={handleChange}
//         />
//         </div>
//         <button className='edit_buuton' type='submit'>Edit</button>
//       </form>
//     </div>
//   );

// }



// const Overlayer_edit = ({ close, item,  data, setData, editId}) => {
//   const token = localStorage.getItem('token') || '';
//   console.log('admin id ',editId);
//   const [formData, setFormData] = useState({
//     id:editId,
//     name: '',
//     nationalId: ''
//   });
//   useEffect(() => {
//     if (editId && token) {
//         axios.get(`https://graduation-project-273e.onrender.com/api/controller/`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//         .then(res => {
//             setFormData({
//                 ...formData,
//                 name: res.data.name,
//                 nationalId: res.data.nationalId
//             });
//         })
//         .catch(err => console.log(err));
//     }
// }, [editId, token]);

  
//   return (
//     <div className="overlay">
//       <button className='close_pop' onClick={close}><IoIosClose/></button>  
//       <div className='edit'>
//         <BsPersonGear className='edit_i_pop'/>
//         <h1 className='edit_h_pop'>Edit Admin</h1>
//       </div>
//       <div className='img_edit_pop'><img src='/edit_admin.svg'/></div> 
//       <form  className='form_continer'>
//         <div className='inputs_continer'>
//           <input
//             type='text'
//             className='input'
//             name='name'
//             value={formData.name}
//             onChange
//             placeholder='Enter Admin Name'
//           />
//           <input
//             type='text'
//             className='input'
//             name='nationalId'
//             value={formData.nationalId}
//             placeholder='Enter ID'
//             onChange
//           />
//         </div>
//         <button className='edit_buuton' type='submit'>Edit</button>
//       </form>
//     </div>
//   );
// }




const Overlayer_edit = ({ close, item, _id }) => {
  console.log('the person id',_id);
  const token = localStorage.getItem('token') || '';
  const [formData, setFormData] = useState({
    name: '',
    nationalId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (_id && token) {
          const res = await axios.get(`https://graduation-project-273e.onrender.com/api/controller${_id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const { name, nationalId } = res.data.data;
          setFormData({ name, nationalId });
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, [_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (_id && token) {
        // https://graduation-project-273e.onrender.com/api/controller/${_id}`
        await axios.patch(`https://graduation-project-273e.onrender.com/api/controller/admin/${_id}`
        , formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        // Handle successful update
      }
    } catch (error) {
      console.error('Error updating admin data:', error);
    }
  };

  return (
    <div className="overlay">
      <button className='close_pop' onClick={close}><IoIosClose /></button>
      <div className='edit'>
        <BsPersonGear className='edit_i_pop' />
        <h1 className='edit_h_pop'>Edit Admin</h1>
      </div>
      <div className='img_edit_pop'><img src='/edit_admin.svg' /></div>
      <form className='form_continer' onSubmit={handleSubmit}>
        <div className='inputs_continer'>
          <input
            type='text'
            className='input'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter Admin Name'
          />
          <input
            type='text'
            className='input'
            name='nationalId'
            value={formData.nationalId}
            onChange={handleChange}
            placeholder='Enter ID'
          />
        </div>
        <button className='edit_buuton' type='submit'>Edit</button>
      </form>
    </div>
  );
}







const Overlayer_add_admin = ({ close, updates}) => {
  const [inputData, setInputData] = useState({
    name: '',
    nationalId: '',
    password:''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios.post('https://graduation-project-273e.onrender.com/api/controller/add', inputData, config)
      .then(res => {
        // Update the state with the new admin data
        updates(res.data );
        close();
        
        
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="overlay">
      <button className='close_pop' onClick={close}><IoIosClose /></button>
      <div className='edit'>
        <BsPersonGear className='edit_i_pop' />
        <h1 className='edit_h_pop'>Add admin</h1>
      </div>
      <div className='img_edit_pop'><img src='/add_admin.svg' /></div>
      <form onSubmit={handleSubmit} className='form_continer'>
        <div className='inputs_continer'>
          <input onChange={e => setInputData({ ...inputData, name: e.target.value })} type='name' className='input' placeholder='Enter Admin Name ' ></input>
          <input onChange={e => setInputData({ ...inputData, nationalId: e.target.value })} type='id' className='input' placeholder='Enter National ID'></input>
          <input onChange={e => setInputData({ ...inputData, password: e.target.value })} type='password' className='input' placeholder='Enter Password ' ></input>
        </div>
        <button className='edit_buuton' type='submit'>Add</button>
      </form>
    </div>
  );
}


const Overlayer_delete_admins = ({ close ,onDelete}) => {
  return (
    <div className='overlay overlay_delete'>
      <button className='close_pop' onClick={close}><IoIosClose/></button> 
      <BsPersonX className='Overlayer_delete_icon'/>
      <p className='p_delete'> are you sure you want to delete?</p>
      <button className='yes_button'onClick={onDelete} >yes</button>
    </div>
  );
}
const Overlayer_delete_candidate = ({ close ,onDelete}) => {
  return (
    <div className='overlay overlay_delete'>
      <button className='close_pop' onClick={close}><IoIosClose/></button> 
      <BsPersonX className='Overlayer_delete_icon'/>
      <p className='p_delete'> are you sure you want to delete?</p>
      <button className='yes_button'onClick={onDelete} >yes</button>
    </div>
  );
}

function Model({edit_model,add_model,delete_model,delet_candidate,close_model,onDelete,update,item,data,setData,_id}) {
  return (
   (edit_model||add_model||delete_model ||delet_candidate)&& (
    <>
    {createPortal(
    < >
           <BackDrop/>
           
          {  edit_model&&<  Overlayer_edit close={close_model} item={item} data={data} setData={setData} _id={_id}/>}
          {  delete_model&&<  Overlayer_delete_admins close={close_model }onDelete={onDelete} item={item}/>}
           
         { add_model&& < Overlayer_add_admin close={close_model} updates={update} />}
         {/* {add_event&&<Overlayer_add_event/>} */}
         {  delet_candidate&&<  Overlayer_delete_candidate close={close_model }onDelete={onDelete} item={item}/>}
        
          
    </>,document.getElementById('model')
    )}
    </>
  ))
}

export default Model;
