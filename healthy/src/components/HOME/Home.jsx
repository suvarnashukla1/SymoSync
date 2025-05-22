import React, { Component } from "react";
import "./Home.css";

const Home = (props) => {
  //   console.log("is checked", props, props.isChecked, props.checked);
  return (
    <React.Fragment>
      <div id="Home" className="tablet:grid-col padding-x-2">
        <p><b>Before using this symptom checker, please read carefully and accept our Terms and Services:</b></p>
        <ul>
          <ul>This checkup is not a diagnosis.</ul>
          <ul>This checkup is for informational purposes and is not a qualified medical opinion.</ul>
          <ul>Information that you provide is anonymous and not shared with anyone. We also do not store any information on our server.</ul>
        </ul>
        <form class="usa-form TermsCheckbox">
          <div class="usa-checkbox">
            <input checked={props.isChecked} onChange={props.checked} class="usa-checkbox__input" id="truth" type="checkbox" name="historical-figures-1" value="truth" />
            <label class="usa-checkbox__label" for="truth">
              I agree to the SymoSycn terms and conditions
            </label>
          </div>
        </form>
      </div>

    </React.Fragment>
  );
};

export default Home;