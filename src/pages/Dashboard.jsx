import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdPerson } from 'react-icons/io';
import { FaVoteYea } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import axios from 'axios';

const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const token = localStorage.getItem('token') || '';
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [electionEvent, setElectionEvent] = useState(null);
    const [isElectionActive, setIsElectionActive] = useState(false);
    const [electionMessage, setElectionMessage] = useState('');

    useEffect(() => {
        const fetchElectionEvent = async () => {
            try {
                const response = await axios.get('event', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const events = response.data.data.events;
                const election = events.find(event => event.type === 'elections');
                setElectionEvent(election);
                const now = new Date();
                if (election) {
                    const start = new Date(election.start);
                    const end = new Date(election.end);
                    if (now >= start && now <= end) {
                        setIsElectionActive(true);
                        connectToWS();
                    } else if (now > end) {
                        setElectionMessage('Election has ended.');
                        fetchFinalResults();
                    } else if (now < start) {
                        setElectionMessage('Election has not started yet.');
                    }
                } else {
                    setElectionMessage('No election event found.');
                }
            } catch (error) {
                console.error('Error fetching election event:', error);
                setElectionMessage('Error fetching election event.');
            }
        };
        fetchElectionEvent();
    }, [token]);

    const fetchFinalResults = async () => {
        try {
            const response = await axios.get('https://graduation-project-yok6.onrender.com/api/election', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.results;
            setTotalUsers(data.totalUsers);
        } catch (error) {
            console.error('Error fetching final results:', error);
        }
    };

    function connectToWS() {
        let sockerUrl = process.env.REACT_APP_API_URL;
        sockerUrl = sockerUrl.replace('https', 'wss');
        sockerUrl = sockerUrl.replace('http', 'wss');

        const ws = new WebSocket(sockerUrl + '?token=' + token);

        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            setResults(data.results);
            setTotalCount(data.totalCount);
            setTotalUsers(data.totalUsers);
        };

        ws.onclose = (e) => {
            if (e.reason)
                console.log('close: ', e.reason);
            else
                console.log('Connection closed');
        };
    }

    const getImage = (path) => {
        return `${process.env.REACT_APP_API_URL}/api/uploads/${path}`;
    };

    if (electionMessage) {
        return <p>{electionMessage}</p>;
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
                        <p className='PofmanageEvents card_title'>{totalCount}</p>
                    </div>
                </div>

                <div className='event for_dashboard'>
                    <p className='PofmanageEvents card_title'>{t('Total users')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                        <BsFillPeopleFill className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>{totalUsers}</p>
                    </div>
                </div>
            </div>
            {/* <p className={i18n.language === 'ar' ? 'p_dashboard p_dashboard_ar' : 'p_dashboard'}>{t('Candidate Results')}</p> */}
            <div className='continer_table continer_table_dashboard'>
                <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
                    <thead>
                        <tr>
                           <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Candidate')}</th>
                           <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Name')}</th>
                           <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('ID Number')}</th>
                           <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Votes')}</th>
                           <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Standing')}</th>
                           <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Percentage Result')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {results.map((result, index) => (
                            <tr key={result.candidate._id}>
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
                                     <div><img className="img_dashboard" src={getImage(result.candidate.image)} alt='Candidate' /></div>
                                 </td>
                                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.candidate.name}</td>
                                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.candidate.nationalId}</td>
                                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.count}</td>
                                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{index + 1}</td>
                                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{totalCount > 0 ? ((result.count / totalCount) * 100).toFixed(2) : 0}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
