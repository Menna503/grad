import React, { useEffect, useState } from 'react';
import { FaFile } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// function CandidateData() {
//   const { _id:candidateId } = useParams();
//   const [candidateData, setCandidateData] = useState(null);
//   const token = localStorage.getItem('token') || '';

//   useEffect(() => {
//     fetchCandidateData();
//   }, [candidateId]);
//   const fetchCandidateData = () => {
//     if (!token) {
//       console.error('Token is not available.');
//       return;
//     }
  
//     axios.get(`https://graduation-project-273e.onrender.com/api/candidate/${candidateId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(res => {
//       const candidate = res.data.data && res.data.data.candidate; // Adjusted data access
//       if (candidate) {
//         setCandidateData(candidate);
//       } else {
//         console.error('Candidate data not found in API response:', res.data);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching candidate data:', error);
//     });
//   };
  
//   return (
//     <>
//       <div className='img_name'>
//         <div><img src="/candidate_request.svg" /></div>
//         {candidateData.name && <p className='name_candidate '>{candidateData.name}</p>}
//       </div>
//       <div className='continer_table candidateData_table'>
//         <table >
//           <thead>
//             <th className='header_candidateData_table'>Question</th>
//             <th className='header_candidateData_table'>Candidate answer </th>
//             <th className='header_candidateData_table'> upload file</th>
//           </thead>
//           <tbody>
//             <tr >
//               <td > are your parents egyption?</td>
//               <td> yes</td>
//               <td> <div className='file'><FaFile/> family regestiration</div></td>
//             </tr>
//             <tr >
//               <td > did you get high eduction ?</td>
//               <td> yes</td>
//               <td>  <div className='file'><FaFile/>collage degree</div></td>
//             </tr>
//             <tr >
//               <td > do you have physical or mental illness?</td>
//               <td> yes</td>
//               <td> <div className='file'><FaFile/> medical report</div></td>
//             </tr>
//             <tr >
//               <td > do you have any forign wife?</td>
//               <td> yes</td>
//               <td> <div className='file'> <FaFile/> family regestiration</div></td>
//             </tr>
//             <tr >
//               <td > Do you have a previous criminal conviction ?</td>
//               <td> yes</td>
//               <td> <div className='file'><FaFile/> criminal record</div></td>
//             </tr>
//             <tr >
//               <td > Did you finish your military service ?</td>
//               <td> yes</td>
//               <td> <div className='file'><FaFile/> Military Certificate</div></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className='container_button'>
//         <button className='submit_button candidateData_button ' > Accept</button>
//         <button className='submit_button candidateData_button Reject_button ' > Reject</button>
//       </div>
//     </>
//   )
// }

// export default CandidateData;

function CandidateData() {
  const { id: candidateId } = useParams();
  const [candidateData, setCandidateData] = useState(null);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetchCandidateData();
  }, [candidateId]);

  const fetchCandidateData = () => {
    if (!token) {
      console.error('Token is not available.');
      return;
    }

    axios.get(`https://graduation-project-273e.onrender.com/api/candidate/${candidateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      const candidate = res.data.data && res.data.data.candidate;
      if (candidate) {
        setCandidateData(candidate);
      } else {
        console.error('Candidate data not found in API response:', res.data);
      }
    })
    .catch(error => {
      console.error('Error fetching candidate data:', error);
    });
  };

  if (!candidateData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='img_name'>
        <div><img src="/candidate_request.svg" /></div>
        {candidateData.name && <p className='name_candidate '>{candidateData.name}</p>}
      </div>
      <div className='continer_table candidateData_table'>
        <table>
          <thead>
            <tr>
              <th className='header_candidateData_table'>Question</th>
              <th className='header_candidateData_table'>Candidate answer</th>
              <th className='header_candidateData_table'>Upload file</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Are your parents Egyptian?</td>
              <td>Yes</td>
              <td><div className='file'><FaFile/> Family registration</div></td>
            </tr>
            <tr>
              <td>Did you get higher education?</td>
              <td>Yes</td>
              <td><div className='file'><FaFile/> College degree</div></td>
            </tr>
            <tr>
              <td>Do you have physical or mental illness?</td>
              <td>Yes</td>
              <td><div className='file'><FaFile/> Medical report</div></td>
            </tr>
            <tr>
              <td>Do you have any foreign wife?</td>
              <td>Yes</td>
              <td><div className='file'><FaFile/> Family registration</div></td>
            </tr>
            <tr>
              <td>Do you have a previous criminal conviction?</td>
              <td>Yes</td>
              <td><div className='file'><FaFile/> Criminal record</div></td>
            </tr>
            <tr>
              <td>Did you finish your military service?</td>
              <td>Yes</td>
              <td><div className='file'><FaFile/> Military Certificate</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='container_button'>
        <button className='submit_button candidateData_button'>Accept</button>
        <button className='submit_button candidateData_button Reject_button'>Reject</button>
      </div>
    </>
  );
}


export default CandidateData;
