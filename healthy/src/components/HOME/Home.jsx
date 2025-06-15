import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./Home.css";
import Lab from "../DHIlab/DHIlab.jsx";

const Home = (props) => {
  // Manage checkbox state internally
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); // Add navigation hook
  
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    console.log('Checkbox changed:', checked);
    
    // If parent component needs to know about the change
    if (props.onCheckboxChange) {
      props.onCheckboxChange(checked);
    }
  };

  const handleNextClick = () => {
    if (isChecked) {
      console.log('Next button clicked - navigating...');
      
      // Navigate to the next page - change '/next-page' to your actual route
      navigate('/Patient1'); // or whatever your next page route is
      
      if (props.onNext) {
        props.onNext();
      }
    }
  };

  return (
    <React.Fragment>
      <div className="mega"><Lab/></div>
      <div id="Home" className="tablet:grid-col padding-x-2">
        <p><b>Before using this symptom checker, please read carefully and accept our Terms and Services:</b></p>
        <ul>
          <li>This checkup is not a diagnosis.</li>
          <li>This checkup is for informational purposes and is not a qualified medical opinion.</li>
          <li>Information that you provide is anonymous and not shared with anyone. We also do not store any information on our server.</li>
        </ul>
        
        <form className="usa-form TermsCheckbox">
          <div className="usa-checkbox">
            <input 
              checked={isChecked} 
              onChange={handleCheckboxChange}
              className="usa-checkbox__input" 
              id="truth" 
              type="checkbox" 
              name="historical-figures-1" 
              value="truth" 
            />
            <label className="usa-checkbox__label" htmlFor="truth">
              I agree to the SymoSycn terms and conditions
            </label>
          </div>
        </form>
        
      
        {/* Navigation buttons */}
        <div className="nav-buttons">
          <button className="btn-back" disabled={true}>
             Back
          </button>
          <button 
            className="btn-next" 
            disabled={!isChecked}
            onClick={handleNextClick}

          >
            Next 
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;