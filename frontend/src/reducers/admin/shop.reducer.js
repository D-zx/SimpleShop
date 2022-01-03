const initialState = {
    status: null,
    err: {}
};

const Shop =(state = initialState, action)=>{
    const { type, payload } = action;

    switch(type) {
        case "INIT":
            return ({
                ...initialState,
            })
            
        case "CREATESHOP_SUCCESS":
            return ({
                ...state,
                status: "created"
            })

        case "CREATESHOP_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "UPDATESHOP_SUCCESS":
            return ({
                ...state,
                status: "updated"
            })

        case "UPDATESHOP_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "DELETESHOP_SUCCESS":
            return ({
                ...state,
                status: "deleted"
            })

        case "DELETESHOP_FAIL":
            return ({
                ...state,
                err: payload
                })

        default:
            return state;
    }
}

export default Shop;