import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdPerson } from 'react-icons/io';
import { FaVoteYea } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import axios from 'axios';
import '../Styles/App.css';
import { getToken, englishToArabicNumber } from '../utils/authentication';

const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const token = getToken() || '';
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [electionEvent, setElectionEvent] = useState(null);
    const [isElectionActive, setIsElectionActive] = useState(false);
    const [electionMessage, setElectionMessage] = useState('');
    const [loading, setLoading] = useState(true);

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
                        fetchFinalResults();
                    } else if (now < start) {
                        setElectionMessage(t('Election dose not started yet'));
                    }
                } else {
                    setElectionMessage(t('Election dose not started yet'));
                    console.log('No election event found');
                }
            } catch (error) {
                console.error('Error fetching election event:', error);
                // setElectionMessage('Error fetching election event.');
            } finally {
                setLoading(false);
            }
        };
        fetchElectionEvent();
    }, [token]);

    const fetchFinalResults = async () => {
        try {
            const response = await axios.get('election', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.data.results;
            setResults(data.results);
            setTotalCount(data.totalCount);
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

    const convertToArabic = (number) => {
        return i18n.language === 'ar' ? englishToArabicNumber(number.toString()) : number;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (electionMessage) {
        return (
        <div className='continer_massage'>
            <div className='continer_massage' >
                < img src='date.svg' className='date_svg' alt=''/>
                <p className='p_date'>{electionMessage}</p>
            </div>
        </div> 
        );
    }

    return (
        <div className='manageevents_maincontainer dash'>
            <div className='manageevents_component dashboard'>
                <div className={i18n.language === 'ar' ? 'event for_dashboard padding' : 'event for_dashboard'}>
                    <p className='PofmanageEvents card_title'>{t('Candidates')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates margin_left' : 'number_of_candidates'}>
                        <IoMdPerson className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>{convertToArabic(results.length)}</p>
                    </div>
                </div>
                <div className={i18n.language === 'ar' ? 'event for_dashboard padding' : 'event for_dashboard'}>
                    <p className='PofmanageEvents card_title'>{t('Votes')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates margin_left' : 'number_of_candidates'}>
                        <FaVoteYea className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>{convertToArabic(totalCount)}</p>
                    </div>
                </div>
                <div className={i18n.language === 'ar' ? 'event for_dashboard padding' : 'event for_dashboard'}>
                    <p className='PofmanageEvents card_title'>{t('total users')}</p>
                    <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates margin_left' : 'number_of_candidates'}>
                        <BsFillPeopleFill className='icon_of_can' />
                        <p className='PofmanageEvents card_title'>{convertToArabic(totalUsers)}</p>
                    </div>
                </div>
            </div>
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
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{convertToArabic(result.candidate.nationalId)}</td>
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{convertToArabic(result.count)}</td>
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{convertToArabic(index + 1)}</td>
                                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{convertToArabic(totalCount > 0 ? ((result.count / totalCount) * 100).toFixed(2) : 0)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
