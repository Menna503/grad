import Styles from'./model.css';
import'./model.css';
import {  BsPersonX ,BsPersonGear } from "react-icons/bs";
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
import axios, { Axios } from 'axios';
import React, { useState } from 'react';
import'../Styles/profilecss.css';
import { useNavigate } from 'react-router-dom';
import { CgPassword } from 'react-icons/cg';

const BackDrop = () => {
  return <div className="backDrop"></div>;
};

// const OverlayerEdit = ({ close, item, data, setData }) => {
//   const [formData, setFormData] = useState({
//     name: item.name,
//     id: item.id
//   });

//   const [nameWarning, setNameWarning] = useState(false);
//   const [idWarning, setIdWarning] = useState(false);
//   const [nationalIdWarning, setNationalIdWarning] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const validateNationalID = (id) => {
//     if (id.length !== 14) {
//       setNationalIdWarning(true);
//       return false;
//     }
//     const isExists = data.some(admin => admin.id === id && admin.id !== item.id);
//     if (isExists) {
//       setNationalIdWarning(true);
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setNameWarning(false);
//     setIdWarning(false);
//     setNationalIdWarning(false);

//     if (!formData.name.trim()) {
//       setNameWarning(true);
//       return;
//     }
//     if (!formData.id.trim()) {
//       setIdWarning(true);
//       return;
//     }
//     if (!validateNationalID(formData.id)) {
//       return;
//     }

//     axios.put(`http://localhost:3000/users/${item.id}`, formData)
//       .then(res => {
//         const updatedData = data.map(admin => {
//           if (admin.id === item.id) {
//             return {
//               ...admin,
//               name: formData.name,
//               id: formData.id
//             };
//           }
//           return admin;
//         });
//         setData(updatedData);
//         close();
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div className="overlay">
//       <button className='close_pop' onClick={close}><IoIosClose/></button>  
//       <div className='edit'>
//         <h1 className='edit_h_pop'>Edit Admin</h1>
//         <div className='img_edit_pop'><img src='/edit_admin.svg'/></div> 
//       </div>
//       <form onSubmit={handleSubmit} className='form_container'>
//         <div className='inputs_container'>
//           <input
//             type='text'
//             className='input'
//             name='name'
//             value={formData.name}
//             onChange={handleChange}
//             placeholder='Enter Admin Name'
//           />
//           {nameWarning && <div className="warning">Please enter admin name</div>}
//           <input
//             type='text'
//             className='input'
//             name='id'
//             value={formData.id}
//             placeholder='Enter ID'
//             onChange={handleChange}
//           />
//           {idWarning && <div className="warning">Please enter national ID</div>}
//           {nationalIdWarning && <div className="warning">National ID should be 14 digits and not already existing in the database</div>}
//         </div>
//         <button className='edit_button' type='submit'>Edit</button>
//       </form>
//     </div>
//   )
// };
const Overlayer_edit = ({ close, item, data, setData }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    id: item.id
  });

  const [nameWarning, setNameWarning] = useState(false);
  const [idWarning, setIdWarning] = useState(false);
  const [nationalIdWarning, setNationalIdWarning] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateNationalID = (id) => {
    if (id.length !== 14) {
      setNationalIdWarning(true);
      return false;
    }
    const isExists = data.some(admin => admin.id === id && admin.id !== item.id);
    if (isExists) {
      setNationalIdWarning(true);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameWarning(false);
    setIdWarning(false);
    setNationalIdWarning(false);

    if (!formData.name.trim()) {
      setNameWarning(true);
      return;
    }
    if (!formData.id.trim()) {
      setIdWarning(true);
      return;
    }
    if (!validateNationalID(formData.id)) {
      return;
    }

    axios.put(`http://localhost:3000/users/${item.id}`, formData)
      .then(res => {
        const updatedData = data.map(admin => {
          if (admin.id === item.id) {
            return {
              ...admin,
              name: formData.name,
              id: formData.id
            };
          }
          return admin;
        });
        setData(updatedData);
        close();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="overlay">
      <button className='close_pop' onClick={close}><IoIosClose/></button>  
      <div className='edit'>
        <BsPersonGear className='edit_i_pop'/>
        <h1 className='edit_h_pop'>Edit Admin</h1>
      </div>
      <div className='img_edit_pop'><img src='/edit_admin.svg'/></div> 
      <form onSubmit={handleSubmit} className='form_continer'>
        <div className='inputs_continer'>
        <input
          type='text'
          className='input'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Enter Admin Name'
        />
        {nameWarning && <div className="warning">يرجى إدخال اسم المستخدم</div>}
        <input
          type='text'
          className='input'
          name='id'
          value={formData.id}
          placeholder='Enter ID'
          onChange={handleChange}
        />
        {idWarning && <div className="warning">يرجى إدخال الرقم القومي</div>}
        {nationalIdWarning && <div className="warning">الرقم القومي يجب أن يكون مكونًا من 14 رقمًا وغير موجود بالفعل في قاعدة البيانات</div>}
        </div>
        <button className='edit_buuton' type='submit'>Edit</button>
      </form>
    </div>
  )
}


const OverlayerAddAdmin = ({ close, updates }) => {
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
        Authorization: `Bearer ${token}`, // Correctly enclosed in backticks
      }
    };

    axios.post('https://graduation-project-273e.onrender.com/api/controller/add', inputData, config)
      .then(res => {
        updates(res.data);
        close();
      })
      .catch(error => {
        console.error('Error adding admin:', error);
      });
  };

  return (
    <div className="overlay">
    <button className='close_pop'onClick={close}><IoIosClose/></button>   
      <div className='edit'>
          <BsPersonGear className='edit_i_pop'/>
          <h1 className='edit_h_pop'>add admin</h1>
          
      </div>
     <div className='img_edit_pop'><img src='/add_admin.svg'/></div> 
     <form onSubmit={handleSubmit} className='form_continer'>
      <div className='inputs_continer'>
      <input onChange={e => setInputData({...inputData, name: e.target.value})} type='text' className='input' placeholder='Enter Admin Name'/>
          <input onChange={e => setInputData({...inputData, nationalId: e.target.value})} type='text' className='input' placeholder='Enter National ID'/>
          <input onChange={e => setInputData({...inputData, password: e.target.value})} type='password' className='input' placeholder='Enter Admin Password'/>
    </div>
     <button className='edit_buuton'type='submit'> add</button>
     </form>
    
     </div>);

};

// const OverlayerDeleteCandidate = ({ close, onDelete }) => {
//   return (
//     <div className='overlay overlay_delete'>
//       <button className='close_pop' onClick={close}><IoIosClose/></button> 
//       <p className='p_delete'>Are you sure you want to delete?</p>
//       <button className='yes_button' onClick={onDelete}>Yes</button>
//     </div>
//   );
// };
const OverlayerDeleteAdmin = ({ close, onDelete }) => {
  return (
    <div className='overlay overlay_delete'>
      <button className='close_pop' onClick={close}><IoIosClose/></button> 
      <p className='p_delete'>Are you sure you want to delete?</p>
      <button className='yes_button' onClick={onDelete}>Yes</button>
    </div>
  );
};

const OverlayerAddEvent = () => {
  const url = "";
  const [data, setData] = useState({
    header: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, {
      header: data.header,
      description: data.description
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="overlay overlayer_event">
      <form onSubmit={handleSubmit}>
        <div className='Addnelec'>
          <div className='bigboxofAddevents'>
            <input onChange={handleInputChange} id="header" placeholder='Title' type='text' className='box_of_Adde' />
          </div>
          <div className='Addeventslec'>  
            <div className='bigboxofAddevents'>
              <p className='PofmanageEvents'>Start</p>
              <input onChange={handleInputChange} id="startDate" placeholder='' type='date' className='box_of_Addevents' />
            </div>
            <div className='bigboxofAddevents'>
              <p className='PofmanageEvents'>End</p>
              <input onChange={handleInputChange} id="endDate" placeholder='' type='date' className='box_of_Addevents' />
            </div>
          </div>
          <button className='addd_button' type='submit'>Add</button> 
        </div>
      </form>
    </div>
  );
};

function Model({ edit_model, add_model, delete_model, add_event, close_model, onDelete, update, item, data, setData }) {
  return (
    (edit_model||add_model||delete_model)&& (
    <>
      {createPortal(
        <>
          <BackDrop />
          {  edit_model&&<  Overlayer_edit close={close_model} item={item} data={data} setData={setData}/>}
          {delete_model && <OverlayerDeleteAdmin close={close_model} onDelete={onDelete} />}
          {add_model && <OverlayerAddAdmin close={close_model} updates={update} />}
          {/* {add_event && <OverlayerAddEvent />} */}
        </>,
        document.getElementById('model')
      )}
    </>
  ))
}

export default Model;
