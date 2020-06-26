export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';


export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBw31q86TMvjjW4m9o-hgZGw8FdPAVjuv4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_EXISTS'){
                message = 'This email already exists!';
            }
            throw new Error(message);
        }
        const resData = await response.json();

        dispatch({
            type: SIGNUP
        });
    };
};




export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBw31q86TMvjjW4m9o-hgZGw8FdPAVjuv4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if(!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'This email could not be found';
            } else if(errorId === 'INVALID_PAsSWORD'){
                message = 'This password is not valid!';
            }

            throw new Error(message);

        }

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type: LOGIN
        });
    };
};