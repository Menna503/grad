import Styles from'./model.css';
import'./model.css';
import {  BsPersonX ,BsPersonGear } from "react-icons/bs";
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import'../Styles/profilecss.css';
import { useNavigate } from 'react-router-dom';
import { CgPassword } from 'react-icons/cg';

const BackDrop = () => {
  return <div className="backDrop"></div>;
};





const Candidate_file = ({ close }) => {
  return (
    <div className="overlay">
      <button className='close_pop' onClick={close}><IoIosClose/></button>   
      <div className='img_candidate_file'><img className="img_file"/></div> 
    </div>
  );
};




function Pop_candidate_data({ candidate_files,close_model}) {
  return (
    (candidate_files)&& (
    <>
      {createPortal(
        <>
          <BackDrop />

          {candidate_files && <Candidate_file close={close_model}  />}

        </>,
        document.getElementById('model')
      )}
    </>
  ))
}

export default Pop_candidate_data;
