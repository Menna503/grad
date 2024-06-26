import React from 'react';
import { useLocation } from 'react-router-dom';
import * as GoIcons from 'react-icons/go';
import * as RiIcons from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1);
  const { t, i18n } = useTranslation();

  const pageNames = {
    "": {
      en: 'Dashboard',
      ar: 'الرئيسية',
    },
    Admin: {
      en: 'Admin',
      ar: 'المسؤولون',
    },
    Candidates: {
      en: 'Candidates',
      ar: 'المرشحون',
    },
    Questions: {
      en: 'Questions',
      ar: 'الأسئلة',
    },
    Events: {
      en: 'Events',
      ar: 'الأحداث',
    },
    News: {
      en: 'News',
      ar: 'الأخبار',
    },
    Profile: {
      en: 'Profile',
      ar: 'الصفحة الشخصية',
    },
    Requests: {
      en: 'Requests',
      ar: 'طلبات الترشح',
    },
    Reset: {
      en: 'Reset',
      ar: 'تعيين كلمة مرور المستخدم',
    },
    CandidateData: {
      en: 'Candidate Data',
      ar: 'بيانات المرشح',
    },
  };

  let currentPageName;
  if (currentPage.startsWith('CandidateData/')) {
    currentPageName = pageNames['CandidateData'][i18n.language];
  } else {
    currentPageName = pageNames[currentPage] ? pageNames[currentPage][i18n.language] : currentPage;
  }

  return (
    <div className={i18n.language === 'ar' ? 'rotate_y header' : 'header'}>
      <h1 className={i18n.language === 'ar' ? 'title rotate_y' : 'title'}>{currentPageName}</h1>
      <div className="iconsH">
        {i18n.language === 'en' ? (
          <button className='header_icon' onClick={() => i18n.changeLanguage('ar')}>
            <RiIcons.RiGlobalLine />  <p className='lang'>English</p>
          </button>
        ) : (
          <button className='header_icon' onClick={() => i18n.changeLanguage('en')}>
            <RiIcons.RiGlobalLine />  <p className={i18n.language === 'ar' ? 'lang rotate_y' : 'lang'}>اللغة العربية</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
