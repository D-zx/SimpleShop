const initialState = {
    status: null,
    err: {},
    reload: false,
};

const Product =(state = initialState, action)=>{
    const { type, payload } = action;

    switch(type) {
        case "INIT":
            return ({
                ...initialState,
            })
            
        case "CREATEIMAGE_SUCCESS":
            return ({
                ...state,
                status: "created",
                reload: true,
            })

        case "CREATEIMAGE_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "UPDATEIMAGE_SUCCESS":
            return ({
                ...state,
                status: "updated"
            })

        case "UPDATEIMAGE_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "DELETEIMAGE_SUCCESS":
            return ({
                ...state,
                status: "deleted"
            })

        case "DELETEIMAGE_FAIL":
            return ({
                ...state,
                err: payload
                })

        default:
            return state;
    }
}

export default Product;