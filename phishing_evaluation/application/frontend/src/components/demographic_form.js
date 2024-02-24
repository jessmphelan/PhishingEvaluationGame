import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DemographicForm = () => {
  const [age, setAge] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [language, setLanguage] = useState('');
  const [confidence, setConfidence] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ age, year, major, language, confidence});
    navigate("/ncs6");
  };


  return (
    <div className='app-container'>
      <div> 
      <h1>Phishing Evaluation</h1> 
      <h3>Demographic Information</h3>
      </div>
    
    <form onSubmit={handleSubmit}>

      <div>
        <label>
          Age:
          <input type="number" value={age} aria-label="Age" onChange={e => setAge(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
        Year: 
        <select value={year} aria-label="Select Year" onChange={e => setYear(e.target.value)}>
          <option value="">Select...</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="N/A">N/A</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        Primary Major: 
        <select value={major} aria-label="Select Major" onChange={e => setMajor(e.target.value)}>
          <option value="">Select...</option>
          <option value="African American and Diaspora Studies">African American and Diaspora Studies</option>
          <option value="American Studies">American Studies</option>
          <option value="Anthropology">Anthropology</option>
          <option value="Architecture and the Built Environment">Architecture and the Built Environment</option>
          <option value="Art">Art</option>
          <option value="Asian American and Asian Diaspora Studies">Asian American and Asian Diaspora Studies</option>
          <option value="Asian Studies">Asian Studies</option>
          <option value="Biochemistry and Chemical Biology">Biochemistry and Chemical Biology</option>
          <option value="Biological Sciences">Biological Sciences</option>
          <option value="Biomedical Engineering">Biomedical Engineering</option>
          <option value="Chemical Engineering">Chemical Engineering</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Child Development">Child Development</option>
          <option value="Child Studies">Child Studies</option>
          <option value="Cinema and Media Arts">Cinema and Media Arts</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Classical and Mediterranean Studies">Classical and Mediterranean Studies</option>
          <option value="Climate Studies">Climate Studies</option>
          <option value="Cognitive Studies">Cognitive Studies</option>
          <option value="Communication of Science and Technology">Communication of Science and Technology</option>
          <option value="Communication Studies">Communication Studies</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Culture, Leadership, and Advocacy">Culture, Leadership, and Advocacy</option>
          <option value="Earth and Environmental Sciences">Earth and Environmental Sciences</option>
          <option value="Ecology, Evolution, and Organismal Biology">Ecology, Evolution, and Organismal Biology</option>
          <option value="Economics">Economics</option>
          <option value="Economics and History">Economics and History</option>
          <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
          <option value="Elementary Education">Elementary Education</option>
          <option value="Engineering Science">Engineering Science</option>
          <option value="English">English</option>
          <option value="Environmental Sociology">Environmental Sociology</option>
          <option value="European Studies">European Studies</option>
          <option value="European Studies: Russia and Eastern Europe">European Studies: Russia and Eastern Europe</option>
          <option value="French">French</option>
          <option value="French and European Studies">French and European Studies</option>
          <option value="Gender and Sexuality Studies">Gender and Sexuality Studies</option>
          <option value="German and European Studies">German and European Studies</option>
          <option value="German Studies">German Studies</option>
          <option value="History">History</option>
          <option value="History of Art">History of Art</option>
          <option value="Human and Organizational Development">Human and Organizational Development</option>
          <option value="Italian and European Studies">Italian and European Studies</option>
          <option value="Jazz Studies">Jazz Studies</option>
          <option value="Jewish Studies">Jewish Studies</option>
          <option value="Latin American Studies">Latin American Studies</option>
          <option value="Latino and Latina Studies">Latino and Latina Studies</option>
          <option value="Law, History, and Society">Law, History, and Society</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Medicine, Health, and Society">Medicine, Health, and Society</option>
          <option value="Molecular and Cellular Biology">Molecular and Cellular Biology</option>
          <option value="Music Composition">Music Composition</option>
          <option value="Music Education (Blair-to-Peabody)">Music Education (Blair-to-Peabody)</option>
          <option value="Music Integrated Studies">Music Integrated Studies</option>
          <option value="Music Performance">Music Performance</option>
          <option value="Musical Arts">Musical Arts</option>
          <option value="Neuroscience">Neuroscience</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Physics">Physics</option>
          <option value="Political Science">Political Science</option>
          <option value="Psychology">Psychology</option>
          <option value="Public Policy Studies">Public Policy Studies</option>
          <option value="Religious Studies">Religious Studies</option>
          <option value="Russian Studies">Russian Studies</option>
          <option value="Secondary Education">Secondary Education</option>
          <option value="Sociology">Sociology</option>
          <option value="Spanish">Spanish</option>
          <option value="Spanish and European Studies">Spanish and European Studies</option>
          <option value="Spanish and Portuguese">Spanish and Portuguese</option>
          <option value="Special Education">Special Education</option>
          <option value="Theatre">Theatre</option>
          <option value="Other">Other</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        First Language Spoken:
        <select value={language} aria-label="Select First Language" onChange={e => setLanguage(e.target.value)}>
          <option value="">Select...</option>
          <option value="EN">English</option>
          <option value="AF">Afrikaans</option>
          <option value="SQ">Albanian</option>
          <option value="AR">Arabic</option>
          <option value="HY">Armenian</option>
          <option value="EU">Basque</option>
          <option value="BN">Bengali</option>
          <option value="BG">Bulgarian</option>
          <option value="CA">Catalan</option>
          <option value="KM">Cambodian</option>
          <option value="ZH">Chinese (Mandarin)</option>
          <option value="HR">Croatian</option>
          <option value="CS">Czech</option>
          <option value="DA">Danish</option>
          <option value="NL">Dutch</option>
          <option value="ET">Estonian</option>
          <option value="FJ">Fiji</option>
          <option value="FI">Finnish</option>
          <option value="FR">French</option>
          <option value="KA">Georgian</option>
          <option value="DE">German</option>
          <option value="EL">Greek</option>
          <option value="GU">Gujarati</option>
          <option value="HE">Hebrew</option>
          <option value="HI">Hindi</option>
          <option value="HU">Hungarian</option>
          <option value="IS">Icelandic</option>
          <option value="ID">Indonesian</option>
          <option value="GA">Irish</option>
          <option value="IT">Italian</option>
          <option value="JA">Japanese</option>
          <option value="JW">Javanese</option>
          <option value="KO">Korean</option>
          <option value="LA">Latin</option>
          <option value="LV">Latvian</option>
          <option value="LT">Lithuanian</option>
          <option value="MK">Macedonian</option>
          <option value="MS">Malay</option>
          <option value="ML">Malayalam</option>
          <option value="MT">Maltese</option>
          <option value="MI">Maori</option>
          <option value="MR">Marathi</option>
          <option value="MN">Mongolian</option>
          <option value="NE">Nepali</option>
          <option value="NO">Norwegian</option>
          <option value="FA">Persian</option>
          <option value="PL">Polish</option>
          <option value="PT">Portuguese</option>
          <option value="PA">Punjabi</option>
          <option value="QU">Quechua</option>
          <option value="RO">Romanian</option>
          <option value="RU">Russian</option>
          <option value="SM">Samoan</option>
          <option value="SR">Serbian</option>
          <option value="SK">Slovak</option>
          <option value="SL">Slovenian</option>
          <option value="ES">Spanish</option>
          <option value="SW">Swahili</option>
          <option value="SV">Swedish </option>
          <option value="TA">Tamil</option>
          <option value="TT">Tatar</option>
          <option value="TE">Telugu</option>
          <option value="TH">Thai</option>
          <option value="BO">Tibetan</option>
          <option value="TO">Tonga</option>
          <option value="TR">Turkish</option>
          <option value="UK">Ukrainian</option>
          <option value="UR">Urdu</option>
          <option value="UZ">Uzbek</option>
          <option value="VI">Vietnamese</option>
          <option value="CY">Welsh</option>
          <option value="XH">Xhosa</option>
          <option value="Other">Other</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        I am confident in my ability to identify emails as malicious versus legitimate.
        <select value={year} aria-label="confidence" onChange={e => setConfidence(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Strongly Disagree</option>
          <option value="2">Somewhat Disagree</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Agree</option>
          <option value="5">Strongly Agree</option>
        </select>
        </label>
      </div>
      
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    
    </div>
  );
};

export default DemographicForm;
