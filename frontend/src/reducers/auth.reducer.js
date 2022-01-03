const initialState = {
    isAuthenticated: null,
    tabindex: "auth",
    email: null,
    user: null,
    token: null,
    refreshToken: null,
};

const Auth = (state = initialState, actions) => {
    const {type, payload} = actions
    switch (type){
       
        case "SIGNUP_SUCCESS":
            return ({
                ...state,
                tabindex: "verification-mail-sent",
                email: payload.email
            })
        
        case "SIGNUP_FAIL":
            return ({
                ...state,
                tabindex: "auth",
                signup_err: payload
            })

        case "SIGNIN_SUCCESS":
            return ({
                ...state,
                isAuthenticated: true,
                token: payload.access_token,
                refreshToken: payload.refresh_token
            })

        case "LOADUSER":
            return ({
                ...state,
                user: payload.username,
                userId: payload.id,
                email: payload.email,
                image: payload.profile.image,
                admin: payload.is_staff
            })

        case "SIGNIN_FAIL":
            return ({
                ...state,
                signin_err: payload
            })

        case "SIGNOUT":
            state = initialState
            return ({
                ...state,
                isAuthenticated: false,
            })

        default:
            return state
    }
};

export default Auth;