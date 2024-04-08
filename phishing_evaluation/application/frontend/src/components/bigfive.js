import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { usePlayerID } from './playerID_context';

import { OrderContext } from './ordercontext';




const BigFive = () => {
    const [responses, setResponses] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', 
        q6: '', q7: '', q8: '', q9: '', q10: ''
    });
    const navigate = useNavigate();

    const {order, firstTestCompleted, setFirstTestCompleted} = useContext(OrderContext); // Use the order from context

    const { playerID } = usePlayerID(); // Use the playerID from context

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResponses(prevResponses => ({
            ...prevResponses,
            [name]: value
        }));
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(responses);
    //     navigate("/email_evaluation"); 
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

       // Check if any question is unanswered
        const allAnswered = Object.values(responses).every(value => value !== '');
        if (!allAnswered) {
            alert('Please fill in all fields before submitting.');
            return; // Stop the function from proceeding further if any question is unanswered
        }

        const payload = {
            playerID, 
            responses,
            testType: 'BigFive' 
        };

        console.log(payload); 

        try {
            const response = await fetch('http://127.0.0.1:5000/api/save_psychological_profile', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to save BigFive responses');
            }
            
            // Determine navigation based on completion
            if (!firstTestCompleted) {
                setFirstTestCompleted(true); // Mark the first test as completed
                console.log("Order:", order, "First Test Completed:", firstTestCompleted);
                navigate("/second"); // Navigate to the second test
            } else {
                navigate("/email_evaluation"); // Navigate to the next step after completing the second test
            }
        } catch (error) {
            console.error("Error saving BigFive responses:", error);
            
        }
    };

    // Array of BFI-10 statements for rendering
    const statements = [
        "is reserved.",
        "is generally trusting.",
        "tends to be lazy.",
        "is relaxed, handles stress well.",
        "has few artistic interests.",
        "is outgoing, sociable.",
        "tends to find fault with others.",
        "does a thorough job.",
        "gets nervous easily.",
        "has an active imagination."
    ];

    return (
        <div className='app-container'>
            <h1>Phishing Email Evaluation</h1>
            <form onSubmit={handleSubmit}>
                {statements.map((statement, index) => (
                    <div key={index}>
                        <label>
                            I see myself as someone who {statement}
                            <select
                                name={`q${index + 1}`}
                                value={responses[`q${index + 1}`]}
                                onChange={handleChange}
                            >
                                <option value="">Select...</option>
                                <option value="1">Disagree strongly</option>
                                <option value="2">Disagree a little</option>
                                <option value="3">Neither agree nor disagree</option>
                                <option value="4">Agree a little</option>
                                <option value="5">Agree strongly</option>
                            </select>
                        </label>
                    </div>
                ))}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default BigFive;
