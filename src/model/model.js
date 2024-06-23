
import'./model.css';
import { BsPersonGear } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import React, { useState,useEffect } from 'react';
const BackDrop = () => {
  return <div className="backDrop"></div>;
};


const Overlayer_edit = ({ close,AdminToEdit,fetchData }) => {
  const { t, i18n } = useTranslation();
  const [Data, setData] = useState({
    name: '',
    nationalId: '',

  });

  useEffect(() => {
    if (AdminToEdit) {
        setData(AdminToEdit);
    }
}, [AdminToEdit]);

function Submit(e){
  e.preventDefault();
  const token = localStorage.getItem('token');
 console.log(AdminToEdit._id)

  if (token) {
    
     axios.patch(`${'/controller/admin'}/${AdminToEdit._id}`, Data,{

        headers: {
          Authorization: `Bearer ${token}`

        }
    })
        .then(res => {
          console.log(res.data);
          fetchData();
          close();
        })
        .catch(error => {
            console.error('Error editing admin', error);
        });
}
}

  function handle(e) {
    const { id, value } = e.target;
    setData(prevData => ({
        ...prevData,
        [id]: value
    }));

}



  return (
    <div className="overlay">
      <button className='close_pop' onClick={close}><IoIosClose/></button>  
      <div className={i18n.language === 'ar' ? ' edit rotate_y' : ' edit'}>
        <BsPersonGear className='edit_i_pop'/>
        <h1 className={ i18n.language=='ar'?'edit_h_pop rotate_y':'edit_h_pop'}>{t('edit data')}</h1>
      </div>
      <div className='img_edit_pop'><img src='/edit_admin.svg'/></div> 
      <form onSubmit={Submit} className='form_continer'>
        <div className='inputs_continer'>
        <input
          type='text'
          className='input'
          id='name'
          value={Data.name}
          onChange={handle}
          placeholder='Enter Admin Name'
        />
     
        <input
          type='text'
          className='input'
          id='nationalId'
          value={Data.nationalId}
          placeholder='Enter ID'
          onChange={handle}
        />
       
  
        </div>
        <button className='edit_buuton' type='submit'>{t('edit')}</button>
      </form>
    </div>
  )
}


const OverlayerAddAdmin = ({ close,addNewAdmin, updates , fetchData }) => {
  const { t, i18n } = useTranslation();
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

    axios.post('controller/add', inputData, config)
      .then(res => {
        addNewAdmin(res.inputData);
        fetchData();
        close();
      })
      .catch(error => {
        console.error('Error adding admin:', error);
      });
  };

  return (
    <div className="overlay">
    <button className='close_pop'onClick={close}><IoIosClose/></button>   
      <div className={i18n.language=='ar'?'edit rotate_y':'edit'}>
          <BsPersonGear className='edit_i_pop'/>
          <h1 className={i18n.language=='ar'?'edit_h_pop  rotate_y':'edit_h_pop '} >{t('Add Admin')}</h1>
          
      </div>
     <div className='img_edit_pop'><img  className='img_add_admin'src='/add_admin.svg'/></div> 
     <form onSubmit={handleSubmit} className='form_continer'>
      <div className='inputs_continer'>
      <input onChange={e => setInputData({...inputData, name: e.target.value})} type='text' className='input' placeholder={t('please enter admin name')}/>
          <input onChange={e => setInputData({...inputData, nationalId: e.target.value})} type='text' className='input' placeholder={t('please enter nathional id')}/>
          <input onChange={e => setInputData({...inputData, password: e.target.value})} type='password' className='input' placeholder={t('please enter password')}/>
    </div>
     <button className='edit_buuton'type='submit'> {t('Add')}</button>
     </form>
    
     </div>);

};
const OverlayerDeleteAdmin = ({ close, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className='overlay overlay_delete'>
      <button className='close_pop' onClick={close}><IoIosClose/></button> 
      <p className='p_delete'>{t('are you sure you want to delete ?')}</p>
      <button className='yes_button' onClick={onDelete}>{t('yes')}</button>
    </div>
  );
};

function Model({ edit_model, add_model, delete_model, close_model, onDelete, update, item, data, setData, AdminToEdit,addNewAdmin, fetchData}) {
  return (
    (edit_model||add_model||delete_model)&& (
    <>
      {createPortal(
        <>
          <BackDrop />
          {  edit_model&&<  Overlayer_edit close={close_model} item={item} data={data} setData={setData} AdminToEdit={AdminToEdit}  fetchData={ fetchData}/>}
          {delete_model && <OverlayerDeleteAdmin close={close_model} onDelete={onDelete} />}
          {add_model && <OverlayerAddAdmin close={close_model} updates={update} addNewAdmin={addNewAdmin} fetchData={ fetchData} />}
      
        </>,
        document.getElementById('model')
      )}
    </>
  ))
}

export default Model;