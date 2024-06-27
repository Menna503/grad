import './model.css';
import { BsPersonGear } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BackDrop = () => {
  return <div className="backDrop"></div>;
};


const OverlayerEdit = ({ close, AdminToEdit, fetchData }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({
    name: '',
    nationalId: '',
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (AdminToEdit) {
      setData(AdminToEdit);
    }
  }, [AdminToEdit]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      },5000); 
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  function Submit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!data.name && !data.nationalId) {
      setErrorMessage(t("At least one field must be updated"));
      return;
    }
  
    if (data.nationalId && data.nationalId.length !== 14 && data.nationalId !== AdminToEdit.nationalId) {
      setErrorMessage(t("National ID should be exactly 14 characters"));
      return;
    }
  
    if (token) {
      axios.patch(`${'/controller/admin'}/${AdminToEdit._id}`, data, {
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
    setErrorMessage(""); // Reset error message whenever input changes
  }

  return (
    <div className="overlay">
      <button className='close_pop' onClick={close}><IoIosClose /></button>
      <div className={i18n.language === 'ar' ? ' edit rotate_y' : ' edit'}>
        <BsPersonGear className='edit_i_pop' />
        <h1 className={i18n.language === 'ar' ? 'edit_h_pop rotate_y' : 'edit_h_pop'}>{t('edit data')}</h1>
      </div>
      <div className='img_edit_pop'><img src='/edit_admin.svg' /></div>
      <form onSubmit={Submit} className='form_continer'>
        <div className='inputs_continer'>
          <input
            type='text'
            className='input'
            id='name'
            value={data.name}
            onChange={handle}
            placeholder='Enter Admin Name'
          />
          <input
            type='text'
            className='input'
            id='nationalId'
            value={data.nationalId}
            onChange={handle}
            placeholder='Enter ID'
          />
        </div>
        <button className='edit_buuton' type='submit'>{t('edit')}</button>
        {errorMessage && <div className='error_message' style={{ color: 'red', fontSize: '24px' }}>{errorMessage}</div>}
      </form>
    </div>
  );
}



const OverlayerAddAdmin = ({ close, addNewAdmin, fetchData }) => {
  const { t, i18n } = useTranslation();
  const [inputData, setInputData] = useState({
    name: '',
    nationalId: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputData.name || !inputData.nationalId || !inputData.password) {
      setErrorMessage(t("All fields are required"));
      return;
    }

    if (inputData.nationalId.length !== 14) {
      setErrorMessage(t("National ID should be exactly 14 characters"));
      return;
    }

    if (inputData.password.length < 8) {
      setErrorMessage(t("Password should be at least 8 characters"));
      return;
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios.post('controller/add', inputData, config)
      .then(res => {
        addNewAdmin(res.data);
        fetchData();
        close();
      })
      .catch(error => {
        console.error('Error adding admin:', error);
      });
  };

  return (
    <div className="overlay overlay_add">
      <button className='close_pop' onClick={close}><IoIosClose /></button>
      <div className={i18n.language === 'ar' ? 'edit rotate_y' : 'edit'}>
        <BsPersonGear className='edit_i_pop' />
        <h1 className={i18n.language === 'ar' ? 'edit_h_pop rotate_y' : 'edit_h_pop'}>{t('Add Admin')}</h1>
      </div>
      <div className='img_edit_pop'><img className='img_add_admin' src='/add_admin.svg' /></div>
      <form onSubmit={handleSubmit} className='form_continer'>
        <div className='inputs_continer'>
          <input
            onChange={e => setInputData({ ...inputData, name: e.target.value })}
            type='text'
            className='input'
            placeholder={t('please enter admin name')}
          />
          <input
            onChange={e => setInputData({ ...inputData, nationalId: e.target.value })}
            type='text'
            className='input'
            placeholder={t('please enter national id')}
          />
          <input
            onChange={e => setInputData({ ...inputData, password: e.target.value })}
            type='password'
            className='input'
            placeholder={t('please enter password')}
          />
        </div>
        <button className='edit_buuton' type='submit'>{t('Add')}</button>
        {errorMessage && <div className='error_message' style={{ color: 'red',fontSize:'24px' }}>{errorMessage}</div>}
      </form>
    </div>
  );
};

const OverlayerDeleteAdmin = ({ close, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className='overlay overlay_delete'>
      <button className='close_pop' onClick={close}><IoIosClose /></button>
      <p className='p_delete'>{t('are you sure you want to delete ?')}</p>
      <button className='yes_button' onClick={onDelete}>{t('yes')}</button>
    </div>
  );
};

function Model({ edit_model, add_model, delete_model, close_model, onDelete, update, item, data, setData, AdminToEdit, addNewAdmin, fetchData }) {
  return (
    (edit_model || add_model || delete_model) && (
      <>
        {createPortal(
          <>
            <BackDrop />
            {edit_model && <OverlayerEdit close={close_model} AdminToEdit={AdminToEdit} fetchData={fetchData} />}
            {delete_model && <OverlayerDeleteAdmin close={close_model} onDelete={onDelete} />}
            {add_model && <OverlayerAddAdmin close={close_model} addNewAdmin={addNewAdmin} fetchData={fetchData} />}
          </>,
          document.getElementById('model')
        )}
      </>
    )
  );
}

export default Model;
