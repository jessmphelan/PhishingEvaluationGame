import React from 'react';

const ProgressBar = ({ progress }) => {
    const Parentdiv = {
        display: 'flex',
        height: 20,
        width: '90%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: '20px auto',
        overflow: 'hidden', // Ensure the child div rounded corners are visible
    };

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: 'green',
        borderRadius: 40,
        textAlign: 'right',
        transition: 'width 0.3s ease-in-out', // Smooth transition for width change
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10, // Padding to avoid text overflow
    };

    const progresstext = {
        color: 'white',
        fontWeight: 400, // Increased font weight for better readability
    };

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    )
};

export default ProgressBar;

