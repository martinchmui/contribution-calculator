import React from 'react';
import InputForm from './InputForm';
import Results from './Results';

const App = () => {
    return (
        <div className="container">
            <h1>Very Simple Contribution Calculator</h1>
            <p style={{ fontWeight: "bold" }}>The steps:</p>
            <ol>
                <li>Enter your holdings (Name of the tickers, target balance, and market price)</li>
                <li>Enter the value of cash you're planning to use to make a purchase (the planned contribution)</li>
                <li>It calculates how many shares of each holding to buy based on your target balance. You check that it looks reasonable, and make that trade.</li>
            </ol>
            <h2>Enter target allocations</h2>
            <InputForm />
            <br />
            <Results />
        </div>
    );
};

export default App;