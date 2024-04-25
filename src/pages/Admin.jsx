
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Model from '../model/model';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [editModel, setEditModel] = useState(false);
    const [addModel, setAddModel] = useState(false);
    const [deleteadminModel, setDeleteAdminModel] = useState(false);
    const [data, setData] = useState([]);
    const [_id, set_Id] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null); // New state to track the item ID to be deleted
    const token = localStorage.getItem('token') || '';

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = () => {
        if(token){
            axios.get('https://graduation-project-273e.onrender.com/api/controller', {
                
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                const adminArray = res.data.data.admins
                console.log('res', res.data.data.admins);
                if(Array.isArray(adminArray)){
                    setData(adminArray);
                } else {
                    console.error('Fetched admin data is not an array', res.data);
                }
            })
            .catch(error => {
                console.error('Error fetching admins:', error);
            });
        }
    };

    const updateData = (newData) => {
        setData(prevData => [...prevData, newData]);
    };

    const handleEdit = (_id) => {
        // console.log('admin id in handel edit ',_id);
        set_Id(_id);
        setEditModel(true);
    };
   
    const deleteAdmin = (_id) => {
        if (token) {
            axios.delete(`https://graduation-project-273e.onrender.com/api/controller/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => {
                console.log('Admin deleted successfully:', _id);
                const newData = data.filter(item => item._id !== _id);
                setData(newData);
                setDeleteAdminModel(false);
                setDeleteItemId(null); // Reset deleteItemId after successful deletion
            })
            .catch(error => {
                console.error('Error deleting admin:', error);
            });
        }
    };
    

    return (
        <>
            <div className='top'>
                <div className='continer_table'>
                    <table>
                        <tbody>
                            {data.map((item) => (
                                <React.Fragment key={item._id}>
                                    <tr>
                                        <td><div><img src="/admin_picture.svg" alt="Admin" /></div></td>
                                        <td>{item.name}</td>
                                        <td>{item.nationalId}</td>
                                        <td>
                                            <div>
                                                {/* {console.log (item._id)} */}
                                                <button className='edit_icon delete_edit_ic' onClick={() => handleEdit(item._id)}><FaRegEdit /></button>
                                                <button className='delete_icon  delete_edit_ic' onClick={() => {  setDeleteItemId(item._id); setDeleteAdminModel(true); }}><RiDeleteBinLine /></button>
                                            </div>
                                        </td>
                                    </tr>
                                    {(
                                        <Model
                                            edit_model={editModel}
                                            add_model={addModel}
                                            delete_model={deleteadminModel}
                                            close_model={() => {
                                                setEditModel(false);
                                                setAddModel(false);
                                                setDeleteAdminModel(false);
                                                setDeleteItemId(null);
                                            }}
                                            update={updateData}
                                            item={item}
                                            data={data}
                                            setData={setData}
                                            onDelete={() => deleteAdmin(item._id)}
                                            _id={_id}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='add' onClick={() => setAddModel(true)}> <IoMdAdd /></button>
            </div>
        </>
    );
}

export default Admin;
