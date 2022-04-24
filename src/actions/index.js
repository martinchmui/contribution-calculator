import { v4 as uuidv4 } from 'uuid';

export const createHolding = () => {
    return {
        type: 'CREATE_HOLDING',
        payload: { id: uuidv4(), name: null, target: null, currentPrice: null }
    };
};

export const editHolding = payload => {
    return {
        type: 'EDIT_HOLDING',
        payload
    };
};

export const deleteHolding = id => {
    return {
        type: 'DELETE_HOLDING',
        payload: id
    };
};

export const editContribution = payload => {
    return {
        type: 'EDIT_CONTRIBUTION',
        payload
    };
};

export const editResults = payload => {
    return {
        type: 'EDIT_RESULTS',
        payload
    };
};