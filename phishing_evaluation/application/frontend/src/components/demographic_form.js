import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DemographicForm = () => {
  const [age, setAge] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [secondMajor, setSecondMajor] = useState('');
  const [thirdMajor, setThirdMajor] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    //reset error if it is already full
    if(error !== '')
      setError('');

    //set error if any of the fields are empty
    if(!(age && age > 0))
      setError('Error: invalid age');
    else if(!year)
      setError('Error: invalid year');
    else if(!major)
      setError('Error: invalid major');
    else if(!language)
      setError('Error: invalid language field');
    //otherwise navigate to the next page
    else
      navigate("/email_evaluation");
  };


  return (
    <div className='app-container'>
    <h1>Phishing Evaluation</h1>
    <h3>Demographic Information</h3>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Age:
          <input type="number" value={age} onChange={e => setAge(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          First Language:
        <select value={major} onChange={e => setLanguage(e.target.value)}>
            <option value="">Select...</option>
            <option value="english">English</option>
            <option value="arabic">Arabic</option>
            <option value="bengali">Bengali</option>
            <option value="chinese">Chinese</option>
            <option value="french">French</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="other">Other</option>
          </select>
          </label>
      </div>
      <div>
        <label>
          Year:
          <select value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Select...</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Major:
        <select value={major} onChange={e => setMajor(e.target.value)}>
            <option value="">Select...</option>
            <option value="undecided">Undecided</option>
            <option value="african-american-and-diaspora-studies">African American and Diaspora Studies</option>
<option value="american-studies">American Studies</option>
<option value="anthropology">Anthropology</option>
<option value="architecture-and-the-built-environment">Architecture and the Built Environment</option>
<option value="art">Art</option>
<option value="asian-american-and-asian-diaspora-studies">Asian American and Asian Diaspora Studies</option>
<option value="asian-studies">Asian Studies</option>
<option value="biochemistry-and-chemical-biology">Biochemistry and Chemical Biology</option>
<option value="biological-sciences">Biological Sciences</option>
<option value="biomedical-engineering">Biomedical Engineering</option>
<option value="chemical-engineering">Chemical Engineering</option>
<option value="chemistry">Chemistry</option>
<option value="child-development">Child Development</option>
<option value="child-studies">Child Studies</option>
<option value="cinema-and-media-arts">Cinema and Media Arts</option>
<option value="civil-engineering">Civil Engineering</option>
<option value="classical-and-mediterranean-studies">Classical and Mediterranean Studies</option>
<option value="climate-studies">Climate Studies</option>
<option value="cognitive-studies">Cognitive Studies</option>
<option value="communication-of-science-and-technology">Communication of Science and Technology</option>
<option value="communication-studies">Communication Studies</option>
<option value="computer-science">Computer Science</option>
<option value="earth-and-environmental-sciences">Earth and Environmental Sciences</option>
<option value="ecology-evolution-and-organismal-biology">Ecology, Evolution, and Organismal Biology</option>
<option value="economics">Economics</option>
<option value="economics-and-history">Economics and History</option>
<option value="electrical-and-computer-engineering">Electrical and Computer Engineering</option>
<option value="elementary-education">Elementary Education</option>
<option value="engineering-science">Engineering Science</option>
<option value="english">English</option>
<option value="environmental-sociology">Environmental Sociology</option>
<option value="european-studies">European Studies</option>
<option value="european-studies-russia-and-eastern-europe">European Studies: Russia and Eastern Europe</option>
<option value="french">French</option>
<option value="french-and-european-studies">French and European Studies</option>
<option value="gender-and-sexuality-studies">Gender and Sexuality Studies</option>
<option value="german-and-european-studies">German and European Studies</option>
<option value="german-studies">German Studies</option>
<option value="history">History</option>
<option value="history-of-art">History of Art</option>
<option value="human-and-organizational-development">Human and Organizational Development</option>
<option value="italian-and-european-studies">Italian and European Studies</option>
<option value="jazz-studies">Jazz Studies</option>
<option value="jewish-studies">Jewish Studies</option>
<option value="latin-american-studies">Latin American Studies</option>
<option value="latino-and-latina-studies">Latino and Latina Studies</option>
<option value="law-history-and-society">Law, History, and Society</option>
<option value="mathematics">Mathematics</option>
<option value="mechanical-engineering">Mechanical Engineering</option>
<option value="medicine-health-and-society">Medicine, Health, and Society</option>
<option value="molecular-and-cellular-biology">Molecular and Cellular Biology</option>
<option value="music-composition">Music Composition</option>
<option value="music-education">Music Education</option>
<option value="music-integrated-studies">Music Integrated Studies</option>
<option value="music-performance">Music Performance</option>
<option value="musical-arts">Musical Arts</option>
<option value="neuroscience">Neuroscience</option>
<option value="philosophy">Philosophy</option>
<option value="physics">Physics</option>
<option value="political-science">Political Science</option>
<option value="secondary-education">Secondary Education</option>
<option value="special-education">Special Education</option>
            <option value="other">Other</option>
          </select>
          </label>
          </div>
          <div>
          <label>
          Second Major:
        <select value={secondMajor} onChange={e => setSecondMajor(e.target.value)}>
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="african-american-and-diaspora-studies">African American and Diaspora Studies</option>
<option value="american-studies">American Studies</option>
<option value="anthropology">Anthropology</option>
<option value="architecture-and-the-built-environment">Architecture and the Built Environment</option>
<option value="art">Art</option>
<option value="asian-american-and-asian-diaspora-studies">Asian American and Asian Diaspora Studies</option>
<option value="asian-studies">Asian Studies</option>
<option value="biochemistry-and-chemical-biology">Biochemistry and Chemical Biology</option>
<option value="biological-sciences">Biological Sciences</option>
<option value="biomedical-engineering">Biomedical Engineering</option>
<option value="chemical-engineering">Chemical Engineering</option>
<option value="chemistry">Chemistry</option>
<option value="child-development">Child Development</option>
<option value="child-studies">Child Studies</option>
<option value="cinema-and-media-arts">Cinema and Media Arts</option>
<option value="civil-engineering">Civil Engineering</option>
<option value="classical-and-mediterranean-studies">Classical and Mediterranean Studies</option>
<option value="climate-studies">Climate Studies</option>
<option value="cognitive-studies">Cognitive Studies</option>
<option value="communication-of-science-and-technology">Communication of Science and Technology</option>
<option value="communication-studies">Communication Studies</option>
<option value="computer-science">Computer Science</option>
<option value="earth-and-environmental-sciences">Earth and Environmental Sciences</option>
<option value="ecology-evolution-and-organismal-biology">Ecology, Evolution, and Organismal Biology</option>
<option value="economics">Economics</option>
<option value="economics-and-history">Economics and History</option>
<option value="electrical-and-computer-engineering">Electrical and Computer Engineering</option>
<option value="elementary-education">Elementary Education</option>
<option value="engineering-science">Engineering Science</option>
<option value="english">English</option>
<option value="environmental-sociology">Environmental Sociology</option>
<option value="european-studies">European Studies</option>
<option value="european-studies-russia-and-eastern-europe">European Studies: Russia and Eastern Europe</option>
<option value="french">French</option>
<option value="french-and-european-studies">French and European Studies</option>
<option value="gender-and-sexuality-studies">Gender and Sexuality Studies</option>
<option value="german-and-european-studies">German and European Studies</option>
<option value="german-studies">German Studies</option>
<option value="history">History</option>
<option value="history-of-art">History of Art</option>
<option value="human-and-organizational-development">Human and Organizational Development</option>
<option value="italian-and-european-studies">Italian and European Studies</option>
<option value="jazz-studies">Jazz Studies</option>
<option value="jewish-studies">Jewish Studies</option>
<option value="latin-american-studies">Latin American Studies</option>
<option value="latino-and-latina-studies">Latino and Latina Studies</option>
<option value="law-history-and-society">Law, History, and Society</option>
<option value="mathematics">Mathematics</option>
<option value="mechanical-engineering">Mechanical Engineering</option>
<option value="medicine-health-and-society">Medicine, Health, and Society</option>
<option value="molecular-and-cellular-biology">Molecular and Cellular Biology</option>
<option value="music-composition">Music Composition</option>
<option value="music-education">Music Education</option>
<option value="music-integrated-studies">Music Integrated Studies</option>
<option value="music-performance">Music Performance</option>
<option value="musical-arts">Musical Arts</option>
<option value="neuroscience">Neuroscience</option>
<option value="philosophy">Philosophy</option>
<option value="physics">Physics</option>
<option value="political-science">Political Science</option>
<option value="secondary-education">Secondary Education</option>
<option value="special-education">Special Education</option>
            <option value="other">Other</option>
          </select>
          </label>
          </div>
          <div>
            <label>Third Major:
          <select value={thirdMajor} onChange={e => setThirdMajor(e.target.value)}>
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="african-american-and-diaspora-studies">African American and Diaspora Studies</option>
<option value="american-studies">American Studies</option>
<option value="anthropology">Anthropology</option>
<option value="architecture-and-the-built-environment">Architecture and the Built Environment</option>
<option value="art">Art</option>
<option value="asian-american-and-asian-diaspora-studies">Asian American and Asian Diaspora Studies</option>
<option value="asian-studies">Asian Studies</option>
<option value="biochemistry-and-chemical-biology">Biochemistry and Chemical Biology</option>
<option value="biological-sciences">Biological Sciences</option>
<option value="biomedical-engineering">Biomedical Engineering</option>
<option value="chemical-engineering">Chemical Engineering</option>
<option value="chemistry">Chemistry</option>
<option value="child-development">Child Development</option>
<option value="child-studies">Child Studies</option>
<option value="cinema-and-media-arts">Cinema and Media Arts</option>
<option value="civil-engineering">Civil Engineering</option>
<option value="classical-and-mediterranean-studies">Classical and Mediterranean Studies</option>
<option value="climate-studies">Climate Studies</option>
<option value="cognitive-studies">Cognitive Studies</option>
<option value="communication-of-science-and-technology">Communication of Science and Technology</option>
<option value="communication-studies">Communication Studies</option>
<option value="computer-science">Computer Science</option>
<option value="earth-and-environmental-sciences">Earth and Environmental Sciences</option>
<option value="ecology-evolution-and-organismal-biology">Ecology, Evolution, and Organismal Biology</option>
<option value="economics">Economics</option>
<option value="economics-and-history">Economics and History</option>
<option value="electrical-and-computer-engineering">Electrical and Computer Engineering</option>
<option value="elementary-education">Elementary Education</option>
<option value="engineering-science">Engineering Science</option>
<option value="english">English</option>
<option value="environmental-sociology">Environmental Sociology</option>
<option value="european-studies">European Studies</option>
<option value="european-studies-russia-and-eastern-europe">European Studies: Russia and Eastern Europe</option>
<option value="french">French</option>
<option value="french-and-european-studies">French and European Studies</option>
<option value="gender-and-sexuality-studies">Gender and Sexuality Studies</option>
<option value="german-and-european-studies">German and European Studies</option>
<option value="german-studies">German Studies</option>
<option value="history">History</option>
<option value="history-of-art">History of Art</option>
<option value="human-and-organizational-development">Human and Organizational Development</option>
<option value="italian-and-european-studies">Italian and European Studies</option>
<option value="jazz-studies">Jazz Studies</option>
<option value="jewish-studies">Jewish Studies</option>
<option value="latin-american-studies">Latin American Studies</option>
<option value="latino-and-latina-studies">Latino and Latina Studies</option>
<option value="law-history-and-society">Law, History, and Society</option>
<option value="mathematics">Mathematics</option>
<option value="mechanical-engineering">Mechanical Engineering</option>
<option value="medicine-health-and-society">Medicine, Health, and Society</option>
<option value="molecular-and-cellular-biology">Molecular and Cellular Biology</option>
<option value="music-composition">Music Composition</option>
<option value="music-education">Music Education</option>
<option value="music-integrated-studies">Music Integrated Studies</option>
<option value="music-performance">Music Performance</option>
<option value="musical-arts">Musical Arts</option>
<option value="neuroscience">Neuroscience</option>
<option value="philosophy">Philosophy</option>
<option value="physics">Physics</option>
<option value="political-science">Political Science</option>
<option value="secondary-education">Secondary Education</option>
<option value="special-education">Special Education</option>
            <option value="other">Other</option>
          </select>
          </label>
          </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      <div>
      {error && <div className="error">{error}</div>}
      </div>
    </form>
    </div>
  );
};

export default DemographicForm;
