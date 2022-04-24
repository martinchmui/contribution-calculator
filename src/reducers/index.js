import { combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const INITIAL_STATE = {
    holdings:
        [
            { id: uuidv4(), name: null, target: null, currentPrice: null },
            { id: uuidv4(), name: null, target: null, currentPrice: null }
        ],
    contributions: null,
    results: {}
};
const dataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CREATE_HOLDING':
            return { ...state, holdings: [...state.holdings, action.payload] };
        case 'EDIT_HOLDING':
            return { ...state, holdings: state.holdings.map((holding) => holding.id === action.payload.id ? action.payload : holding) };
        case 'DELETE_HOLDING':
            return { ...state, holdings: _.filter(state.holdings, function (currentHolding) { return currentHolding.id !== action.payload }) };
        case 'EDIT_CONTRIBUTION':
            return { ...state, contributions: action.payload };
        case 'EDIT_RESULTS':
            return { ...state, results: action.payload }
        default:
            return state;
    };
};

export default combineReducers({
    data: dataReducer
});