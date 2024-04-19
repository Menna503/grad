import React from 'react'
import { FaFile } from "react-icons/fa6";
function CandidateData() {
  return (
    <>
      <div className='img_name'>
      <div><img src="/candidate_request.svg" /></div>
      <p className='name_candidate '>mohmed ali ahmed mohmed</p>
      </div>
      <div className='continer_table candidateData_table'>
      <table >
        <thead>
          <th className='header_candidateData_table'>Question</th>
          <th className='header_candidateData_table'>Candidate answer </th>
          <th className='header_candidateData_table'> upload file</th>
        </thead>
        <tbody>
        <tr >
        <td > are your parents egyption?</td>
         <td> yes</td>
         <td> <div className='file'><FaFile/> family regestiration</div></td>
       </tr>
       <tr >
        <td > did you get high eduction ?</td>
         <td> yes</td>
         <td>  <div className='file'><FaFile/>collage degree</div></td>
       </tr>
       <tr >
        <td > do you have physical or mental illness?</td>
         <td> yes</td>
         <td> <div className='file'><FaFile/> medical report</div></td>
       </tr>
       <tr >
        <td > do you have any forign wife?</td>
         <td> yes</td>
         <td> <div className='file'> <FaFile/> family regestiration</div></td>
       </tr>
       <tr >
        <td > Do you have a previous criminal conviction ?</td>
         <td> yes</td>
         <td> <div className='file'><FaFile/> criminal record</div></td>
       </tr>
       <tr >
        <td > Did you finish your military service ?</td>
         <td> yes</td>
         <td> <div className='file'><FaFile/> Military Certificate</div></td>
       </tr>
       
       
       </tbody>
        
    
     
     
      </table>
     
     
    </div>
    <div className='container_button'>
      <button className='submit_button candidateData_button ' > Accept</button>
      <button className='submit_button candidateData_button Reject_button ' > Reject</button>
      </div>
    </>
  )
}

export default CandidateData
