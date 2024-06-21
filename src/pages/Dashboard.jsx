
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdPerson } from 'react-icons/io';
import { FaVoteYea } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import axios from 'axios'

const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const token = localStorage.getItem('token') || '';
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        // case not start of election => no results 
        // case in election time 
        connectToWS();
        // case end of election => ask api for results.
    }, [token])

    function connectToWS() {
        let sockerUrl = process.env.REACT_APP_API_URL
        sockerUrl = sockerUrl.replace('https', 'wss')
        sockerUrl = sockerUrl.replace('http', 'wss')

        const ws = new WebSocket(sockerUrl + '?token=' + token);

        ws.onmessage = function (e) {
            const data = JSON.parse(e.data)
            setResults(data.results);
            setTotalCount(data.totalCount)
        }

        ws.onclose = (e) => {
            if (e.reason)
                console.log('close: ', e.reason);
            else
                console.log('apsoudf');
        }
    }

    return (
        <div className='manageevents_maincontainer dash'>
            <div className='manageevents_component dashboard'>
                <div className='event for_dashboard'>
                    <p className='PofmanageEvents card_title'>{t('Candidates')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                        <IoMdPerson className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>{results.length}</p>
                    </div>
                </div>
                <div className='event for_dashboard'>
                    <p className='PofmanageEvents card_title'>{t('Votes')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                        <FaVoteYea className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>
                            {results.reduce((totalVotes, result) => totalVotes + result.count, 0)}
                        </p>
                    </div>
                </div>

                <div className='event for_dashboard'>
                    <p className='PofmanageEvents card_title'>{t('Total users')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                        <BsFillPeopleFill className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>{totalCount}</p>
                    </div>
                </div>
            </div>
            <p className={i18n.language === 'ar' ? 'p_dashboard p_dashboard_ar' : 'p_dashboard'}>{t('Candidate Results')}</p>
            <div className='continer_table continer_table_dashboard'>
                <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
                    <thead>
                        <tr>
                            <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Candidate')}</th>
                            <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Name')}</th>
                            <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Votes')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.candidate._id}>
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.name}</td>
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
