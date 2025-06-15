import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./Patient.css";
import Lab from "../DHIlab/DHIlab.jsx";
const Patient = ({ age, ageChange, male, female, gender }) => {
 const navigate = useNavigate();

 const handleBackClick = () => {
   navigate('/Home'); 
 };

 const handleNextClick = () => {
   navigate('/Patient2'); 
 };

 return (
   <React.Fragment>
        <div className="mega"><Lab/></div>
     <div className="patient-container">
       <div className="patient-section">
         <form className="usa-form">
           <label className="usa-label" htmlFor="range-slider">
             What is your age?
             <h2>{age}</h2>
           </label>
           <input id="range-slider" className="usa-range outline-0" type="range" min="0" max="100" value={age} onChange={ageChange} />
         </form>
       </div>
       
       <div className="patient-section">
         <p>What is your sex?</p>
         <form className="usa-form">
           <div className="usa-radio">
             <input className="usa-radio__input outline-0" id="stanton" type="radio" checked={male} onChange={gender} name="historical-figures-2" value="male" />
             <label className="usa-radio__label" htmlFor="stanton">
               Male
             </label>
           </div>
           <div className="usa-radio">
             <input className="usa-radio__input outline-0" id="anthony" type="radio" checked={female} onChange={gender} name="historical-figures-2" value="female" />
             <label className="usa-radio__label" htmlFor="anthony">
               Female
             </label>
           </div>
         </form>
       </div>

       <div className="nav-buttons">
         <button className="btn-back" onClick={handleBackClick}>
           Back
         </button>
         <button className="btn-next" onClick={handleNextClick}>
           Next 
         </button>
       </div>
     </div>
   </React.Fragment>
 );
};

export default Patient;