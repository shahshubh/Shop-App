import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return{
                token: action.token,
                userId: action.userId,
                didTryAutoLogin: true
            };
        
        case SET_DID_TRY_AUTO_LOGIN:
            return{
                ...state,
                didTryAutoLogin: true
            };

        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };

        // case SIGNUP:
        //     return{
        //         token: action.token,
        //         userId: action.userId
        //     };

        default:
            return state;
    }
}