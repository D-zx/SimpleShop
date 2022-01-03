import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
    loading: false,
};

const loading = (state = initialState, action) =>{
    const { type, payload } = action;

    switch(type) {
        case SET_LOADING:
            return {
                    ...state,
                    loading: true
                }
        case REMOVE_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default loading