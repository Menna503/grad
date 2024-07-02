import React, { useState, useContext, useEffect } from 'react';
import Page_profile from '../images/page_profile.svg';
import Admin_page_profile from '../images/Admin_page_profile.svg';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import { UserContext } from '../UserContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getToken ,englishToArabicNumber} from '../utils/authentication';

function Profile() {
    const { user } = useContext(UserContext);
    const profile = user.role === "ADMIN" ? Admin_page_profile : Page_profile;
    const { t, i18n } = useTranslation();
    const controllerId = user.id;
   
    const [data, setData] = useState({
        password: "",
        newPassword: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    function Submit(e) {
        e.preventDefault();
        const token =  getToken();

        if (data.password === "" || data.newPassword === "") {
            setErrorMessage(t("Both fields are required"));
            return;
        }

        if (data.newPassword.length < 8) {
            setErrorMessage(t("Password should be at least 8 characters"));
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        if (token) {
            axios.patch(`https://graduation-project-yok6.onrender.com/api/controller/${controllerId}`, data, config)
                .then(res => {
                    console.log(res.data);
                    setSuccessMessage(t("Password updated successfully"));
                    setErrorMessage("");
                    setData({
                        password: "",
                        newPassword: ""
                    });
                })
                .catch(error => {
                    console.error('Error editing password:', error);
                    setErrorMessage(t("Incorrect old password"));
                });
        }
    }

    function handle(e) {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
        setErrorMessage("");
    }
    const convertToArabic = (number) => {
        return i18n.language === 'ar' ? englishToArabicNumber(number.toString()) : number;
    };

    const image_user = (user.role === "ADMIN" && i18n.language === 'en') ? 'Admin_profile_arabic.svg' :
        (i18n.language === 'ar' && (user.role === "ADMIN" || user.role === "MANAGER")) ? 'manager.svg' :
            'manager_english.svg';

    return (
        <div className={i18n.language === 'ar' ? 'profile_container arabic_candidates ' : 'profile_container'}>
            <div className={i18n.language === 'ar' ? ' page_img_profile arabic_image  ' : 'page_img_profile'}>
                {i18n.language === 'ar' ? (<img className='manager_image' src={image_user} alt="" />) : (<img className='manager_image' src={image_user} alt="" />)}
            </div>
            <div className='prof_component'>
                <div className='bigboxofprofile'>
                    <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic  ' : 'p1_of_profile'}>{t('name')}</p>
                    <div className={i18n.language === 'ar' ? 'box_of_profile profile_reverse' : 'box_of_profile'}>
                        <IoIcons.IoMdPerson className='prof_icon' />
                        <p className='p2_of_profile'>{user.name}</p>
                    </div>
                </div>

                <div className='bigboxofprofile'>
                    <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic' : 'p1_of_profile'}>{t('national ID')}</p>
                    <div className={i18n.language === 'ar' ? 'box_of_profile profile_reverse' : 'box_of_profile'}>
                        <FaIcons.FaIdCard className='prof_icon' />
                        <p className='p2_of_profile'> {convertToArabic(user.nationalId)}</p>
                    </div>
                </div>
                <form onSubmit={Submit}>
                    <div className='profilec'>
                        <p className={i18n.language === 'ar' ? 'p3_of_profile arabic_of_profile' : 'p3_of_profile'}>{t('change your password')}</p>
                        <div className='bigboxofprofile'>
                            <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic' : 'p1_of_profile'}>{t('old password')}</p>
                            <input id="password" onChange={handle} value={data.password} type='password' className={i18n.language === 'ar' ? 'box_of_profile rtl row_reverse' : 'box_of_profile'}></input>
                        </div>

                        <div className='bigboxofprofile'>
                            <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic ' : 'p1_of_profile'}>{t('new password')}</p>
                            <input id="newPassword" onChange={handle} value={data.newPassword} type='password' className={i18n.language === 'ar' ? 'box_of_profile rtl row_reverse' : 'box_of_profile'}></input>
                        </div>

                        <button className={i18n.language === 'ar' ? 'submit_button button_font_size margin_top ' : 'submit_button margin_top'} type="submit">{t('update')}</button>
                    </div>
                </form>
                {successMessage && (
                    <div className='success_message'>{successMessage}</div>
                )}
                {errorMessage && (
                    <div className='success_message' style={{ color: 'red' }}>{errorMessage}</div>
                )}
            </div>
        </div>
    );
}

export default Profile;
