import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BigFive = () => {
    const [responses, setResponses] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', 
        q6: '', q7: '', q8: '', q9: '', q10: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResponses(prevResponses => ({
            ...prevResponses,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(responses);
        navigate("/email_evaluation"); 
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
