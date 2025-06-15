import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Symptoms as SymptomList } from "../../data/symptoms";
import { Diseases } from "../../data/disease";
import "./Symptom.css";
import Lab from "../DHIlab/DHIlab.jsx";

const Symptom = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    gender: props.gender,
    age: props.age,
    user_symptoms: props.userSymptoms || [],
    disease_with_possibility: props.diseasePossibility || [],
    dropdown_style: "dropdown-menu-on",
    searched: "",
  });

  const disease_symptoms = Diseases;

  const addSymptomButtonEvent = (e) => {
    e.preventDefault();
    const symptomValue = e.target.value;

    if (!symptomValue) return;

    if (!state.user_symptoms.includes(symptomValue)) {
      const updatedSymptoms = [...state.user_symptoms, symptomValue];
      setState((prevState) => ({
        ...prevState,
        user_symptoms: updatedSymptoms,
      }));
    }
  };

  const deleteSymptomButtonEvent = (e) => {
    e.preventDefault();
    const symptomValue = e.target.value;

    if (state.user_symptoms.includes(symptomValue)) {
      const updatedSymptoms = state.user_symptoms.filter((s) => s !== symptomValue);
      setState((prevState) => ({
        ...prevState,
        user_symptoms: updatedSymptoms,
      }));
    }
  };

  const get_possible_disease = () => {
    const possible_disease_function = (arr1, arr2) => {
      return arr1.filter((symptom) => arr2.includes(symptom));
    };

    const all_objects = Object.keys(disease_symptoms).map((key) => {
      const diseaseSymptoms = [...disease_symptoms[key]];
      const userSymptoms = [...state.user_symptoms];
      const matchingSymptoms = possible_disease_function(diseaseSymptoms, userSymptoms);
      const possibility = diseaseSymptoms.length > 0
        ? ((matchingSymptoms.length / diseaseSymptoms.length) * 100).toFixed(2)
        : "0.00";

      return {
        name: key,
        possibility: possibility,
        disease_symptom: diseaseSymptoms,
        symptom_user_has: matchingSymptoms,
      };
    });

    setState((prevState) => ({
      ...prevState,
      disease_with_possibility: all_objects,
    }));

    if (props.getPossibleDisease) {
      props.getPossibleDisease(all_objects, state.user_symptoms);
    }
  };

  useEffect(() => {
    get_possible_disease();
  }, [state.user_symptoms]);

  const getInputSymptoms = (e) => {
    setState((prevState) => ({
      ...prevState,
      searched: e.target.value,
    }));
  };

  const on_click_reset_button = () => {
    setState((prevState) => ({
      ...prevState,
      user_symptoms: [],
      disease_with_possibility: [],
      searched: "",
    }));
  };

  const keyDownEvent = (e) => {
    const searchValue = e.target.value.trim();
    if (!searchValue) return;

    const re = new RegExp(searchValue.split("").join("\\w*").replace(/\W/, ""), "i");
    const symps = SymptomList.filter((each) => each.match(re));

    if (e.key === "Enter" && symps.length > 0) {
      e.preventDefault();

      const exactMatch = symps.find(
        (symptom) => symptom.toLowerCase() === searchValue.toLowerCase()
      );

      const symptomToAdd = exactMatch || symps[0];

      if (!state.user_symptoms.includes(symptomToAdd)) {
        setState((prevState) => ({
          ...prevState,
          user_symptoms: [...prevState.user_symptoms, symptomToAdd],
          searched: "",
        }));
        e.target.value = "";
      }
    }
  };

  const handleBackClick = () => {
    navigate("/Patient2");
  };

  const handleNextClick = () => {
    navigate("/Disease", {
      state: {
        symptoms: state.user_symptoms,
        disease_with_possibility: state.disease_with_possibility,
        gender: state.gender,
        age: state.age,
      },
    });
  };

  const checkAllAnswered = () => {
    return state.user_symptoms.length > 0;
  };

  const showContent = () => {
    const symps = SymptomList.filter((each) =>
      each.toLowerCase().includes(state.searched.toLowerCase())
    );

    return (
      <div> <div className="mega"><Lab/></div>
      <div
        style={{
          padding: '10px',
          border: '1px solid black',
          borderRadius: '6px',
          maxWidth: '800px',
          margin: '20px auto',
           backgroundColor:'white',
        }}
        id="#Symptoms"
        className="grid-row width-full"
      >
        <div className="col-12 tablet:grid-col-5">
          <input
            className="usa-input searchSymptomsInput"
            onKeyDown={keyDownEvent}
            onChange={getInputSymptoms}
            placeholder="Search Symptoms"
            id="input-type-text"
            name="input-type-text"
            type="text"
            value={state.searched}
          />
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '8px' }}>
            <ul
              className="symtomsListBox"
              style={{
                paddingLeft: '0',
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {symps
                .filter((item) => !state.user_symptoms.includes(item))
                .map((symptom, id) => {
                  return (
                    <li key={id}>
                      <button
                        onClick={addSymptomButtonEvent}
                        value={symptom}
                        type="button"
                        style={{
                          padding: '3px 6px',
                          fontSize: '13px',
                          lineHeight: '1.2',
                        }}
                      >
                        {symptom}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="col-12 tablet:grid-col-7 padding-top-2 UserSymptoms">
          <h3>Selected Symptoms:</h3>
          {state.user_symptoms.length === 0 ? (
            <p>No symptoms selected</p>
          ) : (
            <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
              {state.user_symptoms.map((symptom, id) => (
                <li key={id} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  {symptom}
                  <button
                    onClick={deleteSymptomButtonEvent}
                    value={symptom}
                    type="button"
                    title="Remove symptom"
                    style={{
                      marginLeft: '8px',
                      padding: '0px 4px',
                      fontSize: '12px',
                      lineHeight: '1',
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '3px',
                      border: 'none',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-12 width-full display-flex flex-row flex-justify-start resetButton padding-left-2">
          <button
            onClick={on_click_reset_button}
            className="usa-button usa-button--secondary"
            type="button"
          >
            Reset
          </button>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
           
          }}
        >
          <button onClick={handleBackClick} type="button">
            Back
          </button>
          <button onClick={handleNextClick} disabled={!checkAllAnswered()} type="button">
            Next
          </button>
        </div>
      </div>
      </div>
    );
  };

  return <React.Fragment>{showContent()}</React.Fragment>;
};

export default Symptom;
