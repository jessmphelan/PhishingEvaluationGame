import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePlayerID } from './playerID_context'; 


const CreateAccountForm = () => {
    const navigate = useNavigate();

	const {playerID, setPlayerID} = usePlayerID();

	const [sessionType, setSessionType] = useState(""); // 'in-person' or 'remote'
	const [isQuietSpace, setIsQuietSpace] = useState(null); // null, true, or false
	const [specialId, setSpecialId] = useState(""); // For in-person sessions

	const [userAgent, setUserAgent] = useState(''); // State to store the user agent string



	const [tempSpecialId, setTempSpecialId] = useState("");


	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);


	useEffect(() => {
		console.log(`Current states - sessionType: ${sessionType}, isQuietSpace: ${isQuietSpace}, specialId: ${specialId}`);
		setUserAgent(navigator.userAgent); // Store the user agent string in state
		console.log(`User Agent: ${navigator.userAgent}`); // Log the user agent string
	}, [sessionType, isQuietSpace, specialId]); // Log state changes for debugging

	
	// Updates the state whenever the user types in the input field
	const handleSpecialIdChange = (e) => {
		console.log(`Current specialId: ${e.target.value}`);
		setSpecialId(e.target.value);
	};

	const handleGoBack = () => {
		setSessionType("");
		setError(false); 
	  };
	  
	

	const handleProceedInPerson = (e) => {
		e.preventDefault();
		setSpecialId(tempSpecialId); // Update the specialId state with the temporary value
		console.log("Special ID entered:", tempSpecialId);
		// e.preventDefault(); // Prevent the default form submission behavior
		// console.log("Form submission prevented.");
		//console.log("Special ID entered:", specialId); // Good for debugging
		// Check if the specialId is "spring-immersion-2024"
		if (tempSpecialId === "spring-immersion-2024") {
			console.log("Special ID is valid, proceeding...");
			navigate("/instructions"); // Navigate to the instructions page or the next part of your process
		} else {
			alert("The special ID entered is not valid. Please try again.");
			setSpecialId(""); 
		}
	};
	
	
	const generateSessionUsername = () => {
		const timestamp = new Date().getTime(); 
		//const randomPart = Math.random().toString(36).substr(2, 9); // Generate a random string
		//const username = `PhishUser_${timestamp}_${randomPart}`;
		const username = `PhishUser_${timestamp}`;
		return username;
	};
	

	// Method that handles the entire flow: generating the username, registering the session,
	// and navigating upon success.
	const handleEnterStudy = async () => {
		const playerID = generateSessionUsername(); // Generate the session username
		console.log(`Generated session username: ${playerID}`); // Log the generated username

		setPlayerID(playerID); 
	
		// Determine the study mode based on the user's selections
		let studyMode = sessionType === 'in-person' ? 'in-person' : (isQuietSpace ? 'remote-quiet' : 'remote-distractedenv');
		
		console.log(JSON.stringify({ playerID, studyMode, userAgent }));

		try {
			const response = await fetch('http://127.0.0.1:5000/api/register_session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ playerID, studyMode , userAgent})
			});
	
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || 'Failed to register session');
			}
			

			console.log(`Session registration successful:`, data);
			
			console.log("Navigating to instructions");
			navigate("/instructions");

		} catch (error) {
			console.error('Error during session registration:', error);
			setError(true); 

		}
	};
	
	return (
		<div className="app-container">
		  <div className="form-container">
			<h1>User Registration</h1>
			{!sessionType && (
			  <div className="section-container">
				<p>Are you participating in this study on campus at one of our tables with a facilitator?</p>
				<div className="button-container">
				  <button onClick={() => setSessionType("in-person")} className="choice-button">Yes</button>
				  <button onClick={() => setSessionType("remote")} className="choice-button">No</button>
				</div>
			  </div>
			)}
	  
			{sessionType === "in-person" && !specialId && (
				<div className="section-container">
					<form onSubmit={handleProceedInPerson}>
					<label>Please ask the study facilitator to enter special ID to continue:</label>
					<input type="text" value={tempSpecialId} onChange={(e) => setTempSpecialId(e.target.value)} className="input-field"/>
					<div className="form-button-container">
						<button type="button" onClick={handleGoBack} className="submit-button">Go Back</button>
						<button type="submit" onClick={handleEnterStudy} className="submit-button">Proceed</button>
						
					</div>
					</form>
				</div>
			)}

			{sessionType === "remote" && isQuietSpace === null && (
			  <div className="section-container">
				<p>Are you in a quiet space?</p>
				<div className="button-container">
				  <button onClick={() => setIsQuietSpace(true)} className="choice-button">Yes</button>
				  <button onClick={() => setIsQuietSpace(false)} className="choice-button">No</button>
				</div>
			  </div>
			)}
			{sessionType === "remote" && isQuietSpace !== null && (
			  <div className="section-container">
				<p>Click below to enter the study.</p>
				<div className="form-button-container">
				  <button onClick={handleEnterStudy} className="submit-button">Enter the Study</button>
				</div>
			  </div>
			)}
		  </div>
		</div>
	  );
	  
	  
	
};

export default CreateAccountForm;


