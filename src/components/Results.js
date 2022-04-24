import React from 'react';
import { connect } from 'react-redux';

const sum = function (items, prop) {
    return items.reduce(function (a, b) {
        return a + parseInt(b[prop]);
    }, 0);
};

const Results = props => {
    const sharesToBuy = function (percent, currentPrice) {
        return Math.floor(percent / 100 * props.results.contributions / currentPrice)
    }

    if (!props.results.holdings) {
        return null;
    } else if (sum(props.results.holdings, 'target') !== 100) {
        return (
            <div className="text-danger">Check if allocations sum to 100%</div>
        )
    } else {
        return (
            <div>
                <h3>Shares to buy</h3>
                {props.results.holdings.map((holding, index) =>
                    <p key={index}>{sharesToBuy(holding.target, holding.currentPrice)} shares of {holding.name}</p>
                )}
                <p className="text-danger" style={{fontStyle: 'italic'}}>Author Note: I take no responsibility for the accuracy of this calculator. Check the math. Check the formulas. I'm not an expert. </p>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        results: state.data.results,
    };
};

export default connect(mapStateToProps)(Results);