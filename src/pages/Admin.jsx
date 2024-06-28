
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import Model from '../model/model';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getToken,englishToArabicNumber } from '../utils/authentication';

const Admin = () => {
    const [editModel, setEditModel] = useState(false);
    const [addModel, setAddModel] = useState(false);
    const [deleteAdminModel, setDeleteAdminModel] = useState(false);
    const [data, setData] = useState([]);
    const [AdminToEdit, setAdminToEdit] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const token = getToken() || '';
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [token, navigate, updateTrigger]);

    const fetchData = () => {
        axios.get('controller', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            const adminArray = res.data.data.admins;
            if (Array.isArray(adminArray)) {
                setData(adminArray);
            } else {
                console.error('Fetched admin data is not an array', res.data);
            }
        })
        .catch(error => {
            console.error('Error fetching admins:', error);
        });
    };

    const addNewAdmin = (item) => {
        setAddModel(false); 
        setUpdateTrigger(prev => !prev);
    };

    const editAdmin = (item) => {
        setAdminToEdit(item);
        setEditModel(true);
    };

    const deleteAdmin = (_id) => {
        if (token) {
            axios.delete(`controller/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                console.log('Admin deleted successfully:', _id);
                const newData = data.filter(item => item._id !== _id);
                setData(newData);
                setDeleteAdminModel(false);
                setDeleteItemId(null);
            })
            .catch(error => {
                console.error('Error deleting admin:', error);
            });
        }
    };

    const getClassName = (baseClass) => {
        return i18n.language === 'ar' ? `${baseClass} rotate_y` : baseClass;
    };
    const convertToArabic = (number) => {
        return i18n.language === 'ar' ? englishToArabicNumber(number.toString()) : number;
    };

    return (
        <>
            <div className='top'>
                <div className='continer_table'>
                    <table className={getClassName('')}>
                        <tbody>
                            {data.map((item) => (
                                <React.Fragment key={item._id}>
                                    <tr>
                                        <td className={getClassName('')}>
                                            <div>
                                                {i18n.language === 'ar' ? (
                                                    <img className='img_admin' src="/arabic_admin.svg" alt="ادمن" />
                                                ) : (
                                                    <img className='img_admin' src="/admin_picture.svg" alt="ADMIN" />
                                                )}
                                            </div>
                                        </td>
                                        <td className={getClassName('')}>{item.name}</td>
                                        <td className={getClassName('')}> {convertToArabic(item.nationalId)}</td>
                                        <td>
                                            <div className='Edit_and_Delete_News'>
                                                <button className='edit_icon delete_edit_ic' onClick={() => editAdmin(item)}> <FaRegEdit />  </button>
                                                <button className='delete_icon delete_edit_ic' onClick={() => { setDeleteItemId(item._id); setDeleteAdminModel(true); }}><RiDeleteBin6Fill /></button>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className={i18n.language === 'ar' ? 'add_button ' : 'add_button'} onClick={() => setAddModel(true)}> <IoMdAdd /></button>
            </div>
            {(editModel || addModel || deleteAdminModel) && (
                <Model
                    edit_model={editModel}
                    add_model={addModel}
                    delete_model={deleteAdminModel}
                    close_model={() => {
                        setEditModel(false);
                        setAddModel(false);
                        setDeleteAdminModel(false);
                        setDeleteItemId(null);
                    }}
                    setData={setData}
                    addNewAdmin={addNewAdmin}
                    onDelete={() => deleteAdmin(deleteItemId)}
                    AdminToEdit={AdminToEdit}
                    fetchData={fetchData}
                />
            )}
        </>
    );
}

export default Admin;
