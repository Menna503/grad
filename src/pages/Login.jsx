import React from 'react';
import Loginposter from '../images/forlogin.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { saveToken } from '../utils/authentication';
import { UserContext } from '../UserContext';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user, setUser } = useContext(UserContext);

    const [data, setData] = useState({
        nationalId: "",
        password: ""
    });
    const [failedMessage, setFailedMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('controller', data)
            .then(response => {
                if (response.data.status === "success") {
                    const role = response.data.data.controller.role;
                    const token = response.data.data.token;
                    const user = response.data.data.controller;

                    saveToken(token);
                    setUser(user);

                    if (user.role === "MANAGER" || "ADMIN") {
                        navigate('/');
                    } else {
                        console.error('Login failed: Only MANAGERS and ADMINS are allowed to log in.');
                    }
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error.message);
                setFailedMessage(t("Login failed ! Try again !"));
                setData({
                    nationalId: "",
                    password: ""
                });
                setTimeout(() => {
                    setFailedMessage("");
                }, 5000);
            });
    }

    function handle(e) {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }


    return (
        <div className='Login_bigcontainer'>
            <div className='Login_componentcontainer'>

                <div className='box_of_login'>
                    <div className='page_img_Login' > <img src={Loginposter} alt="" /> </div>
                </div>

                <div>

                    <form onSubmit={handleSubmit}>
                        <div className='loginlec'>

                            <p className='p_of_welcome'>{t('welcome!')}</p>
                            <p className={i18n.language === 'ar' ? 'pp_of_welcome text_font_size' : 'pp_of_welcome'}>{t('log in your account to access the dashboard')}</p>
                            <div className='bigboxofLogin'>
                                <input id="nationalId" onChange={handle} placeholder={t('Enter ID')} type='text' value={data.nationalId} className={i18n.language === 'ar' ? 'box_of_login_page rtl row_reverse' : 'box_of_login_page'} />
                            </div>

                            <div className='bigboxofLogin'>
                                <input id="password" onChange={handle} placeholder={t('Password')} type='password' value={data.password} className={i18n.language === 'ar' ? 'box_of_login_page rtl row_reverse' : 'box_of_login_page'} />
                            </div>
                        </div>

                        <button type="submit" className="login_button">{t("Log in")}</button>
                    </form>

                </div>
                {failedMessage && (
                    <p className={i18n.language === 'ar' ? 'failed_message failed_align' : 'failed_message'}>{failedMessage} </p>)}


            </div>

        </div>
    )
}

export default Login;