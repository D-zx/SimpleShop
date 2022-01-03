const initialState = {
    status: null,
    err: {}
};

const Brand =(state = initialState, action)=>{
    const { type, payload } = action;

    switch(type) {
        case "INIT":
            return ({
                ...initialState,
            })
            
        case "CREATEBRAND_SUCCESS":
            return ({
                ...state,
                status: "created"
            })

        case "CREATEBRAND_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "UPDATEBRAND_SUCCESS":
            return ({
                ...state,
                status: "updated"
            })

        case "UPDATEBRAND_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "DELETEBRAND_SUCCESS":
            return ({
                ...state,
                status: "deleted"
            })

        case "DELETEBRAND_FAIL":
            return ({
                ...state,
                err: payload
                })

        default:
            return state;
    }
}

export default Brand;