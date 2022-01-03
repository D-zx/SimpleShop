const initialState = {
    loading: false,
    tabindex: "",
    mailsent: false,
};

const Password = (state = initialState, actions) => {
    const {type, payload} = actions

    switch (type){
        case "CHANGEPASSWORD_SUCCESS":
            return ({
                ...state,
                redirectTo: '/',
            })

        case "CHANGEPASSWORD_FAIL":
            return ({
                ...state,
                changepassword_error: payload
            })

        case "RESETPASSWORD_SUCCESS":
            return ({
                ...state,
                mailsent: true,
            })

        case "RESETPASSWORD_FAIL":
            return ({
                ...state,
                resetpassword_error: payload,
                mailsent: false,
            })

        case "RESETPASSWORDCONFIRM_SUCCESS":
            return ({
                ...state,
                tabindex: "reset-success",
            })

        case "RESETPASSWORDCONFIRM_FAIL":
            return ({
                ...state,
                rpc_err: payload
            })

        default:
            return state
    }
};

export default Password;