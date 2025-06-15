import React, { Component } from "react";
import Lab from "../DHIlab/DHIlab.jsx";
import { Link, useLocation } from 'react-router-dom';

// Higher-order component to inject location data
function withLocation(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };
}

class Disease extends Component {
  constructor(props) {
    super(props);
    
    // Get navigation data
    const locationState = this.props.location?.state || {};
    
    this.state = {
      patientInfo: locationState.patientInfo || this.props.patientInfo || [],
      disease_with_possibility: locationState.disease_with_possibility || this.props.disease_with_possibility || [],
      symptoms: locationState.symptoms || [],
      gender: locationState.gender || this.props.gender || 'Not specified',
      age: locationState.age || this.props.age || 'Not specified'
    };
  }

  // Update state when location changes
  componentDidUpdate(prevProps) {
    const locationState = this.props.location?.state || {};
    const prevLocationState = prevProps.location?.state || {};
    
    if (JSON.stringify(locationState) !== JSON.stringify(prevLocationState)) {
      this.setState({
        patientInfo: locationState.patientInfo || this.props.patientInfo || [],
        disease_with_possibility: locationState.disease_with_possibility || this.props.disease_with_possibility || [],
        symptoms: locationState.symptoms || [],
        gender: locationState.gender || this.props.gender || 'Not specified',
        age: locationState.age || this.props.age || 'Not specified'
      });
    }
  }

  get_current_html = () => {
    const diseaseList = this.state.disease_with_possibility || [];
    
    if (!Array.isArray(diseaseList)) {
     
      return this.renderNoData();
    }

    // Filter diseases with possibility > 0
    const filtered_list = diseaseList.filter((e) => {
      return e && e.possibility && parseFloat(e.possibility) > 50;
    });

    // Sort by possibility (descending) then by name
    filtered_list.sort((a, b) => {
      const possibilityA = parseFloat(a.possibility) || 0;
      const possibilityB = parseFloat(b.possibility) || 0;
      
      if (possibilityB !== possibilityA) {
        return possibilityB - possibilityA;
      }
      return a.name.localeCompare(b.name);
    });

    return filtered_list.length !== 0 ? (
      
      <div className="grid-row width-full DiseaseComponent">
        <div className="col-12 tablet:grid-col-12 patientInfo">
        </div>
        
        <div className="col-12 tablet:grid-col-12 patientQuestions">
          {(this.state.patientInfo || []).map((key, id) => (
            <div className="singleQuestion" key={id}>
              <p>{key.question || 'No question'}</p>
              <p>{key.answer || 'No answer'}</p>
            </div>
          ))}
        </div>
        
        <div className="col-12 tablet:grid-col-12 DiagnosisReport">
          <h2>Diagnosis Report</h2>
          <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            Found {filtered_list.length} possible condition(s) based on your symptoms
          </p>
          
          {filtered_list.map((key, id) => (
            <div className="reportDiv" key={id} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px',backgroundColor: 'white'}}>
              <div className="display-flex flex-row flex-justify flex-wrap">
                <div className="display-flex flex-align-center titleReport">
                  <h4>{key.name || 'Unknown Disease'}</h4>
                  <a 
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(key.name || '')}`} 
                    title="Wikipedia" 
                    rel="noopener noreferrer" 
                    target="_blank"
                    style={{ marginLeft: '10px', textDecoration: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                  >
                    i
                  </a>
                </div>
                <div className="display-flex flex-align-center Possibility">
                  <p>
                    Match: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{key.possibility || '0'}%</span>
                  </p>
                  <div className="possibilityProgressBar" style={{ width: '100px', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', marginLeft: '10px' }}>
                    <div style={{ 
                      width: `${key.possibility || 0}%`, 
                      height: '100%', 
                      backgroundColor: '#007bff', 
                      borderRadius: '5px' 
                    }}></div>
                  </div>
                </div>
              </div>
              
              <div className="diseaseSymptoms" style={{ marginTop: '15px' }}>
                <h4>Symptoms for {key.name}</h4>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                  You match {key.symptom_user_has?.length || 0} out of {key.disease_symptom?.length || 0} symptoms
                </p>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0 }}>
                  {(key.disease_symptom || []).sort().map((item, index) => {
                    const userHasSymptom = (key.symptom_user_has || []).includes(item);
                    return (
                      <li 
                        key={index} 
                        style={{
                          padding: '5px 10px',
                          borderRadius: '15px',
                          fontSize: '12px',
                          backgroundColor: userHasSymptom ? '#d4edda' : '#f8f9fa',
                          color: userHasSymptom ? '#155724' : '#6c757d',
                          border: userHasSymptom ? '1px solid #c3e6cb' : '1px solid #dee2e6'
                        }}
                        className={userHasSymptom ? "active" : ""}
                      >
                        {userHasSymptom && '✓ '}{item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>⚠️ Important Disclaimer</div>
          <div style={{ marginBottom: '15px' }}>Always visit a doctor if you have any symptoms of a disease or call your local hospital</div>
          <div style={{ marginBottom: '15px' }}>Want to Chat with our HealthBot? Click Below</div>
          <button className="meow" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            <Link to="/Man" style={{ color: 'white', textDecoration: 'none' }}>Symo-man</Link>
          </button>
        </div>
      </div>
    ) : (
      this.renderNoData()
    );
  };

  renderNoData = () => {
    return (
      <React.Fragment>
        <div className="grid-row width-50rem DiseaseComponent">
          <div className="col-12 tablet:grid-col-12 patientInfo">
          
          </div>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8d7da', borderRadius: '8px', margin: '20px 0' }}>
            <h4>No Disease Matches Found</h4>
            <p>
              Cannot determine possible diseases based on the selected symptoms. 
              This could mean:
            </p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>The symptoms don't match our database</li>
              <li>More specific symptoms are needed</li>
              <li>The condition might be rare or not in our database</li>
             <li>No disease with a possibility greater than 50% was found</li></ul>
            <p style={{ fontWeight: 'bold', marginTop: '15px' }}>
              Please consult with a healthcare professional or call your local hospital if it is an emergency.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="meow" style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
              <Link to="/Symptom" style={{ color: 'white', textDecoration: 'none' }}>Go Back to Symptoms</Link>
            </button>
            <button className="meow" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
              <Link to="/Man" style={{ color: 'white', textDecoration: 'none' }}>Chat with HealthBot</Link>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return <React.Fragment>{this.get_current_html()}</React.Fragment>;
  }
}

export default withLocation(Disease);