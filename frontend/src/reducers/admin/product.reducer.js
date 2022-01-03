const initialState = {
    status: null,
    err: {}
};

const Product =(state = initialState, action)=>{
    const { type, payload } = action;

    switch(type) {
        case "INIT":
            return ({
                ...initialState,
            })
            
        case "CREATEPRODUCT_SUCCESS":
            return ({
                ...state,
                status: "created"
            })

        case "CREATEPRODUCT_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "UPDATEPRODUCT_SUCCESS":
            return ({
                ...state,
                status: "updated"
            })

        case "UPDATEPRODUCT_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "DELETEPRODUCT_SUCCESS":
            return ({
                ...state,
                status: "deleted"
            })

        case "DELETEPRODUCT_FAIL":
            return ({
                ...state,
                err: payload
                })

        default:
            return state;
    }
}

export default Product;