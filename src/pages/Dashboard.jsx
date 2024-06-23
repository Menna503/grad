
import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdPerson } from 'react-icons/io';
import { FaVoteYea } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
const Dashboard = () => {
    const { t, i18n } = useTranslation();
    const token = localStorage.getItem('token') || '';
    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        connectToWS();
    }, [token])

    function connectToWS() {
        let sockerUrl = process.env.REACT_APP_API_URL
        sockerUrl = sockerUrl.replace('https', 'wss')
        sockerUrl = sockerUrl.replace('http', 'wss')
        const ws = new WebSocket(sockerUrl + '?token=' + token);
        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            const sortedResults = data.results.sort((a, b) => b.count - a.count);
            setResults(sortedResults);
            setTotalVotes(sortedResults.reduce((totalVotes, result) => totalVotes + result.count, 0));
            setTotalCount(data.totalCount);
        };

        ws.onclose = (e) => {
            if (e.reason)
                console.log('close: ', e.reason);
            else
                console.log('apsoudf');
        }
    }
    const getImage = (path) => {
        return process.env.REACT_APP_API_URL + '/api/uploads/' + path
    }

    return (
           
        <div className='manageevents_maincontainer dash' >
             <div className='manageevents_component dashboard'>
          <div  className= {i18n.language=='ar'?'event for_dashboard padding':'event for_dashboard'}>

              <p className='PofmanageEvents card_title'>{t('Candidates')}</p>
              <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates margin_left' : 'number_of_candidates'}>
                <IoMdPerson  className='icon_of_can'/>
                <p className='PofmanageEvents card_title'>{results.length}</p>
            </div>

          </div>
          <div  className= {i18n.language=='ar'?'event for_dashboard padding margin_left':'event for_dashboard'}>
          <p className='PofmanageEvents card_title'>{t('Votes')}</p>
          <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                <FaVoteYea className='icon_of_can'/>
                <p className='PofmanageEvents card_title'>{results.reduce((totalVotes, result) => totalVotes + result.count, 0)}</p>
            </div>

             </div>
         
             <div  className= {i18n.language=='ar'?'event for_dashboard padding margin_left':'event for_dashboard'}>
            
            <p className='PofmanageEvents card_title'>{t('total users')}</p>
            <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                <BsFillPeopleFill  className='icon_of_can'/>
                  <p className='PofmanageEvents card_title'>{totalCount}</p>
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
                                  <div ><img className="img_dashboard" src={getImage(result.candidate.image)} alt='Candidate' /> </div> </td>
                                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.candidate.name}</td>
                                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.candidate.nationalId}</td>
                                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.count}</td>
                                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{index + 1}</td>
                                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{totalVotes > 0 ? ((result.count / totalVotes) * 100).toFixed(2) : 0}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

