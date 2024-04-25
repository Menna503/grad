import Styles from'./model.css';
import'./model.css';
import { BsPersonGear, BsPersonX  } from "react-icons/bs";
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
import axios, { Axios } from 'axios';
import React, { useState } from 'react';
import'../Styles/profilecss.css';
import { useNavigate } from 'react-router-dom';
const BackDrop=()=>{
  return <div className="backDrop"></div>
}

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


const Overlayer_add_admin=({close,updates})=>{
  const[inputData,setInputData]=useState({
    name:'',
    nationalId:''
  })
  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('https://graduation-project-273e.onrender.com/api/controller/add',inputData)
    .then(res=>{
      // alert("data posted successfully")
      updates(res.data);
      close();
    
      // updateDatas(res.data);
      
    }
      )
  }
  
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
     <input  onChange={e =>setInputData({...inputData,name:e.target.value})} type='name' className='input'placeholder='Enter Admin Name ' ></input>
     <input  onChange={e =>setInputData({...inputData,id:e.target.value})} type='id' className='input' placeholder='Enter ID'></input>
    </div>
     <button className='edit_buuton'type='submit'> add</button>
     </form>
    
     </div>);

}

const Overlayer_delete_candidate = ({ close, onDelete }) => {
  return (
    <div className='overlay overlay_delete'>
      <button className='close_pop' onClick={close}><IoIosClose/></button> 
      <BsPersonX className='Overlayer_delete_icon'/>
      <p className='p_delete'> are you sure you want to delete?</p>
      <button className='yes_button' onClick={onDelete}>yes</button>
    </div>
  );
}
const Overlayer_add_event=()=>{
  const url =""
const [data, setData] = useState({
  header:"",
  // imageOfNews:"",
  description:""

})

function Submit(e){
  e.preventDefault();
  Axios.post(url,{
    header: data.header,
    // imageOfNews: data.imageOfNews,
    description: data.description
  })
     .then(res=>{
         console.log(res.data)
      })
}

function handle(e){
   const newdata ={ ...data }
   newdata[e.target.id] = e.target.value
   setData(newdata)
   console.log(newdata)
}
  return(
<div className="overlay overlayer_event">

<form onSubmit={(e)=> Submit(e)}>

<div className='Addnelec'>
           
<div className='bigboxofAddevents' >
     <input onChange={(e)=>handle(e)} id="titleOfNews" /*value={data.titleOfNews}*/ placeholder='Title' type='text'  className='box_of_Adde'></input>
    </div>


    <div className='Addeventslec'>  

    <div className='bigboxofAddevents' >
        <p className='PofmanageEvents'>start</p>
        <input onChange={(e)=>handle(e)} id="titleOfNews" /* value={data.titleOfNews}*/ placeholder='' type='date'  className='box_of_Addevents'></input>
     </div>

     <div className='bigboxofAddevents' >
        <p className='PofmanageEvents'> end</p>
        <input onChange={(e)=>handle(e)} id="titleOfNews" /*value={data.titleOfNews}*/ placeholder='' type='date'  className='box_of_Addevents'></input>
        </div>
        </div>

<button className='addd_button'>Add</button> 
</div>


</form>
    


</div>
  );
}
function Model({edit_model,add_model,delete_model,add_event,close_model,onDelete,update,item,data,setData}) {
  return (
   (edit_model||add_model||delete_model ||add_event)&& (
    <>
    {createPortal(
    < >
           <BackDrop/>
           
          {  edit_model&&<  Overlayer_edit close={close_model} item={item} data={data} setData={setData}/>}
          {  delete_model&&<  Overlayer_delete_candidate close={close_model } onDelete={onDelete}/>}
           
         { add_model&& < Overlayer_add_admin close={close_model} updates={update}/>}
         {add_event&&<Overlayer_add_event/>}
        
          
    </>,document.getElementById('model')
    )}
    </>
  ))
}

export default Model;
