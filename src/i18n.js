import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./local/en.json";
import translationAR from "./local/ar.json";
import LanuageDector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(LanuageDector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false
    },
    react:{
        useSuspense:false
    }
  });

export default i18n;
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import translationEN from "./local/en.json";
// import translationAR from "./local/ar.json";
// import LanguageDetector from "i18next-browser-languagedetector";

// const resources = {
//   en: {
//     translation: translationEN
//   },
//   ar: {
//     translation: translationAR
//   }
// };

// // إزالة اللغة المخزنة في localStorage (اختياري)
// localStorage.removeItem('i18nextLng');
// console.log('Removed i18nextLng from localStorage');

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: "en", // لغة الاحتياط في حال لم يتم التعرف على لغة الجهاز
//     interpolation: {
//       escapeValue: false
//     },
//     react: {
//       useSuspense: false
//     },
//     detection: {
//       order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
//       // caches: ['cookie', 'localStorage'], // تخزين اللغة المكتشفة في الكوكيز و localStorage
//       lookupQuerystring: 'lng', // لاكتشاف اللغة من عنوان URL (مثال: ?lng=ar)
//       lookupCookie: 'i18next', // اسم الكوكي المستخدم لتخزين اللغة
//       lookupLocalStorage: 'i18nextLng', // اسم العنصر المستخدم في localStorage لتخزين اللغة
//       cookieMinutes: 10, // مدة صلاحية الكوكي (بالدقائق)
//       htmlTag: document.documentElement, // عنصر HTML لتعيين صفة اللغة
//       checkWhitelist: true // تحقق من القائمة البيضاء للغات المدعومة
//     },
//     whitelist: ['en', 'ar'], // قائمة اللغات المدعومة
//     load: 'languageOnly' // تحميل اللغة فقط بدون الإقليم (مثل: "ar" وليس "ar-SA")
//   });

// i18n.on('initialized', (options) => {
//   console.log('i18n initialized with options:', options);
//   console.log('Navigator language:', navigator.language || navigator.userLanguage);
// });

// i18n.on('languageChanged', (lng) => {
//   console.log('Detected language:', lng);
//   // تحديث اللغة في الـ HTML
//   document.documentElement.lang = lng;
//   // إعادة تعيين الكوكيز والـ localStorage
//   document.cookie = "i18next=" + lng + ";path=/";
//   localStorage.setItem('i18nextLng', lng);
// });

// i18n.on('failedLoading', (lng, ns, msg) => {
//   console.error('Failed loading:', lng, ns, msg);
// });

// export default i18n;
