import React, { Component } from "react";
import { Symptoms as SymptomList } from "../../data/symptoms";
import { Diseases } from "../../data/disease";
import "./Symptom.css";

class Symptom extends Component {
  state = {
    gender: this.props.gender,
    age: this.props.age,
    user_symptoms: this.props.userSymptoms,
    disease_with_possibility: this.props.diseasePossibility,
    dropdown_style: "dropdown-menu-on",
    searched: "",
  };

  disease_symptoms = Diseases;

  addSymptomButtonEvent = (e) => {
    if (!this.state.user_symptoms.includes(e.target.value)) {
      let user_symptoms = [...this.state.user_symptoms, e.target.value];
      return this.setState({ user_symptoms: user_symptoms }, () => {
        this.get_possible_disease();
      });
    }
  };

  deleteSymptomButtonEvent = (e) => {
    if (this.state.user_symptoms.includes(e.target.value)) {
      let user_symptoms = [...this.state.user_symptoms];
      user_symptoms = user_symptoms.filter((s) => s !== e.target.value);
      this.setState({ user_symptoms: user_symptoms }, () => {
        this.get_possible_disease();
      });
    }
  };

  get_possible_disease = () => {
    let possible_disease_function = (arr1, arr2) => {
      let empty_array = [];
      for (let i = 0; i < arr1.length; i++) {
        for (let n = 0; n < arr2.length; n++) {
          if (arr1[i] === arr2[n]) {
            empty_array = [...empty_array, arr1[i]];
          }
        }
      }
      return empty_array;
    };

    let all_objects = [];
    Object.keys(this.disease_symptoms).map((key) => {
      let array1 = [...this.disease_symptoms[key]];
      let array2 = [...this.state.user_symptoms];
      let empty_array = possible_disease_function(array1, array2);
      let possbility = ((empty_array.length / array1.length) * 100).toFixed(2);
      let object = {
        name: key,
        possibility: possbility,
        disease_symptom: this.disease_symptoms[key],
        symptom_user_has: empty_array,
      };
      return (all_objects = [...all_objects, object]);
    });

    return this.setState({ disease_with_possibility: all_objects }, () => {
      this.props.getPossibleDisease(this.state.disease_with_possibility, this.state.user_symptoms);
    });
  };

  getInputSymptoms = (e) => {
    return this.setState({ searched: e.target.value });
  };

  on_click_reset_button = () => {
    return this.setState(
      {
        user_symptoms: [],
        disease_with_possibility: [],
      },
      () => {
        return this.get_possible_disease();
      }
    );
  };

  keyDownEvent = (e) => {
    const re = new RegExp(e.target.value.split("").join("\\w*").replace(/\W/, ""), "i");

    const symps = SymptomList.filter((each) => {
      return each.match(re);
    });

    if (e.key === "Enter") {
      return symps.map((key) => {
        if (!this.state.user_symptoms.includes(key) && e.target.value.toLowerCase() === key.toLowerCase()) {
          return this.setState(
            {
              user_symptoms: [...this.state.user_symptoms, key],
            },
            () => {
              return this.get_possible_disease();
            }
          );
        } else if (!this.state.user_symptoms.includes(e.target.value)) {
          for (let i = 0; i < symps.length; i++) {
            if (!this.state.user_symptoms.includes(symps[i])) {
              this.setState(
                {
                  user_symptoms: [...this.state.user_symptoms, symps[i]],
                },
                () => {
                  return this.get_possible_disease();
                }
              );
              break;
            }
          }
        }
      });
    }
  };

  showContent = () => {
    const symps = SymptomList.filter((each) => {
      return each.toLowerCase().includes(this.state.searched.toLowerCase());
    });

    return (
      <div id="#Symptoms" className="grid-row width-full">
        <div className="col-12 tablet:grid-col-5">
          <input
            className="usa-input searchSymptomsInput"
            onKeyDown={this.keyDownEvent}
            onChange={this.getInputSymptoms}
            placeholder="Search Symptoms"
            id="input-type-text"
            name="input-type-text"
            type="text"
          />
          <ul className="symtomsListBox padding-top-2">
            {symps
              .filter((item) => !this.state.user_symptoms.includes(item))
              .map((key, id) => {
                return (
                  <li key={id}>
                    <button onClick={this.addSymptomButtonEvent.bind(this)} value={key}>
                      {key}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="col-12 tablet:grid-col-7 padding-top-2 UserSymptoms">
          <ul>
            {this.state.user_symptoms.map((key, id) => (
              <li key={id}>
                {key}{" "}
                <button onClick={this.deleteSymptomButtonEvent.bind(this)} value={key}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 width-full display-flex flex-row flex-justify-start resetButton padding-left-2">
          <button onClick={this.on_click_reset_button} className="usa-button usa-button--secondary">
            Reset
          </button>
        </div>
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.showContent()}</React.Fragment>;
  }
}

export default Symptom;
