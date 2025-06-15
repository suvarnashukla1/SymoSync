import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lab from "./components/DHIlab/DHIlab.jsx";
import Man from './components/Man/Man.jsx'; 
import Disease from './components/Disease/Disease.jsx'; 
import Home from './components/HOME/Home.jsx'; 
import Symptom from './components/Symptom/Symptom.jsx'; 
import Patient1 from './components/Patient/Patient1.jsx'; 
import Patient2 from './components/Patient/Patient2.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
  {/* <Route path="/" element={<HomePage />} /> */}
  <Route path="/Man" element={<Man />} />
  <Route path="/Disease" element={<Disease />} />
   <Route path="/" element={<Home />} />
    <Route path="/Dhi" element={<Lab/>} />
     <Route path="/Symptom" element={<Symptom />} />
       <Route path="/Patient1" element={<Patient1 />} />
        <Route path="/Patient2" element={<Patient2 />} />
      </Routes>
    </Router>
  );
}

export default App;
