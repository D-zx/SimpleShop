const initialState = {
    status: null,
    err: {}
};

const Category =(state = initialState, action)=>{
    const { type, payload } = action;

    switch(type) {
        case "INIT":
            return ({
                ...initialState,
            })
            
        case "CREATECATEGORY_SUCCESS":
            return ({
                ...state,
                status: "created"
            })

        case "CREATECATEGORY_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "UPDATECATEGORY_SUCCESS":
            return ({
                ...state,
                status: "updated"
            })

        case "UPDATECATEGORY_FAIL":
            return ({
                ...state,
                err: payload
            })

        case "DELETECATEGORY_SUCCESS":
            return ({
                ...state,
                status: "deleted"
            })

        case "DELETECATEGORY_FAIL":
            return ({
                ...state,
                err: payload
                })

        default:
            return state;
    }
}

export default Category;